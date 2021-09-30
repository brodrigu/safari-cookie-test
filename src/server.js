import Hapi from '@hapi/hapi';
import Path from 'path';
import routes from './routes';

const isDev = process.env.NODE_ENV === 'development';
const debug = isDev ? { request: ['*'], log: ['*'] } : { request: ['implementation'] };

// Create a server with a host and port
const server = new Hapi.Server({
    port: 8080,
    routes: {
        cors: true,
        files: {
            relativeTo: Path.join(__dirname, '../', 'public'),
        },
    },
    debug,
});
server.route(routes);

// set myads cookie settings
server.state('myads', {});

export default server;
