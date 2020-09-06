---
title: Time complexity 
date: "2020-09-07"
tags: ["Algorithms"]
---
## Introduction to algorithms

## Time & space complexity
* How to analyze an algorithms
1. Time
2. Space
3. Network
4. Power
5. CPU registers

### Swap
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


### Frequency count method
```c
Algorithm sum(A,n){         // time    space
    s = 0;                  //--- 1    A -- n
    for(i = 0; i < n; i++){ //--- n+1  n -- 1
    //    1     n+1   n                s -- 1
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
### 1.
```c
for(i=0; i<n; i++){ // n+1
  //statment;       // n
}                   //O(n)
```
如果不要計算麼細, for那行可以不用細算(最後都會降回n)

只要知道for裡面的描述會執行n次，就可以簡單判斷是O(n)

```c
for(i=1; i<n; i=i+2){ 
  //statment;       // n/2
}                   //O(n)
```
### 2.
```c
for(i=0; i<n; i++){   // n+1
  for(j=0; j<n; j++){ // n*(n+1)
    //statment;       // n*n
  }
}                   //O(n^2)
```
### 3.
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

### 4.
```c
p = 0;
for(i=1; p<=n; i++){ //目標要計算這個for迴圈的複雜度
  p = p + i;
}
```
| i   | p             |
| --- | ------------- |
| 1   | 0+1           |
| 2   | 1+2           |
| 3   | 1+2+3         |
| 4   | 1+2+3+4       |
| ... | ...           |
| k   | 1+2+3+4+...+k |
假設 p > n (迴圈結束)

p = $\frac{k(k+1)}{2}$

$\frac{k(k+1)}{2}$ > n

$k^2$ > n

k > $\sqrt{n}$
所以這個for的複雜度是O$(\sqrt{n})$
### 5.
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

###  7.
```c
for(i=0;i*i<n;i++)
   //Statment
```
| i   |
| --- |
| 0*0 |
| 1*1 |
| 2*2 |
| 3*3 |
| ... |
| k*k |

Assume i >n

k*k > n 

k > $\sqrt{n}$

### 9 
```c
P=0
for(i=1; i<n; i=i*2) // log(n)
	P++;             // P = log(n)
for(j=1; j<P; j=j*2) // log(P)
	//statment;      // log(P) = log(logn)
					 //O(loglog(n))
```
### 10
```c
for(i=0; i<n; i++)      // n
  for(j=1; j<n; j=j*2)  // n * logn
	  //statment;       // nlogn
	                    // -----
	                    // 2nlogn + n
	                    // O(nlogn)
```

## Typed of Time functions
|          |             |
| -------- | ----------- |
| O(1)     | Constant    |
| O(logn)  | Logrithemic |
| O(n)     | Linear      |
| O($n^2$) | Quadratic   |
| O($n^3$) | Cubic       |
| O($2^n$) | Exponential |

1 < logn < $\sqrt{n}$ < n < nlogn < $n^2$ < $n^3$ < ... <  $2^n$ <  $3^n$ < ...  <  $n^n$

| logn | n   | $n^2$ | $2^n$ |
| ---- | --- | ----- | ----- |
| 0    | 1   | 1     | 1     |
| 1    | 2   | 4     | 4     |
| 2    | 4   | 16    | 16    |
| 3    | 8   | 64    | 256   |

## Asymptotic Notation
|          |           |               |
| -------- | --------- | ------------- |
| O        | big-oh    | upper bound   |
| $\Omega$ | big-omega | lower bound   |
| $\Theta$ | theta     | average bound |

### Big-oh
***
$f(n) = O(g(n))$ iff $\exist$ positive constant C and $n_0$
such that $f(n) \leq C \times g(n)  ,\forall n \geq n_0$
***
e.g. f(n) = 2n+3

2n+3 <= 10n , n >=1 

2n+3 <=  7n  , n >=1

2n+3 <= 2n + 3n <= 5n, n >=1

f(n) = O(n)

### Omega
***
$f(n) = \Omega(g(n))$ iff $\exist$ positive constant C and $n_0$
such that $f(n) \geq C \times g(n)  ,\forall n \geq n_0$
***
e.g f(n) = 2n+3

2n+3 >= n , n >=1

f(n) = $\Omega$(n)

### Theta Notation
***
$f(n) = \Theta(g(n))$ iff $\exist$ positive constant $C_1, C_2$ and $n_0$
such that $C_1 \times g(n) \leq f(n) \leq C_2 \times g(n)$
***
e.g. f(n) = 2n +3

n <= 2n+3 <= 5n

f(n) = $\Theta$(n)

## Comparision of functions
### 1. 代數字

|     | $n^2$ | $n^3$ |
| --- | ----- | ----- |
| 2   | 4     | 8     |
| 3   | 9     | 27    |
| 4   | 16    | 64    |

$n^2$ < $n^3$

### 2. 兩邊取log
$n^2$  ,  $n^3$

取log

log($n^2$) ,log($n^3$)

2log(n) < 3log(n)


#### log cheetsheet
1. logab = loga + logb
2. log($\frac{a}{b}$) = loga - logb
3. log($a^b$) = bloga
4. $a^{\log_c b}$ = $b^{\log_c a}$
5. $a^b = n$ than $b=\log_a n$

#### ex1.
 ---
| f(n) = $n^2\log n$        | g(n) = $n(\log n)^{10}$       |
| ------------------------- | ----------------------------- |
| 取log                     | 取log                         |
| $\log  (n^2\log n)$       | $\log (n(\log n)^{10})$       |
| $\log n^2$+ $\log \log n$ | $\log n$ + $\log \log n^{10}$ |
| $2\log n$+ $\log \log n$  | $\log n$ + $10\log \log n$    |
2logn > logn , f(n) > g(n)

#### ex2.
---
| f(n)= $n^{\log n}$ | g(n) = $2^{\sqrt{n}}$ |
| ------------------ | --------------------- |
| 取log              | 取log                 |
| $\log n^{\log n}$  | $\log 2^{\sqrt {n}}$  |
| $\log ^2{n}$       | $\sqrt{n}$            |
| 取log              | 取log                 |
| $2\log \log n$     | $\frac{1}{2}\log n$   |

$\log \log n < \log n$

f(n) < g(n)

## Best, Worse	and Average Case Anlysis
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
* Best case - search root element  
B(n) = 1   
* Worst case - search for leaf element
  * W(n) = height of tree
  * min W(n) = log(n)   (balance bst height is log(n))
  * max W(n) = n 

## Reference
* [Video no. 1-16 , Abdul Bari's Algorithm Playlist](https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O)