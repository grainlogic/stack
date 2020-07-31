import { StackView } from './StackView'
import {
  ArgumentNullError,
  PropertyAlreadyDefineError,
  StackOverflowError,
  StackUnderflowError,
  StackDepthNegativeError
} from './errors'

export class Stack<T> {

  public get view (): StackView<T> {
    if (this.#view === undefined) {
      this.view = isFinite(this.#deep) ? new Array(this.#deep) : []
    }

    return this.#view
  }

  public set view (instance: StackView<T>) {
    if (instance == null) {
      throw new ArgumentNullError('instance')
    }

    if (this.#view !== undefined) {
      throw new PropertyAlreadyDefineError('view')
    }

    this.#view = instance
  }

  #view: StackView<T>

  #length: number

  readonly #deep: number

  public constructor (deep: number) {
    if (deep == null) {
      throw new ArgumentNullError('deep')
    }

    if (deep < 0) {
      throw new StackDepthNegativeError()
    }

    this.#deep = deep
    this.#length = 0
  }

  public push (item: T): void {
    if (this.isFull) {
      throw new StackOverflowError()
    }

    this.view.push(item)
    this.#length++
  }

  public pop (): T {
    if (this.isEmpty) {
      throw new StackUnderflowError()
    }

    const item = this.view.pop()
    this.#length--

    return item
  }

  public clear (): void {
    if (this.isEmpty) {
      throw new StackUnderflowError()
    }

    Array(this.#length).fill('').forEach(this.pop.bind(this))
  }

  public get size (): number {
    return this.#length
  }

  public get isFull (): boolean {
    return this.#length === this.#deep
  }

  public get isEmpty (): boolean {
    return this.#length === 0
  }
}
