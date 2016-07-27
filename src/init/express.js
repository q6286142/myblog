import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import serverConfig from '../config/server.config';
import initServer from './server';
import initDB from '../data/db';

let startRoot = '';

export default function start(dirname) {
    startRoot = dirname;
    initDB(() => {
        initApp('front', [setUniversalInfo, setViewInfo]);
        initApp('admin', [setUniversalInfo, setViewInfo]);
        initApp('api', [setUniversalInfo]);
    });
}

function initApp(appName, setMotheds) {
    let app = express();
    app.locals.title = 'MyBlogApp:' + appName;
    setMotheds.forEach((mothed) => {
        mothed(app);
    });
    initServer(app, serverConfig[appName]);
    require('../routes/' + appName + '.route.js')(app);
}

function setUniversalInfo(app) {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    let pubilcPath = path.join(startRoot, 'public');
    app.use(favicon(path.join(pubilcPath, '/common/favicon.ico')));
}

function setViewInfo(app) {
    app.set('view engine', 'jade');
    let viewPath = path.join(startRoot, 'views');
    app.set('views', viewPath);
    app.use(express.static(viewPath));
}


