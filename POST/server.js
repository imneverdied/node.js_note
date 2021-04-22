var OTF = '✔';
var http = require('http');
var server = http.createServer(function (Q, S) {
    //Q:request S:response

    if (Q.method == 'POST') {
        var jsonString = '';

        Q.on('data', function (data) {
            jsonString += data;

            var currentDateTime = getTime();

            var logPOST = currentDateTime + ' [POST]:' + JSON.parse(jsonString);
            outfile('./dataS.txt', logPOST);
            console.log('[' + OTF + ']' + logPOST);
			

            Q.on('end', function () {

                var currentDateTime = getTime();

                S.writeHead(200, { 'Content-Type': 'application/json' });
                var XX = parseInt(jsonString)

                //主要處理運算
                XX = Math.sqrt(XX)
                var YY = String(XX)
                //主要處理運算

                S.write(YY);

                var logRESPONSE = currentDateTime + ' [RESP]:' + YY;
                outfile('./dataR.txt', logRESPONSE);
                console.log('[' + OTF + ']' + logRESPONSE);

                var msg = JSON.stringify(YY);
                S.end(msg);

            });
        })
    }
});

server.listen(8081);

const fs = require('fs')
// 初始設定資料
fs.writeFile('./dataR.txt', '',function (error) {
  if(error!=null)console.log(error)
  console.log('dataR.txt創建成功')
})
fs.writeFile('./dataS.txt', '',function (error) {
  if(error!=null)console.log(error)
  console.log('dataS.txt創建成功')
})
console.log('Node.js web server at port 8081 is running..')

function paddingLeft(str) {
    //時間補0
    if (str.length == 1)
        return "0" + str;
    else
        return str;
}

function getTime() {
    //取得時間
    var today = new Date();
    var Sec = today.getSeconds().toString();
    var min = today.getMinutes().toString();
    var hour = today.getHours().toString();

    var currentDateTime = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + ' ' + paddingLeft(hour) + ':' + paddingLeft(min) + ':' + paddingLeft(Sec);

    return currentDateTime;
}

function outfile(src, logTXT) {
    //產檔案
    const fs = require('fs')
    fs.readFile(src, function (error, data) {
        if (error != null) {
            console.log(error)
        }
        else {
            var oldTXT = '';
            oldTXT += data;
            logTXT = oldTXT + logTXT + '\r\n';
            fs.writeFile(src, logTXT, function (error) {
                if (error != null) {
                    console.log(error);
                    OTF = '✘';
                }
                else { OTF = '✔'; }
            });
        }
    })

}