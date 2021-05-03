var fs = require('fs')

fs.readFile('./dataALL.txt', function (error, data) {

    if (error) {
        console.log('讀取檔案失敗')
        return
    }
    var FileString = data.toString();
    const MYTXT = FileString.split('\r\n');
    const MMT = []
    for (let i = 0; i < MYTXT.length - 1; i++) {
        const A = MYTXT[i].split(' ');
        MMT.seq = A[1];
        MMT.date = A[2];
        MMT.time = A[3];
        const B = A[4].split(':')
        MMT.NAME = B[0];
        MMT.TXT = B[1];
        if (parseInt(MMT.seq) > 10) {
            console.log(MMT.date + ' ' + MMT.time + ' ' + MMT.NAME + ':' + MMT.TXT)
        }
    }

})




