import gulp from 'gulp';
import { exec } from 'child_process';

export function runCommand(command){
    return function () {
        exec(command, function (err, stdout, stderr) {
            console.log("<-- 看看输出！-->");
            var jsonStr = /(\{[\W\w]*[\}\n\r\ ]+$)/g.exec(stdout);
            var outObject = jsonStr!=null? JSON.parse(jsonStr[0]):null;
            ///(\{[\W\w]*\}$)/g.exec(stdout.toString());
            //var outObject = JSON.stringify(stdout);
            console.log(stdout);
            console.log(outObject.ok);
            //console.log(stderr);
            if (err !== null) {
                console.log('exec error: ' + err);
            }
        });
    }
}


