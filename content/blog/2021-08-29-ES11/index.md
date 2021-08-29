---
title: "ES11(ES2020)"
date: "2021-08-29"
tags: ["JS"]
---

### 1. String.prototype.matchAll

### 2. import()

### 3. BigInt

遇到類似[Leetcode 1985](https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array/)這類問題，
Number 型態已經不足夠表示。Number 型態表示上限為$2^{53} - 1$。

```js
Math.pow(2, 53) // 9007199254740992
Number.MAX_SAFE_INTEGER // 9007199254740991

Number.MAX_SAFE_INTEGER + 1 // 9007199254740992
Number.MAX_SAFE_INTEGER + 2 // 9007199254740992

BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1) // 9007199254740992n
BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2) // 9007199254740993n
```

### 4. Promise.allSettled

### 5. globalThis

### 6. for-in mechanics

### 7. Optional Chaining

### 8. Nullish coalescing Operator
