export class StackDepthNegativeError extends Error {
  public name = 'StackDepthNegativeError'

  public constructor () {
    super('Stack depth is a negative number')
  }
}
