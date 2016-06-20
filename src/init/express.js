import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import initRoutes from './routes';
import initServer from './server';
import initDB from './data/db';

let app = express();
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

function start(dirname) {
    let viewPath = path.join(dirname, 'views');
    let pubilcPath = path.join(dirname, 'public');
    app.set('views', viewPath);
    app.use(favicon(path.join(pubilcPath, 'favicon.ico')));
    app.use(express.static(viewPath));
    initDB();
    app = initRoutes(app);
    initServer(app);
}

export {start};



