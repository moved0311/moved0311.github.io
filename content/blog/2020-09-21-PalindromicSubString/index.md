---
title: "Palindromic Substrings"
date: "2020-09-21"
tags: ["Algorithms", "DP"]
---

## Palindromic Substrings

palindromic 回文，字串由左至右讀和由右至左讀結果相同。e.g. "abba", "abbcbba"。

## 計算在字串中有多少個回文

```
input: "abc"
output: 3  ("a","b","c")
```

```
input: "aaa"
output: 6 ("a","a","a","aa","aa","aaa")
```

## 作法

#### DP

建立一張表分別紀錄長度為 1 時的結果，長度為 2 時的結果，...，長度為 n 的結果。

- example1 : abbc

| step1. | [0] a | [1] b | [2] b | [3] c |
| ------ | ----- | ----- | ----- | ----- |
| [0] a  | T     |       |
| [1] b  |       | T     |       |
| [2] b  |       |       | T     |       |
| [3] c  |       |       |       | T     |

| step2. | [0] a | [1] b | [2] b | [3] c |
| ------ | ----- | ----- | ----- | ----- |
| [0] a  | T     | F     |
| [1] b  |       | T     | T     |
| [2] b  |       |       | T     | F     |
| [3] c  |       |       |       | T     |

長度大於 2 時，就能夠向上查表。例如要填[0][2]這格，[0][2]表示字串 abb，那就只需要判斷[0]和[2]是否相等加上之前紀錄的結果[1][1] ，所以[0][2](`a === b && True`)為 F。

| step3. | [0] a | [1] b | [2] b | [3] c |
| ------ | ----- | ----- | ----- | ----- |
| [0] a  | T     | F     | F     |
| [1] b  |       | T     | T     | F     |
| [2] b  |       |       | T     | F     |
| [3] c  |       |       |       | T     |

| step4. | [0] a | [1] b | [2] b | [3] c |
| ------ | ----- | ----- | ----- | ----- |
| [0] a  | T     | F     | F     | F     |
| [1] b  |       | T     | T     | F     |
| [2] b  |       |       | T     | F     |
| [3] c  |       |       |       | T     |

**output:** 5 ("a", "b", "b", "c", "bb")

- example2: abaab

|       | [0] a | [1] b | [2] a | [3] a | [4] b |
| ----- | ----- | ----- | ----- | ----- | ----- |
| [0] a | T     | F     | T     | F     | F     |
| [1] b |       | T     | F     | F     | T     |
| [2] a |       |       | T     | T     | F     |
| [3] a |       |       |       | T     | F     |
| [4] b |       |       |       |       | T     |

**output:** 8 ("a", "b", "a",' "a", "b", "aa", "aba", "baab")

## Implementation

[Palindromic Substrings (DP)](https://github.com/moved0311/DSA/blob/master/JS/Algorithms/DP/palindromic.js)

## Reference

- [leetcode - 647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)
