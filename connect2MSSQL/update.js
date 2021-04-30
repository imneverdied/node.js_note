
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
        port: 1433            //Microsoft Management Console

    };

    //connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);

        //create Request object
        var request = new sql.Request();

        request.query("UPDATE NODE SET NODE.TXT = 'AAA' WHERE SEQ ='1'; ", function (err, data) {
            if (err) { console.log(err); }
            else {
                console.log('success');
                res.send('success');
            }

        });
    });

});

var server = app.listen(8081, function () {
    console.log('Server is running!');
});
