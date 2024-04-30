import { InMemoryUsersRepository } from '@/test/repositories/in-memory-users-repository'
import { RegisterUseCase } from './register-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { compare } from 'bcryptjs'
import { MissingCredentialsError } from './errors/missing-credentials-error'
import { makeUser } from '@/test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })

  it('should be able to register', async () => {
    const userCreate = makeUser()
    const { user } = await sut.execute(userCreate)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const userCreate = makeUser()
    const { user } = await sut.execute(userCreate)

    if (!user.password || !userCreate.password) {
      throw new MissingCredentialsError()
    }

    const isPasswordCorrectlyHashed = await compare(
      userCreate.password,
      user.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    const user = makeUser({ email })
    await sut.execute(user)

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
