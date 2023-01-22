---
title: "TypeScript"
date: "2022-11-25"
tags: ["TypeScript"]
lastUpdate: "2023-01-18"
---

## React元件範例 

```jsx
const Header = ({ title }: { title: string }) => {
  return <h1>{title}</h1>
}

<Header title="Hello" />
```

```jsx
const Header = ({ children }: { children: ReactNode }): ReactElement => {
  return <h1>{children}</h1>;
};

/* const fn = (a: a參數型態): fn回傳型態 => {} */

<Header>
  <strong>Hello</strong>
</Header>
```

* 參考
  * [[YouTube] Typescript for React Components From Beginners to Masters](https://www.youtube.com/watch?v=z8lDwLKthr8&list=WL&index=1)

### 常見的React Type
* FC\
  常見於Component回傳型態, `FC<T>`定義Component回傳型態為`FC<T>`,是一個FC(Function Component)可接受一個T型態的Props。
```ts
import type { FC } from 'react'
const MyComponent: FC<Props> => (props: Props) => {
      /* ... */
}
```

* CSSProperties\
當傳遞style做為Properties可以使用CSSProperties做為style的type
```ts
import type { CSSProperties } from 'react'
```

## types 邏輯運算
### AND OR
```ts
type AType = {
  a: number
}

type BType = {
  b: number
}

type CType = AType & BType
// { a: number, b: nubmer } 

type DType = AType | BType
// { a: number } or { b: number }
```

### IF
在Typescript中用extends關鍵字來表示分支(if...else)
```ts
If<true, 'a', 'b'>   // 'a'
If<false, 'a', 'b'>  // 'b'

type If<C, T, F> = C extends true ? T : F;
// C是否是true,是的情況返回T, 否則返回F
```

## Utility Types
### Record
```ts
enum CATEGORY {
  A = "a",
  B = "b",
  C = "c"
}

type ContentAll = Record<CATEGORY, string>;
// {a :string, b: string, c: string}
```

### Pick

```ts
enum CATEGORY {
  A = "a",
  B = "b",
  C = "c"
}

type ContentPick = Pick<ContentAll, CATEGORY.A | CATEGORY.C>
// {a: string, c: string}
```

* Picker實作
  ```ts
  type MyPick<T, K extends keyof T> = { 
      [P in K]: T[P] 
  };

  /*
      Todo = {
        title: string
        completed: string
      }
      keyof Todo -> "title" | "completed"
  */
  ```

### Omit
`Omit<Type, Keys>`, 將Type中的Keys排除

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoInfo = Omit<Todo, "completed" | "createdAt">;
// { title: string, description: string }
```

### Readonly
`Readonly<T>`,將type T 設定成唯讀屬性
```ts
  type MyReadonly<T> = {
    readonly [K in keyof T]: T[K]
  }
```

### PropertyKey
PropertyKey保留字,等同string | number | symbol

### Infer
依靠TypeScript來判斷型態，必須使用在extends之後\
extends是Typescript中分支的功能像是if...else
```ts
type Title<T> = T extends string ? string : unknown 
```


* Infer範例: 回傳Array第一筆元素型態
```ts
type First<T extends any[]> = T extends [infer U, ...any[]] ? U : never;
```

### Exclude
Exclude<T, U> 在T中，但不在U中
```ts
type Exclude<T, U> = T extends U ? never : T;

/*
  never是所有Type的子集合
  type a = string | never // string

  Exclude<"a" | "b" | "c", "c"> -> "a", "b"
  "a" extends "c" -> "a"
  "b" extends "c" -> "b"
  "c" extends "c" -> never
*/
```

### Awaited
Promise處理完後的返回型態
```ts
type X = Promise<string>

Awaited<X> // string
```
```ts
type Awaited<T> = T extends Promise<infer R> ? 
                    (R extends Promise<unknown> ? Awaited<R> : R)
                 : never;
/*
  先判斷T是不是Prmoise不是回傳never
  判斷Promise裡面是不是還有Promise,是的話遞迴處理,否則回傳T
*/
```
* 參考 
  - [type-challenges](https://github.com/type-challenges/type-challenges)
  - [TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)