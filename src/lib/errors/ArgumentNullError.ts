export class ArgumentNullError extends Error {
  public name = 'ArgumentNullError'

  public constructor (argument: string) {
    super(`Function argument "${ argument }" is type null or undefined`)
  }
}
