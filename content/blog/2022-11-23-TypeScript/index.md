---
title: "TypeScript"
date: "2022-11-25"
tags: ["TypeScript"]
lastUpdate: "2022-12-09"
---

### React Component

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

### 組合 types
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
### Record & Pick
```ts
enum CATEGORY {
  A = "a",
  B = "b",
  C = "c"
}

type ContentAll = Record<CATEGORY, string>;
// {a :string, b: string, c: string}

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

## Readonly
`Readonly<T>`,將type T 設定成唯讀屬性
```ts
  type MyReadonly<T> = {
    readonly [K in keyof T]: T[K]
  }
```

## PropertyKey
PropertyKey保留字,等同string | number | symbol

## Infer
依靠TypeScript來判斷型態，必須使用在extends之後\
extends是Typescript中分支的功能像是if...else
```ts
type Title<T> = T extends string ? string : unknown 
```


* Infer範例: 回傳Array第一筆元素型態
```ts
type First<T extends any[]> = T extends [infer U, ...any[]] ? U : never;
```

## Exclude
Exclude<T, U> 在T中，但不在U中
```ts
type Exclude<T, U> = T extends U ? never : T;

/*
  never是所有Type的子集合
  type a = string | never // string

  Exclude<"a", "b", "c", "c"> -> "a", "b"
  "a" extends "c" -> "a"
  "b" extends "c" -> "b"
  "c" extends "c" -> never
*/
```


## Reference

- [[YouTube] Typescript for React Components From Beginners to Masters](https://www.youtube.com/watch?v=z8lDwLKthr8&list=WL&index=1)
- [type-challenges](https://github.com/type-challenges/type-challenges)