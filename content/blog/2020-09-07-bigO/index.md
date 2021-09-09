---
title: Big O
date: "2020-09-07"
tags: ["Algorithms"]
lastUpdate: "2021-09-09"
---

> Big O 是用來評估演算法效率的漸進符號(Asymptotic Notation)。

# 時間複雜度

## 漸進符號

|          |           |               |
| -------- | --------- | ------------- |
| O        | big O     | upper bound   |
| $\Omega$ | big omega | lower bound   |
| $\Theta$ | theta     | average bound |

假設實作出來的 f(n)時間複雜度是 2n+3，可以找到一個當 $n\ge 1$ 時，10n 永遠會大於等於 2n+3，那 10n 就是一個 f(n)的 upper bound。
當然在 $n\ge 1$ 時，$10n^2, 10n^3$都是一個 upper bound 但是會找最具代表性的作為 f(n)的 upper bound(最靠近)。

通常考慮 n 很大的情形，所以只會用**最高次方項**作為代表，前面常數也會省略。所以 f(n)=2n+3 的時間複雜度用 O(n)表示。

時間複雜度排行: 1 < logn < $\sqrt{n}$ < n < nlogn < $n^2$ < $n^3$ < ... < $2^n$ < $3^n$ < ... < $n^n$

## 漸進符號數學定義

### Big O

---

$f(n) = O(g(n))$ iff $\exist$ positive constant C and $n_0$
such that $f(n) \leq C \times g(n)  ,\forall n \geq n_0$

---

e.g. f(n) = 2n+3

2n+3 <= 10n , n >=1

2n+3 <= 7n , n >=1

2n+3 <= 2n + 3n <= 5n, n >=1

f(n) = O(n)

### Omega

---

$f(n) = \Omega(g(n))$ iff $\exist$ positive constant C and $n_0$
such that $f(n) \geq C \times g(n)  ,\forall n \geq n_0$

---

e.g f(n) = 2n+3

2n+3 >= n , n >=1

f(n) = $\Omega$(n)

### Theta

---

$f(n) = \Theta(g(n))$ iff $\exist$ positive constant $C_1, C_2$ and $n_0$
such that $C_1 \times g(n) \leq f(n) \leq C_2 \times g(n)$

---

e.g. f(n) = 2n +3

n <= 2n+3 <= 5n

f(n) = $\Theta$(n)

## 常見的表示名稱

|          |             |
| -------- | ----------- |
| O(1)     | Constant    |
| O(logn)  | Logrithemic |
| O(n)     | Linear      |
| O($n^2$) | Quadratic   |
| O($n^3$) | Cubic       |
| O($2^n$) | Exponential |

## ADD vs. Multiply

- Add the Runtimes: O(A + B)

```c
for(int a : arrA){
  //statement
}
for(int b : arrB){
  //statement
}
```

- Multiply the Runtimes: O(A $\times$ B)

```c
for(int a: arrA){
  for(int b: arrB){
    //statement
  }
}
```

## 平攤分析 Amortized Analysis

[Amortized Analysis - Potential functions](https://www.youtube.com/watch?v=B3SpQZaAZP4&list=PL1BaGV1cIH4UhkL8a9bJGG356covJ76qN&index=10)

另一種分析演算法時間複雜度的角度。當每一次執行花費(cost)的不同時，可以使用平攤分析找到一個平均的 cost 來代表多次執行下的平均 cost。\
概念像是上面影片提到的單程票與來回票。單程票角度來看: 從 A 到 B 花費 10 元，從 B 回 A 花費 10 元。從來回票角度看:從 A 到 B 花費 20 元，從 B 到 A 不用錢。總共花費都是 20 元，但是從不同角度來看。

# 空間複雜度

除了在意時間複雜度，空間複雜度也是一個重要指標。
當使用了一個大小為 n 的陣列，空間複雜度用 O(n)表示。當使用 n\*n 陣列，空間複雜度用 O($n^2$)表示。

遞迴呼叫 n 次也要算在空間複雜度，用 O(n)表示。

```c
int sum(int n){
  if(n <= 0){
    return 0;
  }
  return n + sum(n-1);
}
```

# 範例

## O(n)範例

### 1.

```c
for(i=0; i<n; i++){
  //statement;
}
```

for loop 那行會執行 n+1 次(最後結束條件判斷)，但 for 裡面的描述只會執行 n 次。
可以直接簡單看 for 裡面會跑 n 次，所以複雜度是 O(n)

### 2.

```c
for(i=1; i<n; i=i+2){
  //statement;
}
```

statement 執行 $\frac{n}{2}$ 次，複雜度 O($\frac{n}{2}$)省略常數所以是 O(n)

### 3. DFS

```c
int sum(Node node) {
  if (node == null) {
    return 0;
  }
  return sum(node.left) + node.value + sum(node.right);
}
```

- 有 N 個節點，每個節點都加過一次，時間複雜度為 O(N)
- 二元樹，每個節點下面有兩個分支。遞迴呼叫時間複雜度為 \
  O($樹分支^{樹高度}$) = O($2^{height}$) \
  有 N 個節點，平衡樹高度為$\log{_2}{N}$ (假設有 8 個節點，高度為 3), \
  代入得到時間複雜度為 O($2^{\log{_2}{N}}$) = O(N)

## O($n^2$)範例

### 1.

```c
for(i=0; i<n; i++){
  for(j=0; j<n; j++){
    //statement;
  }
}
```

第一層 for 迴圈執行 n 次，第二層 for 迴圈執行 n 次，做相乘 statement 共執行 n\*n 次，時間複雜度 O($n^2$)

### 2.

```c
for(i=0; i<n; i++){
  for(j=0; j<i; j++){
    //statment;
  }
}
```

| i   | j          | num of statments |
| --- | ---------- | ---------------- |
| 0   | 0(x)       | 0                |
| 1   | 0 1(x)     | 1                |
| 2   | 0 1 2(x)   | 2                |
| 3   | 0 1 2 3(x) | 3                |
| ... | ...        | ...              |
| n   |            | 1+2+3+...+n      |

f(n) = $\frac{n(n+1)}{2}$

O(n) = $n^2$

## $O(\log{n})$範例

### 1.

```c
for(i = 1; i <= n; i = i * 2)
   //statement
```

| i         |
| --------- |
| 1=$2^0$   |
| 2=$2^1$   |
| 4= $2^2$  |
| 8 = $2^3$ |
| ...       |
| $2^k$     |

Assume i >k

$2^k$>n

k>$\log(n)$

### 2. 位數總和

```c
int sumDigits(int n) {
  int sum = 0;
  while (n > 0) {
    sum += n % 10;
    n /= 10;
  }
  return sum;
}
```

假設有 d 位數，n = $10^d$， d = $\log{n}$，時間複雜度為 O($\log{n}$)

## $O(\sqrt{n})$範例

### 1.

```c
for(i = 0; i * i < n; i++)
   //statement
```

| i    |
| ---- |
| 0\*0 |
| 1\*1 |
| 2\*2 |
| 3\*3 |
| ...  |
| k\*k |

Assume i >n

k\*k > n

k > $\sqrt{n}$

## $O(n\log{n})$範例

### 1.

```c
for(i = 0; i < n; i++)          // n
  for(j = 1; j < n; j = j * 2)  // logn
	  //statment;               // nlogn
```

## 比較兩個 function 時間複雜度大小

### 1. 代數字

|     | $n^2$ | $n^3$ |
| --- | ----- | ----- |
| 2   | 4     | 8     |
| 3   | 9     | 27    |
| 4   | 16    | 64    |

$n^2$ < $n^3$

### 2. 兩邊取 log

$n^2$ , $n^3$

取 log

log($n^2$) ,log($n^3$)

2log(n) < 3log(n)

#### log cheetsheet

1. logab = loga + logb
2. log($\frac{a}{b}$) = loga - logb
3. log($a^b$) = bloga
4. $a^{\log_c b}$ = $b^{\log_c a}$
5. $a^b = n$ than $b=\log_a n$

#### ex1.

| f(n) = $n^2\log n$        | g(n) = $n(\log n)^{10}$       |
| ------------------------- | ----------------------------- |
| 取 log                    | 取 log                        |
| $\log  (n^2\log n)$       | $\log (n(\log n)^{10})$       |
| $\log n^2$+ $\log \log n$ | $\log n$ + $\log \log n^{10}$ |
| $2\log n$+ $\log \log n$  | $\log n$ + $10\log \log n$    |

2logn > logn , f(n) > g(n)

#### ex2.

| f(n)= $n^{\log n}$ | g(n) = $2^{\sqrt{n}}$ |
| ------------------ | --------------------- |
| 取 log             | 取 log                |
| $\log n^{\log n}$  | $\log 2^{\sqrt {n}}$  |
| $\log ^2{n}$       | $\sqrt{n}$            |
| 取 log             | 取 log                |
| $2\log \log n$     | $\frac{1}{2}\log n$   |

$\log \log n < \log n$

f(n) < g(n)

## Best, Worse and Average Case Anlysis

### Linear Search

```
 0 1 2  3 4 5 6 7  8  9
[8,6,12,5,9,7,4,3,16,18]
```

Best Case : 第一個就是要找的數字 , B(n) = O(1)

Worse Case: 最後一個才是要找的數字 , W(n) = O(n)

Average Case: $\frac{所有可能的case}{case數量}$

$\frac{1+2+3+...+n}{n}$ = $\frac{\frac{n(n+1)}{2}}{n}$ = $\frac{n+1}{2}$ , A(n) = $\frac{n+1}{2}$

### Binary Search

```
  balance bst               skewed bst
     20                        40
   /    \                     /
  10    30                   30
 /  \  /  \                 /
5   15 25  40              25
                          /
                         20
                        /
                       15
                      /
                    10
                   /
                  5
```

- Best case - search root element  
  B(n) = 1
- Worst case - search for leaf element
  - W(n) = height of tree
  - min W(n) = log(n) (balance bst height is log(n))
  - max W(n) = n

# Reference

- [Video no. 1-16 , Abdul Bari's Algorithm Playlist](https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O)
- Cracking the Coding Interview VI. Big O
