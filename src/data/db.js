/**
 *  数据库准备 
 *  
 *  检查，创建数据库实例，添加数据库管理员
 *  初始化 mongoose 信息
 */
import mongoose from 'mongoose';
import { exec } from 'child-process-promise';
import fs from 'fs';
import path from 'path';
import dbconfig from '../config/db.config';

const rMatchJson = /([\{\[][\W\w]*(?:[\]\}][\ ]*)+$)/g;

function getEval(useScript, useDB = 'test') {
    let initEval = 'mongo --eval ';
    initEval += '\"';
    initEval += 'db = db.getSiblingDB(\\"' + useDB + '\\"); ';
    return initEval + useScript + '\"';
}

function getEscapeJson(jsonObj) {
    return JSON.stringify(jsonObj).replace(/"/g, '\\"');
}

function getOutInfoObject(stdout) {
    let outInfoArr = stdout.toString().replace(/\r\n/g, '|').split('|');
    let mongoDbVersion = outInfoArr.shift();
    let connectDb = outInfoArr.shift();
    let outActionInfo = outInfoArr.join(' ').replace(/\t/g, "");
    return {
        version: mongoDbVersion,
        db: connectDb,
        info: outActionInfo
    };
}

function asyncExecMongoShell(command) {
    //console.log('<-- 执行的MongoShell --> : ' + command);
    return exec(command)
        .then((result) => {
            let outInfoObj = getOutInfoObject(result.stdout);
            let jsonArr = outInfoObj.info.match(rMatchJson);
            //console.log('<-- 执行的的结果 --> :' + jsonArr);
            let outInfo;
            if (jsonArr != null && jsonArr.length > 0) {
                outInfo = JSON.parse(jsonArr[0]);
            } else {
                outInfo = outInfoObj.info;
            }
            return {
                command: command,
                outInfo: outInfo
            }
        });
}

function checkDBInstance() {
    //console.log('\n<-- 检查 ' + dbconfig.dbname + ' 库信息 -->');
    let execScript = 'param = \\"listDatabases\\"; db.adminCommand(param);';
    var returnObj = {
        isInstance: false
    }
    return asyncExecMongoShell(getEval(execScript))
        .then((data) => {
            if (data.outInfo instanceof String) reject('get database list error : (' + data.command + ')');
            let hasDb = data.outInfo.databases.some(i => i.name == dbconfig.dbname);
            if (hasDb) {
                let execScript = 'db.getUsers(); ';
                return asyncExecMongoShell(getEval(execScript, dbconfig.dbname))
                    .then((data) => {
                        if (data.outInfo instanceof String) reject('get user list error : (' + data.command + ')');
                        let hasUser = data.outInfo.some(i => i.user === dbconfig.username && i.db === dbconfig.dbname);
                        if (hasUser) {
                            returnObj.isInstance = true;
                        }
                        return returnObj;
                    });
            } else {
                return returnObj;
            }
        })
}

function cleanDB() {
    //console.log('\n<-- 清理旧 ' + dbconfig.dbname + ' 库的信息 -->');
    let execScript = 'db.dropDatabase(); ';
    execScript += 'db.removeUser(\\"' + dbconfig.username + '\\"); ';
    return asyncExecMongoShell(getEval(execScript))
        .then((data) => {
            console.log(data.outInfo)
        });
}

function createDB() {
    //console.log('\n<-- 创建 ' + dbconfig.dbname + ' 库的实例 -->');
    let testDateStr = getEscapeJson({ test: 111 });
    let execScript = 'db.test.insert(' + testDateStr + '); ';
    return asyncExecMongoShell(getEval(execScript, dbconfig.dbname))
        .then((data) => {
            if (data.outInfo.trim() == 'WriteResult({ "nInserted" : 1 })') {
                let execScript = 'db.test.deleteMany(' + testDateStr + ')';
                return asyncExecMongoShell(getEval(execScript, dbconfig.dbname))
                    .then((data) => {
                        if (!data.outInfo.acknowledged) {
                            reject('deleteMany error : (' + data.command + ')');
                        } 
                    });
            } else {
                reject('inserted error : (' + data.command + ')');
            }
        });
}

function createDBUser() {
    //console.log('\n<-- 添加 ' + dbconfig.dbname + ' 库的管理员 -->');
    let execScript = ' db.createUser(' + getEscapeJson(dbconfig.dbuser) + ');';
    return asyncExecMongoShell(getEval(execScript, dbconfig.dbname))
        .then((data) => {
            console.log(data);
        });
}

function connectDB(callBack) {
    //console.log('\n<-- 初始化 mongoose 数据库连接 -->');
    mongoose.Promise = global.Promise;
    mongoose.connect(dbconfig.connect, (err) => {
        if (err) {
            throw err;
        }
    });
    initModel(mongoose);
    callBack();
}

function initModel(mongoose) {
    let modelsPath = path.join(__dirname, 'model');
    fs.readdirSync(modelsPath).forEach(function (file) {
        if (/(.*)\.(js$)/.test(file)) {
            require(modelsPath + '/' + file)(mongoose);
            //console.log('<-- 已加载 model ' + file + ' -->');
        }
    });
}

export default function initDb(callBack) {
    checkDBInstance()
        .then((obj) => {
            if (obj.isInstance) {
                connectDB(callBack);
            } else {
                return cleanDB()
                    .then(() => {
                        return createDB();
                    }).then(() => {
                        return createDBUser();
                    }).then(() => {
                        connectDB(callBack);
                    });
            }
        }).catch((err) => {
            console.log('exec error :' + err);
        })
}
