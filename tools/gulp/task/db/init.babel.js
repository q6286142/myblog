import * as common from '../../common';

module.exports = (gulp, Plugin, rootDirectory) => {
    console.log(JSON.stringify(Plugin));

    function getEval(useScript, isUseAdmin) {
        let initEval = 'mongo --eval ';
        initEval += '\'';
        if (isUseAdmin) {
            initEval += 'use admin;';
        }
        return initEval + useScript + '\'';
    }

    gulp.task('create-user', () => {
        var dbUserConfig = {
            user: "qjy",
            pwd: "6286142jia!",
            customData: {
                description: "",
                email: ""
            },
            roles: [
                { role: "clusterAdmin", db: "blog" },
                { role: "readAnyDatabase", db: "blog" },
                "readWrite"
            ]
        };
        var execScript = 'db.createUser(' + JSON.stringify(dbUserConfig) + ');';
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
}

