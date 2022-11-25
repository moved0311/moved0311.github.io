---
title: "TypeScript"
date: "2022-11-25"
tags: ["TypeScript"]
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

## Reference

- [[YouTube] Typescript for React Components From Beginners to Masters](https://www.youtube.com/watch?v=z8lDwLKthr8&list=WL&index=1)
