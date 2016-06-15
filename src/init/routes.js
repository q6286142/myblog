// import homeController from '../routes/index';
// import users from '../routes/users';
// import error from '../routes/error';
// import admin from '../routes/admin';
import express from 'express';
import fs from 'fs';
import path from 'path';
import {System} from 'es6-module-loader';

export default function initRoutes(app) {
    let rootPath = path.dirname(__dirname);
    let adminControllerPath = path.join(rootPath, 'routes/admin');
    let frontControllerPath = path.join(rootPath, 'routes/front');

    let adminRoutes = express.Router();
    let frontRoutes = express.Router();

    fs.readdirSync(adminControllerPath).forEach((file) => {
        let filePath = path.join(adminControllerPath,file);
        if (/(.*)\.(js$)/.test(file)) {
            System.import(filePath);
        }
    });


    return app;
};