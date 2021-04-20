
// 載入模組
var http = require('http')

// 使用 http.createServer() 方法建立 Web 伺服器，回傳一個 Server 實例
var server = http.createServer()

// 註冊 request 請求事件監聽，當前端請求過來，此事件就會被觸發，並且執行 callback 函式
//server.on('request', function () {

//})

// 綁定 port，啟動伺服器
server.listen(8081, function () {
  console.log('伺服器已在 port 8081 運行 ...')
})

//主要回應程式
server.on('request', function (request, response) {

  console.log('收到request')
  var url = request.url
  if (url === '/') {
    response.write('connect success!')
  }
  else if (url === '/write') {

    const fs = require('fs')
    // main.js
    fs.writeFile('./data.json', '檔案內容', function (error) {
      if (error != null) {
        console.log(error)
      }
      console.log('文件寫入成功')

      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.write('success')
      response.end();
    })

  }


})


