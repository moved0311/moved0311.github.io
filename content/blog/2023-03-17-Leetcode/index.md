---
title: "Bit Manipulation"
date: "2023-03-17"
tags: ["Leetcode"]
---

## XOR

* 找到最低位的1
```js
x & -x
/*
  6 ^ -6 = 110 ^ 010 = 010
*/
```

* 消掉最低位的1
```js
x & (x-1)
```
