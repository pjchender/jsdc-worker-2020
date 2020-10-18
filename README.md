# 用錯非同步，服務一樣會卡住

> 議程與專案說明請參見[投影片](https://docs.google.com/presentation/d/14tuekWY4I1BSJbsFnOGdsZP1c0ocR6gXiuiH7s5yHeM/edit?usp=sharing) by PJCHENder @ JSDC 2020

下圖中 **Number of Waiting Response** 表示瀏覽器送出請求後，尚未收到伺服器回應的數目
- 最左邊的卡片，模擬一般的使用者請求，由於不需要進行複雜運算，因此送出請求後，可以馬上收到伺服器的回應
- 中間卡片模擬請求送出後，伺服器需要進行複雜運算，且**沒有**使用 worker，將導致伺服器因為主線程阻塞而無法處理一般的請求

![img](https://i.imgur.com/EccNw3V.gif)

- 右邊卡片模擬請求送出後，伺服器需要進行複雜運算，但**有**把複雜運算的任務交給 worker 處理，此時不會阻塞 Node.js 中的主線程，進而使得伺服器仍可正常處理一般的請求。

![2](https://i.imgur.com/lC41Nfo.gif)

## 在本機啟動專案

### client

進入到 `client` 資料夾後：

```bash
$ npm install
$ npm start
```

### server

進入到 `server` 資料夾後：

```bash
$ npm install
$ npm start
```

## 參考

- [JSDC 2020 完整議程](https://2020.jsdc.tw/agenda)
- [Worker threads](https://nodejs.org/api/worker_threads.html) @ Node.js
- [Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) @ MDN
