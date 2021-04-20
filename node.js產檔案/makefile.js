const fs = require('fs')
// main.js
fs.writeFile('./writejson.json', '# 我是被寫入的檔案',function (error) {
  console.log(error)
  console.log('文件寫入成功')
})