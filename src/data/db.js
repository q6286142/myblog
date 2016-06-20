import mongoose from 'mongoose';
import promise from 'bluebird';
import fs from 'fs';
import path from 'path';

const uri = 'mongodb://qjy:6286142jia!@localhost:27017/blog';

function initModel(mongoose){
    let modelsPath = path.join(__dirname, 'model');
    fs.readdirSync(modelsPath).forEach(function (file) {
        if (/(.*)\.(js$)/.test(file)) {
            require(modelsPath + '/' + file)(mongoose);
        }
    });
}

export default function initDb() {
    console.log('<--初始化数据库连接-->');
    mongoose.Promise = promise;
    mongoose.connect(uri, (err) => {
        if (err) {
            throw err;
        }
    });
    initModel(mongoose);
}
