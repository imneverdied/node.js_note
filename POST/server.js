var OTF = '✔';
var http = require('http');
var server = http.createServer(function (Q, S) {
    //Q:request S:response

    if (Q.method == 'POST') {
        var jsonString = '';

        Q.on('data', function (data) {

            jsonString += data;

            var currentDateTime = getTime();

            var logPOST = currentDateTime + ' [POST]:' + jsonString;
            //outfile('./dataS.txt', logPOST);
            outfile('./dataALL.txt', '[' + OTF + ']' + logPOST);
            console.log('[' + OTF + ']' + logPOST);


            Q.on('end', function () {

                var currentDateTime = getTime();

                S.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                var XX = jsonString

                //主要處理運算
                // XX = Math.sqrt(XX)
                // var YY = String(XX)
                //主要處理運算



                var logRESPONSE = currentDateTime + ' [RESP]:' + jsonString;
                //outfile('./dataR.txt', logRESPONSE);
                outfile('./dataALL.txt', '[' + OTF + ']' + logRESPONSE);
                console.log('[' + OTF + ']' + logRESPONSE);

                jsonString = '已收到POST:' + jsonString;
                var msgSSS = JSON.stringify(jsonString);

                S.write(msgSSS, 'UTF-8');
                var msg = jsonString;

                S.end();

            });
        })
    }
});

server.listen(8081);
// Fexists('./dataR.txt', 'dataR.txt')
// Fexists('./dataS.txt', 'dataS.txt')
Fexists('./dataALL.txt', 'dataALL.txt')
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
    //把文字寫入檔案
    const fs = require('fs')

    logTXT = logTXT + '\r\n';
    fs.appendFile(src, logTXT, function (error) {
        if (error != null) {
            OTF = '✘';
            console.log('[' + OTF + ']' + error);
        }
        else { OTF = '✔'; }
    });

}


function Fexists(src, name) {
    //確認檔案是否存在，不存在則創建檔案
    const fs = require('fs')

    fs.access(src, (err) => {
        if (!err) {
            return;
        }
        else {
            fs.writeFile(src, '', function (error) {
                if (error != null) console.log(error)
                console.log(name + '創建成功')
            })

        }
    });

}


