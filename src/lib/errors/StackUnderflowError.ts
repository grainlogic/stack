export class StackUnderflowError extends Error {
  public name = 'StackUnderflowError'

  public constructor () {
    super('Stack is underflow')
  }
}
