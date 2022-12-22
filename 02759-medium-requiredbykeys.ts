// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>
]

// ============= Your Code Here =============
type FlatObj<T> = {
  [k in keyof T]: T[k]
}

type RequiredByKeys<T, K extends keyof T = keyof T> = FlatObj<
  {
    [k in keyof T as k extends K ? k : never]-?: T[k]
  } & {
    [k in keyof T as k extends K ? never : k]: T[k]
  }
>
