import express from 'express';
import Load from '../middlewares/controller/load';

module.exports = (app) => {
    let load = new Load(app, { cwd: __dirname });
    return load
        .setFolderDirectory('./api')
        .use('user')
        .use('article')
        .getApp();
}
