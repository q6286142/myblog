import * as common from '../../common';

module.exports = (gulp, Plugin, rootDirectory) => {
    function getEval(useScript, isUseAdmin) {
        let initEval = 'mongo --eval ';
        initEval += '\"';
        if (isUseAdmin) {
            initEval += 'use admin;';
        }
        return initEval + useScript + '\"';
    }

    gulp.task('create-user', () => {
        var dbUserConfig = {
            user: "qjy",
            pwd: "6286142jia!",
            customData: {
                description: "",
                email: ""
            },
            roles: ["readWrite"]
        };
        var execScript = ' db.createUser(' + JSON.stringify(dbUserConfig) + ');';
        common.runCommand(getEval(execScript, false))();
    });

    gulp.task('create-db', () => {
        var testDate = { test: 111 };
        var execScript = 'use blog; ';
        execScript += 'db.collection.insert(' + JSON.stringify(testDate) + ');';
        common.runCommand(getEval(execScript))();
    });

    gulp.task('init-db', (cb) => {
        Plugin.runSequence('create-user', cb);
    });

    gulp.task('get-db-list',()=>{
        //var execScript = ' db = connect("localhost:27020/admin"); ';
        //execScript += ' db = conn.getDB(\"admin\"); ';   ; 
        var execScript ='db.adminCommand(\'listDatabases\');';
        common.runCommand(getEval(execScript))();
    })
}

