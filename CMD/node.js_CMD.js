var exec = require('child_process').exec;
function execute(cmd) {

    exec(cmd, function (error, stdout, stderr) {
        if (error) {
            console.error(error);
        }
        else {
            console.log("success");
        }
    });

}
// //CMD
// execute('type nul>a.txt');   
// execute('mkdir floder');
// execute('move a.txt ./floder');

// execute('del a.txt');

execute('ipconfig /all > ipconfig.txt');
