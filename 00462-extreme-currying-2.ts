// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = DynamicParamsCurrying((a: string, b: number, c: boolean) => true)
const curried2 = DynamicParamsCurrying(
  (a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true
)

const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

type cases = [
  Expect<Equal<typeof curried1Return1, boolean>>,
  Expect<Equal<typeof curried1Return2, boolean>>,
  Expect<Equal<typeof curried1Return3, boolean>>,

  Expect<Equal<typeof curried2Return1, boolean>>,
  Expect<Equal<typeof curried2Return2, boolean>>,
  Expect<Equal<typeof curried2Return3, boolean>>,
  Expect<Equal<typeof curried2Return4, boolean>>,
  Expect<Equal<typeof curried2Return5, boolean>>,
  Expect<Equal<typeof curried2Return6, boolean>>,
  Expect<Equal<typeof curried2Return7, boolean>>,
  Expect<Equal<typeof curried2Return8, boolean>>,
  Expect<Equal<typeof curried2Return9, boolean>>,
  Expect<Equal<typeof curried2Return10, boolean>>
]

// ============= Your Code Here =============
type AnyFunction = (...args: any[]) => any

/**
 * type P<T, P extends any[] = [1,2]> = T extends [...P, ...infer K] ? K : '超出了'
 *
 * type P1 = P<[1]> // 超出了
 * type P2 = P<[1,2]> // []
 * type P3 = P<[1,2,3]> // [3]
 */

type CurriedFunction<F extends AnyFunction> = F extends (...args: infer Args) => infer R
  ? Args extends []
    ? R
    : <P extends any[]>(
        ...args: P
      ) => Args extends [...P, ...infer O] // 判断P的长度有没有超过Args
        ? CurriedFunction<(...args: O) => R> // 没有超过就继续递归
        : R // 超过了就直接返回R
  : never

declare function DynamicParamsCurrying<F extends AnyFunction>(fn: F): CurriedFunction<F>
