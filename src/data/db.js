import mongoose from 'mongoose';
import promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import dbconfig from '../config/db.config';

function initModel(mongoose) {
    let modelsPath = path.join(__dirname, 'model');
    fs.readdirSync(modelsPath).forEach(function (file) {
        if (/(.*)\.(js$)/.test(file)) {          
            require(modelsPath + '/' + file)(mongoose);
            console.log('<-- 已加载 model ' + file + ' -->');
        }
    });
}

export default function initDb() {
    console.log('<--初始化数据库连接-->');
    mongoose.Promise = promise;
    mongoose.connect(dbconfig.connect, (err) => {
        if (err) {
            throw err;
        }
    });
    initModel(mongoose);
}
