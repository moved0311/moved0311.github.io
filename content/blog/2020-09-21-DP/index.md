---
title: Dynamic Programming
date: "2020-09-21"
tags: ["Algorithms", "DP"]
---

## Dynamic Programming

在寫遞迴時，subset 常常被重複計算造成浪費時間。DP 使用一張表紀錄已經計算過得 subset，若要計算的函數已經出現過在表上，則直接查表不需要再重新計算。

例如使用遞迴計算 Fibonacci 數列，使用遞迴的時間複雜度是指數級別(exponential)，使用 DP 則能夠降到線性(linear)。

### Fibonacci

T(n) = T(n-1) + T(n-2)

若使用遞迴方法計算 T(5)，下面 T(2)~T(4)會被重複計算多次，造成複雜度是指數形式。

```

                           T(5)
                   /                  \
               T(4)                     T(3)
             /        \              /       \
        T(3)        T(2)           T(2)     T(1)
       /    \       /    \        /    \
    T(2)   T(1)  T(1) T(0)     T(1)    T(0)
  /     \
T(1)   T(0)
```

### Implements

- [recursive - fibonacci](https://github.com/moved0311/DSA/blob/master/JS/Algorithms/Recursive/fibonacci.js)
- [dynamic programming - fibonacci](https://github.com/moved0311/DSA/blob/master/JS/Algorithms/DP/fibonacci.js)

## Reference

- [geeksforgeeks - Dynamic Programming](https://www.geeksforgeeks.org/dynamic-programming/)
- [leetcode - 198. House Robber](https://leetcode.com/problems/house-robber/)
- [From good to great. How to approach most of DP problems.](https://leetcode.com/problems/house-robber/discuss/156523/From-good-to-great.-How-to-approach-most-of-DP-problems.)
