// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>]

// ============= Your Code Here =============
type ObjectFromEntries<T extends [string, unknown]> = {
  /**
   * 使用 Extract 筛选出所有属性名等于当前循环变量 K 的元组，
   * 最后将这些元组的第二个元素类型组成一个联合类型，作为对象类型中 K 属性的类型
   */
  [K in T[0]]: Extract<T, [K, unknown]>[1]
}
