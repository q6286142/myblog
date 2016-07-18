import gulp from 'gulp';
import { exec } from 'child_process';

export function runCommand(command){
    return function () {
        exec(command, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            if (err !== null) {
                console.log('exec error: ' + err);
            }
        });
    }
}


