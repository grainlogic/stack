export class PropertyAlreadyDefineError extends Error {
  public name = 'PropertyAlreadyDefineError'

  public constructor (property: string) {
    super(`Property "${property}" is already define`)
  }
}
