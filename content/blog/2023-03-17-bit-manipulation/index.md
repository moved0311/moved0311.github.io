---
title: "Bit Manipulation"
date: "2023-03-17"
tags: ["Leetcode"]
lastUpdate: "2023-05-29"
---

* 找到最低位的1
```js
n & -n
/*
  6 ^ -6 = 110 ^ 010 = 010
*/
```

* 消掉最低位的1
```js
n & (n-1)
```

* 檢查是不是$2^n$
```js
const isPowerOfTwo = (x !== 0) && ((n & (n - 1) === 0))
```

## XOR

* Swap two varibles
```ts
a = 4
b = 6
a = a ^ b
b = a ^ b
a = a ^ b
console.log(a, b) // 6 4
```

## Reference
* [Bit manipulation](https://en.wikipedia.org/wiki/Bit_manipulation)
* [Bitwise operation](https://en.wikipedia.org/wiki/Bitwise_operation)
* [Bit Twiddling Hacks](https://graphics.stanford.edu/~seander/bithacks.html)