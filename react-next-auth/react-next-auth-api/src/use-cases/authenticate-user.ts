import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
import { MissingCredentialsError } from './errors/missing-credentials-error'
import { env } from '@/env'
import axios from 'axios'
import z from 'zod'
import { AccountsRepository } from '@/repositories/accounts-repository'

interface AuthenticateUserUseCaseRequest {
  email?: string
  password?: string | null
  provider: 'credentials' | 'google' | 'github'
  code?: string
}

interface AuthenticateUserUseCaseResponse {
  user: User
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private accountsRepository: AccountsRepository,
  ) {}

  async execute({
    email,
    password,
    provider,
    code,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    // ============= SIGN-IN WITH EMAIL =============
    if (provider === 'credentials') {
      if (!email) {
        throw new MissingCredentialsError()
      }

      const user = await this.usersRepository.findByEmail(email)

      if (!user) {
        throw new InvalidCredentialsError()
      }

      if (!password || !user.password) {
        throw new MissingCredentialsError()
      }

      const doesPasswordMatches = await compare(password, user.password)

      if (!doesPasswordMatches) {
        throw new InvalidCredentialsError()
      }

      return { user }
    }

    // ============= SIGN-IN WITH GITHUB =============
    if (provider === 'github') {
      const accessTokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        null,
        {
          params: {
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
          },
          headers: {
            Accept: 'application/json',
          },
        },
      )

      const { access_token } = accessTokenResponse.data

      const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      const userSchema = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
        avatar_url: z.string().url(),
      })

      const userInfo = userSchema.parse(userResponse.data)

      const account = await this.accountsRepository.findByProviderAccountId(
        'github',
        userInfo.id.toString(),
      )

      if (!account) {
        const user = await this.usersRepository.create({
          email: userInfo.email,
          name: userInfo.name,
          image: userInfo.avatar_url,
        })

        await this.accountsRepository.linkAccount({
          user: {
            connect: {
              id: user.id,
            },
          },
          provider: 'github',
          providerAccountId: userInfo.id.toString(),
        })

        return { user }
      } else {
        const user = await this.usersRepository.findById(account.userId)

        if (!user) {
          throw new InvalidCredentialsError()
        }

        return { user }
      }
    }

    // ============= IF WITHOUT PROVIDER =============
    throw new MissingCredentialsError()
  }
}
