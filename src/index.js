
import '@babel/polyfill/noConflict';
import inert from '@hapi/inert';
import server from './server';

(async () => {
    await server.register(inert);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
})();


process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

process.once('SIGINT', () => {
    console.log('SIGINT received...');
    process.exit(1);
});


process.once('SIGTERM', () => {
    console.log('SIGTERM received...');
    process.exit(1);
});
