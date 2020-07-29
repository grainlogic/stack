export interface StackView<T> {
  push (item: T): void

  pop (): T
}
