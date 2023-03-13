// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<MutableKeys<{}>, never>>
]

// ============= Your Code Here =============
type IsReadonlyKey<T, K extends keyof T> = Equal<Pick<T, K>, Readonly<Pick<T, K>>>

type MutableKeys<T> = keyof {
  [K in keyof T as IsReadonlyKey<T, K> extends true ? never : K]: 1
}

type P1 = MutableKeys<{ a: number; readonly b: string }>
