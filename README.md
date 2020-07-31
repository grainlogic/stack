# Stack [![Build Status][travis-image]][travis-url] [![Coverage][coverage-image]][coverage-url] ![License][license-url] [![JavaScript Style Guide][code-style-image]][code-style-url] ![Type Definitions][type-definitions-url] [![Npm Version][npm-version-image]][npm-version-url]

[travis-image]: https://img.shields.io/travis/grainlogic/stack/master?style=flat-square&logo=travis-ci
[travis-url]: https://travis-ci.org/grainlogic/stack
[coverage-image]: https://img.shields.io/codecov/c/gh/grainlogic/stack?style=flat-square&logo=codecov
[coverage-url]: https://codecov.io/gh/grainlogic/stack
[code-style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square&logo=eslint
[code-style-url]: https://standardjs.com
[npm-version-image]: https://img.shields.io/npm/v/@grainlogic/stack?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/@grainlogic/stack
[license-url]: https://img.shields.io/github/license/grainlogic/stack?style=flat-square
[type-definitions-url]: https://img.shields.io/npm/types/typescript?style=flat-square&logo=typescript

An array based stack implementation. Allocation of memory for the stack is lazy during the first call to modifying methods.
If necessary, you can replace the internal implementation with a more suitable one for your tasks.

## API

### Class Stack\<T\>
***Type parameters:***
* **T** - stack element type

#### `Constructor(deep: number): Stack<T>`
Creates a stack instance at the specified depth.
The default implementation creates an array of length `deep`.

***Exceptions:***
* **ArgumentNullError** - an exception thrown if you do not pass the `deep` parameter;
* **StackDepthNegativeError** - an exception thrown if value of the `deep` parameter is less than zero.

> **Note.** If you pass `deep` `+Infinity` as the parameter value,
> then an array will be created with no explicit length limit.

### Methods

#### `push (item: T): void`
Add item to the top of the stack.

***Exceptions:***
* **StackOverflowError** - an exception thrown when trying to add an item to the full stack.

#### `pop (): T`
Remove item from the top of the stack and return it.

***Exceptions:***
* **StackUnderflowError** - an exception thrown when an attempt to pop an element from empty stack.

#### `clear (): void`
Clear all elements from the stack.

***Exceptions:***
* **StackUnderflowError** - an exception thrown when trying to clear an empty stack.

### Properties

#### `readonly size: number`
Current number of items on the stack.

#### `readonly isFull: boolean`
Stack full indicator.

#### `readonly isEmpty: boolean`
Stack empty indicator.

#### `view: StackView<T>`
Internal stack representation.

This property is initialized lazily the first time it is accessed.
After initialization, you cannot change the property value.
Implements the `Method Injection` pattern with the default` Array` dependency.

If necessary, you can replace the default implementation with your own,
for example a linked list or a typed array.

***Exceptions:***
* **ArgumentNullError** - an exception thrown when trying to set the property to `null` or` undefined`;
* **PropertyAlreadyDefineError** - an exception thrown when trying to reinitialize a property.
