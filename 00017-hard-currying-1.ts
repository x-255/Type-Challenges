// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>>,
  Expect<
    Equal<
      typeof curried2,
      (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >,
  Expect<Equal<typeof curried3, () => true>>
]

// ============= Your Code Here =============
type Curried<Args, R> = Args extends [...infer A, infer B] ? Curried<A, (arg: B) => R> : R

declare function Currying<T>(
  fn: T
): T extends (...args: infer Args) => infer R ? Curried<Args, Args extends [] ? () => R : R> : never
