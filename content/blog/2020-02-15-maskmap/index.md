---
title: 如何製作口罩地圖(React+Leaflet)
date: "2020-02-15"
---

## 練習範例

[Example Demo](https://moved0311.github.io/pharmacy-mask-map/)

## 1. 安裝 React 環境

```bash
npm install -g create-react-app
create-react-app new-to-maskmap
cd new-to-maskmap
npm start
```

## 2. 建立一個 Component

建立`src/MaskMap.js`檔案，用來呈現地圖的 Component

<!--more-->

```jsx
// src/MaskMap.js
import React, { Component } from "react"

export default class Maskmap extends Component {
  render() {
    return <h1>Mask map</h1>
  }
}
```

將建立的 Maskmap 元件在 App 中使用。

```jsx
// src/App.js
import React from "react"
import Maskmap from "./MaskMap"

function App() {
  return (
    <div className="App">
      <Maskmap></Maskmap>
    </div>
  )
}
export default App
```

呈現結果
![](https://i.imgur.com/MJ46POJ.png)

## 3.載入 Leaflet 地圖

使用 OpenStreetmap 的地圖資料呈現台灣內部詳細地圖資料(行政區、道路等等)

在`public/index.html`中載入 Leaflet 相關的函式庫。

```html
// public/index.html
...
...
<!-- Load Leaflet from CDN -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
crossorigin=""></script>

<title>React App</title>
  </head>
```

上面載入的 Leaflet 函式庫中會定義 L 物件，直接使用 L 會找不到，將 window.L 賦值到 L 方便後面使用。

建立一個地圖物件，地圖透過 id 找到擺放地圖位置`new L.Map('#id')`，並將座標設在台灣經緯度，`setView([23.79037129915711, 120.95281938174952], 8)`setView 前面擺緯度後面擺經度，後面在地圖上加入 Marker 經緯度沒看清楚可能會 debug 很久，8 是設定視野大小。

接著使用 Open Street Map API 取得台灣地圖的圖層，包含街道名稱、一些地圖相關資料，並將圖層加入到地圖上。

```jsx
// src/MaskMap.js
import React, { Component } from "react"
import "./MaskMap.css"

export default class Maskmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: {},
    }
  }
  componentDidMount() {
    let L = window.L
    let map = new L.Map("maskmap").setView(
      [23.79037129915711, 120.95281938174952],
      8
    )
    let layer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }
    )
    map.addLayer(layer)
    this.setState({ map: map })
  }
  render() {
    return <div id="maskmap"></div>
  }
}
```

建立一個 CSS 檔案控制地圖樣式，先以整個畫面做呈現，這樣就可以先得到一個最初的台灣地圖。

```css
// src/MaskMap.css
#maskmap {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
```

![](https://i.imgur.com/iL61lSm.png)

## 4. 拿資料

在 g0v 社群有很多大神在做口罩地圖的專案，這裡從 kiang github 的[pharmacies 專案](https://github.com/kiang/pharmacies/tree/master/json)幹資料。之前試過自己來弄一個，要定時去[健康保險資料開放服務](https://data.nhi.gov.tw/Datasets/DatasetResource.aspx?rId=A21030000I-D50001-001)下載資料，之後透過 python 來處理下載的 csv 檔案，再用 script 定時將處理好的資料丟到 github 上，這個步驟有點麻煩，所以還是使用現成的資料，感謝開放資料。

在 componentDidMount() lifecycle 中呼叫 loadData()來取得資料，透過 fetch()來向 github 拿資料，這裡要拿 Raw Data 的資料，拿到後包裝成 JSON 物件後再存到 state 中。

使用 getDerivedStateFromProps() life cycle 看拿到的資料長怎樣。getDerivedStateFromProps 應該是蠻新的 life cycle?查資料常常看到其他的 lifecycle，用了之後常常看到這個方法已經棄用了(???)。當 state 更新就會執行 getDerivedStateFromProps。另外在 state 中宣告一個 DataLoaded 變數來判斷是否已經拿到資料了。

```jsx
// src/MaskMap.js
import React, { Component } from "react"
import "./MaskMap.css"

export default class Maskmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: {},
      data: {},
      dataLoaded: false,
    }
  }
  componentDidMount() {
    let L = window.L
    let map = new L.Map("maskmap").setView(
      [23.79037129915711, 120.95281938174952],
      8
    )
    let layer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }
    )
    map.addLayer(layer)
    this.setState({ map: map })

    this.loadData()
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.dataLoaded) {
      console.log(prevState.data)
    }
    return null
  }
  loadData() {
    fetch(
      "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR3fyzFIBPOMj1WcDLJaXEYFZQiAlfW9BFYpsSN_sELepbKtdjM4HGgP7NM",
      {}
    )
      .then(res => {
        return res.json()
      })
      .then(jsonres => this.setState({ data: jsonres, dataLoaded: true }))
  }
  render() {
    return <div id="maskmap"></div>
  }
}
```

![](https://i.imgur.com/xJEpMWF.png)

## 5. 將資料在地圖上呈現

先取前 10 筆藥局資料呈現在地圖上，使用 Leaflet 的 Marker 來標記藥局位置，當點擊 Marker 時能跳出一個框框呈現藥局的相關資料。

最難處理的地方還是如何將藥局的地址轉換為經緯度(定址)，地圖都是用經緯度來標記位置。看了一些網友的評論之前口罩地圖專案發起人收到大筆 google 帳單，錢好像都是花在 google place api 上，但有了開放資料，就不用太擔心了，謝謝開放資料。

coordinates 欄位已經將地址的經緯度轉換好了。之前有嘗試自己用 esri-leaflet 提供的 geocode 來自己轉換，但總共有 6000 多家藥局一個一個轉換然後再放到地圖上，遇到很多問題，之後越想越不對勁就放棄了。

還有一個問題是要將 6000 多家藥局全部放到地圖上會有點划不動，有看到網友將鄰近位置的藥局另外包成一個多邊形然後用數字表示那個區域有多少家藥局(強)。可以顯示全部藥局，又不會划不動。

```jsx
// src/MaskMap.js
import React, { Component } from "react"
import "./MaskMap.css"

export default class Maskmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: {},
      data: {},
      dataLoaded: false,
    }
  }
  componentDidMount() {
    let L = window.L
    let map = new L.Map("maskmap").setView(
      [23.79037129915711, 120.95281938174952],
      8
    )
    let layer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }
    )
    map.addLayer(layer)
    this.setState({ map: map })

    this.loadData()
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let L = window.L
    if (prevState.dataLoaded) {
      let first10Pharmacy = prevState.data["features"].slice(0, 10)
      for (let pharmacy of first10Pharmacy) {
        let coordiantes = pharmacy["geometry"]["coordinates"]
        coordiantes = [coordiantes[1], coordiantes[0]]
        let marker = new L.marker(new L.latLng(coordiantes))
        let popupmsg = `
                藥局名稱: ${pharmacy["properties"]["name"]}<br/>
                地址: ${pharmacy["properties"]["address"]}<br/>
                醫事機構代碼: ${pharmacy["properties"]["id"]} <br/>
                電話: ${pharmacy["properties"]["phone"]}<br/>
                成人口罩總剩餘數: ${pharmacy["properties"]["mask_adult"]}<br/>
                兒童口罩剩餘數: ${pharmacy["properties"]["mask_child"]}<br/>
                來源資料時間: ${pharmacy["properties"]["updated"]}
                `
        marker.bindPopup(popupmsg)
        prevState.map.addLayer(marker)
      }
    }
    return null
  }
  loadData() {
    fetch(
      "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR3fyzFIBPOMj1WcDLJaXEYFZQiAlfW9BFYpsSN_sELepbKtdjM4HGgP7NM",
      {}
    )
      .then(res => {
        return res.json()
      })
      .then(jsonres => this.setState({ data: jsonres, dataLoaded: true }))
  }
  render() {
    return <div id="maskmap"></div>
  }
}
```

![](https://i.imgur.com/VVuV1Xa.png)

## Reference

- [kiang/pharmacies](https://github.com/kiang/pharmacies)
- [健保特約醫事機構-藥局](https://data.gov.tw/dataset/39284)
- [Leaflet](https://leafletjs.com/)
- [OpenStreet Map](https://wiki.openstreetmap.org/wiki/Tiles)
