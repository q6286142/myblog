//import app from './express';
import {normalizePort} from '../util/normalize';
import Debug from 'debug';
import http from 'http';
import _ from 'lodash';

let defaultOption = {
    port:'3000',
    host:'localhst'
}

export default function initServer(app,option) {
    option = _.defaults(option,defaultOption);
    let debug = Debug(app.locals.title);
    let port = normalizePort(process.env.PORT || option.port);
    let server = http.createServer(app);

    server.listen(port, option.host);

    server.on('listening', () => {
        let addr = server.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    });

    server.on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
}

