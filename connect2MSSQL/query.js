
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    var sql = require('mssql');

    //config for your database
    var config = {
        user: '...',          // your username
        password: '...',      // your password
        server: 'localhost',  // You can use 'localhost\\instance' to connect to named instance
        database: '...',      // your database
        port: 1433

    };


    //connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);

        //create Request object
        var request = new sql.Request();



        request.query('select * from NODE', function (err, data) {
            if (err) console.log(err);

            //send records as a response

            var ST = []

            for (let i = 0; i < data.recordset.length; i++) {

                //console.log(data.recordset[i])
                ST.push(data.recordset[i])
                console.log(ST[i]['SEQ'] + ':' + ST[i]['TXT'])
            }

            res.send(ST);

        });
    });

});

var server = app.listen(8081, function () {
    console.log('Server is running!');
});
