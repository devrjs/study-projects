export class MissingCredentialsError extends Error {
  constructor() {
    super('Name or password are missing.')
  }
}
