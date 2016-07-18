//import app from './express';
import {normalizePort} from '../util/normalize';
import Debug from 'debug';
import http from 'http';

export default function initServer(app) {
    let debug = Debug('BlogApp:server');
    let port = normalizePort(process.env.PORT || '3000');
    let server = http.createServer(app);

    server.listen(port, 'localhost');

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

