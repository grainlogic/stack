export class StackOverflowError extends Error {
  public name = 'StackOverflowError'

  public constructor () {
    super('Stack is overflow')
  }
}
