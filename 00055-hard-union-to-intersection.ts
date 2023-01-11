// 参考：https://www.jianshu.com/p/071b948209f3

// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>
]

// ============= Your Code Here =============
type UnionToIntersection<U> = (U extends U ? (a: U) => void : never) extends (a: infer A) => void ? A : never
