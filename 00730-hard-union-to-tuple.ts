// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number]

type cases = [
  Expect<Equal<UnionToTuple<'a' | 'b'>['length'], 2>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b'>>, 'a' | 'b'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a'>>, 'a'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>>, void | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'d' | 'f' | 1 | never>>, 'f' | 'd' | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>>, [{ a: 1 }] | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<never>>, never>>,
  Expect<
    Equal<
      ExtractValuesOfTuple<UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>>,
      'f' | 'e' | 1 | 2 | 'g' | 'c' | 'd' | 'a' | 'b'
    >
  >
]

// ============= Your Code Here =============
/**
 * 将T转为函数交叉类型
 *
 * 函数重载
 * type FunctionOverload = {
 *   (): number;
 *   (): string;
 * };
 *
 * 函数交叉类型
 * type Intersection = (() => number) & (() => string);
 *
 * 在TS中，多个函数类型的联合类型被理解为重载。
 * type C = FunctionOverload extends Intersection ? true : false --> true
 */
type UnionToIntersectionFn<T> = (T extends any ? (p: () => T) => void : never) extends (p: infer P) => void ? P : never

/**
 * 获取重载类型的返回类型会获得最后一项的类型
 * type FunctionOverload = {
 *   (): number;
 *   (): string;
 * };
 *
 * ReturnType<FunctionOverload> --> string
 */
type Last<T> = UnionToIntersectionFn<T> extends (...args: any) => infer R ? R : never

type UnionToTuple<T, R extends any[] = [], L = Last<T>> = [T] extends [never]
  ? R
  : UnionToTuple<Exclude<T, L>, [...R, L]>
