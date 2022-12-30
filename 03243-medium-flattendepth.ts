// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>
]

// ============= Your Code Here =============
type FlattenDepth<
  T extends unknown[],
  C extends number = 1,
  U extends any[] = []
> = U['length'] extends C
  ? T
  : T extends [infer A, ...infer B]
  ? A extends any[]
    ? [...FlattenDepth<A, C, [...U, 1]>, ...FlattenDepth<B, C, U>]
    : [A, ...FlattenDepth<B, C, U>]
  : T

type P = FlattenDepth<[1, [2]]>
