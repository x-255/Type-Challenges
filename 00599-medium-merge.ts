// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number
        b: number
        c: boolean
      }
    >
  >
]

// ============= Your Code Here =============
type Merge<F, S> = {
  [k in keyof F | keyof S]: k extends keyof S ? S[k] : k extends keyof F ? F[k] : never
}
