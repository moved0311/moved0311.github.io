---
title: "鉅亨網前端工作一年心得"
date: "2022-10-31"
tags: ["Work"]
---

## 前言

在 2021 九月底開始在鉅亨前端工作，是我的第二份工作。\
第一份工作是在接案公司，會離職是覺得接案公司的文化沒辦法長期累積經驗，沒有完整的開發流程，Code Review、寫測試制度等等。所以在挑下一個工作時就會考慮公司要有自己的產品長期維護和有一套完整開發流程。

## 技術部門組成

技術部門分成 Java, PHP, Frontend, Android, IOS, SRE 部門。Frontend 部門剛進去加我是三個人，目前 2022/10 是六個人。

- Java 主要負責接股票的行情報價
- PHP 負責新聞、商城部分
- Frontend 負責首頁、新聞、台股、美股畫面部分
- Andriod 和 IOS 負責手機板的部分
- SRE 管理 Gitlab 機器、雲端機器、維運。

## 工作流程

鉅亨工作的流程是類 Scrum，每兩週是一個 Sprint。PM 每個 Sprint 就會針對部門分配各自的票，工程師就針對每一個票做開發。

## 前端開發流程

每個 Sprint 開始組長會大概說明每個票的內容和分配票給組員。

剛開始前三個月就熟悉工作流程、專案架構等等和處理一些較簡單的票。\
開發完成後會在 GitLab 發 PR(Pull Request)並在 Slack 群組傳訊息請其他人幫你 Code Review。如果沒什麼問題就會推版到 beta 環境給 PM 測試，測試沒問題就會推到 production 上。

在 branch 上主要分成兩支，根據目前 Sprint 例如是 80(Sprint 80)，就會有目前在 prod 上的分支`release/3.79.0`和開發目前新功能的分支`release/3.80.0`。如果 prod 上有什麼東西壞了，就會從`release/3.79.0`開分支做 Hotfix。如果是開發新功能會從`release/3.80.0`長分支來實做。\
Sprint 換到 81 時，會把 79 和 80 合併回 master，再從 master 開新的`release/3.81.0`不斷的持續下去。

隨著前端的人越來越多，推版的任務就用輪流的方式每個人推一個月。\
實際輪過之後發現推版真的有點煩，有太多專案。目前專案可能有 7.8 個，首頁、新聞、新聞手機板、行情內頁、基金、共用元件庫都是不同的專案。專案建立的時間大約是六年前(2016 左右)，當時可能還不流行[Monorepo 架構](https://medium.com/hannah-lin/%E7%82%BA%E4%BB%80%E9%BA%BC%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E8%B6%8A%E4%BE%86%E8%B6%8A%E6%84%9B%E4%BD%BF%E7%94%A8-monorepo-%E6%9E%B6%E6%A7%8B-661afa90910a)，沒辦法集中管理。如果動到共用元件庫，那就會很慘，每個專案都要重新推版才能吃到最新的共用元件。

## 做了什麼事

和另一個同事一起做了[台股首頁](https://www.cnyes.com/twstock/)，碰到各種表格和圖表。表格會碰到各種單位小數點問題，一開始小數位數處理是在前端做，由於不同商品會有不同小數位數不容易維護，目前慢慢轉移到後端處理。還會有每個欄位不同樣式，例如有個要靠右有的要靠左、有的要顯示漲跌顏色、有的要有超連結。\
線圖部分主要是用 [Tradingview Library](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/)和 [Highchart](https://www.highcharts.com/)，這些圖表都會有很多複雜的設定檔，如果要客製化可能會遇到一些麻煩。

後來陸續做了[虛擬貨幣首頁](https://crypto.cnyes.com/)和[虛擬貨幣內頁](https://crypto.cnyes.com/BTC/24h)。

## 目前看到的優點缺點

- 優點
  1. 同事會互相 Code Review
	2. 每週技術部開會會有技術分享
  3. ~~上班看新聞也看起來像是有在做事~~
- 缺點
  1.  開發環境老舊，目前專案環境都是 node 8.11（2022 出到 node 18）、nextjs 7(2022 出到 nextjs 13)。\
  node 版本太舊會導致很多相依套件只能鎖在很舊的版本。node 升版也不是一件容易的事情，不太確定多久後會做這件事，感覺重新建立一個新的專案會比升版快一些。

## Reference:

- [為什麼前端工程越來越愛使用 Monorepo 架構](https://medium.com/hannah-lin/%E7%82%BA%E4%BB%80%E9%BA%BC%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E8%B6%8A%E4%BE%86%E8%B6%8A%E6%84%9B%E4%BD%BF%E7%94%A8-monorepo-%E6%9E%B6%E6%A7%8B-661afa90910a)
