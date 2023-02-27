// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>
]

// ============= Your Code Here =============
/**
 * 0 extends 1 => false
 * any & 任意类型 => any
 * 0 extends any => true
 */
type IsAny<T> = 0 extends T & 1 ? true : false
