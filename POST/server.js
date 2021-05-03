let OTF = '✔';
var http = require('http');
var SEQ = 0;
var server = http.createServer(function (Q, S) {
    //Q:request S:response

    if (Q.method == 'POST') {
        var jsonString = '';

        Q.on('data', function (data) {
            //對編碼後的結果做解碼。
            jsonString += decodeURI(data);
            let IP = Q.socket.remoteAddress;
            let currentDateTime = getTime();
            //把data放進TEXT NAME裡
            let TEXT = jsonString.substr(5, jsonString.indexOf('&', 0) - 5);
            let NAME = jsonString.substr(jsonString.indexOf('NAME', 0) + 5, jsonString.length - jsonString.indexOf('NAME', 0) + 5);

            if (TEXT !== '' && NAME !== '') {
                var logPOST = SEQ + ' ' + currentDateTime + ' ' + NAME + ':' + TEXT;

                outfile('./dataALL.txt', '[' + OTF + '] ' + logPOST);
                //console.log('[' + OTF + '] ' + logPOST);
            }

            Q.on('end', function () {

                let currentDateTime = getTime();

                S.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });

                let ALLmsg = readData(currentDateTime)

                var RTN = currentDateTime + ' ' + NAME + ':' + TEXT;
                //let msgSSS = JSON.stringify(RTN);

                updateData(SEQ);
                if (TEXT !== '' && NAME !== '') {
                    FData = FData + RTN
                    SEQ = SEQ + 1;
                }
                let msgSSS = JSON.stringify(FData)

                S.write(msgSSS, 'UTF-8');

                S.end();

            });
        })
    }
});

server.listen(8081, '0.0.0.0');
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
    let today = new Date();
    let Sec = today.getSeconds().toString();
    let min = today.getMinutes().toString();
    let hour = today.getHours().toString();
    var currentDateTime = (today.getMonth() + 1) + '/' + today.getDate() + ' ' + paddingLeft(hour) + ':' + paddingLeft(min);
    //var currentDateTime = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + ' ' + paddingLeft(hour) + ':' + paddingLeft(min) + ':' + paddingLeft(Sec);

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


function readData(datatime) {

    const fs = require('fs')
    var lastTXT = '';
    fs.readFile('./dataALL.txt', function (error, data) {

        if (error) {
            console.log('讀取檔案失敗')
            return
        }
        let FileString = data.toString();

        // datatime = '[✔]4/28 09:40'
        datatime = '[✔]' + datatime;
        let start = FileString.indexOf(datatime, 0);
        let end = FileString.length;

        lastTXT = FileString.substr(start, end);

    })

    return lastTXT;
}


var FData = '';
function updateData(SEQ) {
    //根據SEQ讀取未顯示的訊息回傳
    var fs = require('fs')

    fs.readFile('./dataALL.txt', function (error, data) {

        if (error) {
            console.log('讀取檔案失敗')
            return
        }
        var FileString = data.toString();
        const MYTXT = FileString.split('\r\n');
        const MMT = []
        FData = ''
        let UPData = '';
        for (let i = 0; i < MYTXT.length - 1; i++) {
            const A = MYTXT[i].split(' ');
            MMT.seq = A[1];
            MMT.date = A[2];
            MMT.time = A[3];
            const B = A[4].split(':')
            MMT.NAME = B[0];
            MMT.TXT = B[1];

            if (parseInt(MMT.seq) <= SEQ && parseInt(MMT.seq) >= (SEQ - 10)) {

                UPData = MMT.date + ' ' + MMT.time + ' ' + MMT.NAME + ':' + MMT.TXT + '|'
            }
            FData = FData + UPData
        }

    })

    //return FData;
    console.log(FData);

}
