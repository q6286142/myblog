// import homeController from '../routes/index';
// import users from '../routes/users';
// import error from '../routes/error';
// import admin from '../routes/admin';
import fs from 'fs';
import path from 'path';
import mainRoute from '../routes/main.route';
import adminRoute from '../routes/admin.route';
import apiRoute from '../routes/api.route';

export default function initRoutes(app) {
    app.use('/admin', adminRoute); 
    app.use(apiRoute);
    app.use(mainRoute);
    return app;
};