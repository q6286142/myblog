// import homeController from '../routes/index';
// import users from '../routes/users';
// import error from '../routes/error';
// import admin from '../routes/admin';
import uaparser from 'ua-parser-js';
import fs from 'fs';
import path from 'path';
import desktopRouter from '../routes/desktop.route';
import adminRouter from '../routes/admin.route';
import mobileRouter from '../routes/api.route';

export default function initRoutes(app) {
    app.use('/admin',adminRouter);

    app.use(/\/(?!admin)(\w)*/ig,(req, res, next)=>{
        let ua = uaparser(req.headers['user-agent']);
        res.render('mobile',{title:"移动设备"});
    });


    return app;
};