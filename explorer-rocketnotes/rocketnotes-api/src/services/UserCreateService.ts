import { hash } from "bcryptjs"
import { FastifyError } from "fastify"
import { IUserCreate } from "../repositories/UserRepository"

interface IUserRepository {
  findByEmail(email: string): Promise<any>
  create(user: IUserCreate): Promise<any>
}

export class UserCreateService {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }: IUserCreate) {
    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists) {
      const error = Error("Este e-mail já está em uso.") as FastifyError
      error.statusCode = 401
      throw error
    }

    const hashedPassword = await hash(password, 8)

    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword })

    return userCreated
  }
}
