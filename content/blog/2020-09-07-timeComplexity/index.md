---
title: Big O
date: "2020-09-07"
tags: ["Algorithms"]
lastUpdate: "2021-08-31"
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
當然在 $n\ge 1$ 時，$n^2, n^3$都是一個 upper bound 但是會找最具代表性的作為 f(n)的 upper bound(最靠近)。

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

# 各種範例

### 1. Swap

```c
Algorithms Swap(a,b)
{              time    space
	temp = a;  ---1    a   --- 1
	a = b;     ---1    b   --- 1
	b = temp;  ---1   temp --- 1
}
           f(n) = 3        s(n) = 3 words
                O(1)           O(1)

```

### 2. Frequency count method

```c
Algorithm sum(A,n){         // time    space
    s = 0;                  //--- 1    A -- n
    for(i = 0; i < n; i++){ //--- n+1  n -- 1
                            //         s -- 1
       s = s + A[i]         //---n     i -- 1
    }                       //         S(n)=n + 3
    return s;               //---1       O(n)
}
                           //f(n)=2n+3
                           // O(n)
```

```c
Algorithm Add(A,B,n){         // time
	for(i=0; i<n; i++){       // n+1
	  for(j=0; j<n; j++){     // n(n+1)
	    c[i,j] = A[i,j]+B[i,j]; // n*n
	  }                       // f(n)=2n^2+2n+1
	}                         // O(n^2)
}
/*
Space
i -- 1
j -- 1
n -- 1
A -- n^2
B -- n^2
C -- n^2
S(n) = n^2+3
O(n^2)
*/
```

```c
Algorithm Mutiply(A,B,n){
  for(i=0; i<n; i++)              // n+1
    for(j=0; j<n; j++){           // n(n+1)
      C[i,j]=0;                   // n*n*1
      for(k=0; k<n; k++)          // n*n*(n+1)
        C[i,j]=C[i,j]+A[i,k]*B[k,j] //n*n*n
	}                             //f(n)=2n^3+3n^2+2n+1
}                                 //O(n^3)
/*
Space
A -- n^2
B -- n^2
C -- n^2
i -- 1
j -- 1
k -- 1
n -- 1
S(n) = 3n^2+4
O(n^2)
*/
```

---

### 3.

```c
for(i=0; i<n; i++){ // n+1
  //statment;       // n
}                   //O(n)
```

如果不要計算麼細, for 那行可以不用細算(最後都會降回 n) \
只要知道 for 裡面的描述會執行 n 次，就可以簡單判斷是 O(n)

```c
for(i=1; i<n; i=i+2){
  //statment;       // n/2
}                   //O(n)
```

### 4.

```c
for(i=0; i<n; i++){   // n+1
  for(j=0; j<n; j++){ // n*(n+1)
    //statment;       // n*n
  }
}                   //O(n^2)
```

### 5.

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

### 6.

```c
for(i=1;i<=n;i=i*2)
   //Statment
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

### 7.

```c
for(i=0;i*i<n;i++)
   //Statment
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

### 8

```c
P=0
for(i=1; i<n; i=i*2) // log(n)
	P++;             // P = log(n)
for(j=1; j<P; j=j*2) // log(P)
	//statment;      // log(P) = log(logn)
					 //O(loglog(n))
```

### 9

```c
for(i=0; i<n; i++)      // n
  for(j=1; j<n; j=j*2)  // n * logn
	  //statment;       // nlogn
	                    // -----
	                    // 2nlogn + n
	                    // O(nlogn)
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
