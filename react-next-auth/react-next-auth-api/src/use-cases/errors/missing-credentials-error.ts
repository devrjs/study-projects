export class MissingCredentialsError extends Error {
  constructor() {
    super('Email, name or password are missing.')
  }
}
