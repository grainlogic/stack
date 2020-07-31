import { describe, it, beforeEach } from 'mocha'
import { assert } from 'chai'
import { Stack } from './Stack'
import {
  ArgumentNullError,
  PropertyAlreadyDefineError,
  StackOverflowError,
  StackUnderflowError,
  StackDepthNegativeError
} from './errors'
import { StackView } from './StackView'

type AssertIncrDecrBy = <T, K extends keyof T> (
  modifier: Function,
  object: T,
  property: K,
  delta: number,
  message?: string
) => void

class InternalView implements StackView<number> {
  public pop (): number {
    return 1
  }

  public push (item: number): void {}
}

let instance: Stack<number>
const stackDeep = 5
const stackItem = 1
const pushToStack = () => instance.push(stackItem)
const popOffStack = () => instance.pop()
const fillStack = size => Array(size).fill('').forEach(pushToStack)
const clearStack = size => Array(size).fill('').forEach(popOffStack)

describe('class Stack<T>', () => {

  describe('Сonstructor(deep: number)', () => {
    beforeEach(() => {
      instance = new Stack<number>(stackDeep)
    })

    it('stack instance must be created if pass a parameter', () => {
      assert.instanceOf(instance, Stack, 'stack instance is not create')
    })

    it('should throw an ArgumentNullError error if parameter "deep" is not passed', () => {
      const createInstance = () => (new (Stack as any)())
      assert.throws(createInstance, ArgumentNullError)
    })

    it('should throw an StackDepthNegativeError error if parameter "deep" is less than 0', () => {
      const createInstance = () => new Stack(-10)
      assert.throws(createInstance, StackDepthNegativeError)
    })

    it('stack instance must be empty', () => {
      assert.isTrue(instance.isEmpty, 'stack instance is not empty')
    })
  })

  describe('#push(item: T): void', () => {
    const increasesBy: AssertIncrDecrBy = (assert as any).increasesBy // TODO: update @types/chai definition

    beforeEach(() => {
      instance = new Stack<number>(stackDeep)
    })

    it('should add an one item to stack if not overflowed', () => {
      assert.doesNotThrow(pushToStack, Error)
      increasesBy(pushToStack, instance, 'size', 1, 'stack size has not increased by one')
    })

    it('stack must be full if number of elements is equal to stack depth', () => {
      fillStack(stackDeep)
      assert.isTrue(instance.isFull, 'stack instance is not full')
    })

    it('should throw an StackOverflowError error if stack is full', () => {
      fillStack(stackDeep)
      assert.throws(pushToStack, StackOverflowError)
    })
  })

  describe('#pop(): T', () => {
    const decreasesBy: AssertIncrDecrBy = (assert as any).decreasesBy // TODO: update @types/chai definition

    beforeEach(() => {
      instance = new Stack<number>(stackDeep)
    })

    it('should remove an item from stack and return it if stack is not empty', () => {
      const fillCount = 4
      fillStack(fillCount)
      const item = popOffStack()

      assert.equal(item, stackItem, '')
      decreasesBy(popOffStack, instance, 'size', 1, 'stack size has not decreased by one')
    })

    it('stack should be empty if all added items are removed', () => {
      fillStack(stackDeep)
      clearStack(stackDeep)
      assert.isTrue(instance.isEmpty, 'stack instance is not empty')
    })

    it('should throw an StackUnderflowError error if stack is empty', () => {
      fillStack(1)
      popOffStack()
      assert.throws(popOffStack, StackUnderflowError)
    })
  })

  describe('#clear(): void', () => {
    beforeEach(() => {
      instance = new Stack<number>(stackDeep)
    })

    it('stack must be empty', () => {
      fillStack(3)
      instance.clear()
      assert.isTrue(instance.isEmpty, 'stack instance is not empty')
    })

    it('should throw an StackUnderflowError error if stack is empty', () => {
      const clearStack = () => instance.clear()

      fillStack(1)
      popOffStack()
      assert.throws(clearStack, StackUnderflowError)
    })
  })

  describe('#get view(): StackView', () => {
    beforeEach(() => {
      instance = new Stack<number>(stackDeep)
    })

    it('should return an Array instance if the field is not define (default behavior)', () => {
      assert.instanceOf(instance.view, Array, 'internal representation is not Array')
    })

    it('should return an object with StackView interface if a non-default value is used', () => {
      instance.view = new InternalView()
      assert.notInstanceOf(instance.view, Array, 'internal representation is Array (default behavior)')
      assert.instanceOf(instance.view, InternalView, 'internal representation is not InternalView')
    })
  })

  describe('#set view(instance: StackView)', () => {
    beforeEach(() => {
      instance = new Stack<number>(stackDeep)
    })

    it('should throw an ArgumentNullError error if field is assigned an undefined or null', () => {
      const setUndefinedView = () => (instance.view as any) = undefined
      const setNullView = () => (instance.view as any) = null

      assert.throws(setUndefinedView, ArgumentNullError)
      assert.throws(setNullView, ArgumentNullError)
    })

    it('must be initialized only once, otherwise throws an PropertyAlreadyDefineError error', () => {
      const setView = () => instance.view = new InternalView()

      setView()
      assert.throws(setView, PropertyAlreadyDefineError)
    })
  })
})
