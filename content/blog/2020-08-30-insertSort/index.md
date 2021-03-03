---
title: Insertion Sort
date: "2020-08-30"
tags: ["Algorithms"]
---

```js
function InsertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    j = i
    while (j > 0 && arr[j - 1] > arr[j]) {
      let tmp = arr[j]
      arr[j] = arr[j - 1]
      arr[j - 1] = tmp
      j -= 1
    }
  }
}

const arr = Array(10)
  .fill()
  .map(() => Math.round(Math.random() * 100))
console.log("before: ", arr)
InsertionSort(arr)
console.log("after:  ", arr)
```