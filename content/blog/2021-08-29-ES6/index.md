---
title: "ES6(ES2015)"
date: "2021-08-29"
tags: ["JS"]
---

### 1. let/const

**let**
以前在宣告變數都使用全域的`var`在 ES6 新增了`let`可以更明確的規範變數作用的範圍。

```js
function f() {
  let x = 1
  {
    console.log(x) // 1
    let y = 2
  }
  console.log(y) // Uncaught ReferenceError: y is not defined
}
f()
```

**const**
簡化了定義常數的宣告，常數必須初始化且不能變更。

```js
const PI = 3.14
```

### 2. arrow functions

```js
var a = [1, 2, 3, 4, 5]
//ES5
a.map(function (v) {
  return v + 1
})
//ES6
a.map(v => v + 1)
```

### 3. classes

加入 classes，定義 class 更直觀。在 ES5 以前定義物件很複雜，沒有 class 關鍵字，所以會看到很多`XXX.prototype.YYY`的語法，在 ES6 幾乎看不見，精簡許多。

ES6 建立 Stack Class

```js
class Stack {
  stack = []
  push = num => {
    this.stack.push(num)
  }
  pop = () => {
    return this.stack.pop()
  }
  size = () => {
    return this.stack.length
  }
}

s = new Stack()
s.push(1)
s.push(2)
s.push(3)
s.pop() // 3
s.size() // 2
```

ES6 之前的寫法

```js
const Stack = function () {
  this.stack = []
}
Stack.prototype.push = function (num) {
  this.stack.push(num)
}
Stack.prototype.pop = function () {
  return this.stack.pop()
}
Stack.prototype.size = function () {
  return this.stack.length
}
```

### 4. template string

允許在字串中插入變數，不用像以前一樣做字串串接。

```js
let name = "Tom"
let template = `Hello, ${name}.` // "Hello, Tom."
```

### 5. desturcuting

在拆解陣列或是物件時更方便

```js
let num = [1, 2, 3]
let [a, b, c] = num // a = 1, b = 2, c = 3
```

```js
let obj = { a: 1, b: 2, c: 3 }
let { a, b, c } = obj
console.log(a, b, c) // 1, 2, 3
```

### 6. default + rest + speard

- default

  在傳遞參數允許設定預設值，能夠預防一些例外產生
  e.g.

```js
let f = (a = 1, b = 2, c = 3) => {
  console.log(a, b, c)
}
f() // 1 2 3
f(4, 5) // 4 5 3
f(4, 5, 6) // 4 5 6
```

- rest

  在使用函數或是設計函數上可能會遇上不確定到底要幾個參數，
  ES6 可以讓你在這方面更有彈性。不確定的參數使用`...p`作表示，p 為一個陣列。

```js
let f = (a, ...rest) => {
  console.log(a, rest)
}
f(1, 2, 3, 4, 5) // 1 [2, 3, 4, 5]
```

- spread

```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let arr3 = [...arr1, ...arr2] // [1, 2, 3, 4, 5, 6]
```

### 7. iterators + for..of

```js
let nums = [1, 2, 3, 4]
for (let n of nums) {
  console.log(n)
}
/*
	1
	2
	3
	4
*/
```

### 8. generators

- [ES6 Generator 基礎 #1](https://github.com/aszx87410/blog/issues/1)

### 9. unicode

```js
s = "\u{1F602}" //"😂"
```

### 10. modules

```js
// a.js
const a = () => {
  console.log("a.js")
}
module.exports = a
```

```js
// b.js
import a from "./a"
a() // a.js
```

### 11. map/set/weakmap/weakset

### 12. proxying/refection

### 13. symbols

### 14. promises

程式常常需要做 request 到後端來取得資料，但 server 並不會馬上回傳資料，要等待 server 處理的時間。這時程式就必須停下來等待，造成時間浪費。

ES6 提出了 promise 來解決這個非同步(asynchronously)的狀況。當發送 request 到 server 後，並不會停下來等 server 處理完，而是留下 callback 後，繼續執行後面任務。

當 server 成功處理好拿到資料準備回傳時，再去執行剛剛留下的 callback function。留下的 callback function 有分為 request 呼叫成功(resolve)與 request 呼叫失敗(reject)。

```js
const callServer = time => {
  return new Promise((resolve, reject) => {
    if (time <= 300) {
      setTimeout(resolve({ msg: "request success!" }), time)
    } else {
      setTimeout(reject({ msg: "request failed!" }), time)
    }
  })
}
callServer(200).then(res => console.log(res))
// {msg: "request success!"}
callServer(400)
  .then(res => console.log(res))
  .catch(e => console.log(e)) // <--
// {msg: "request failed!"}
```

### 15. binary and octal literals

支援二進位與八進位表示

```js
0b111 //7
0o123 //83
```
