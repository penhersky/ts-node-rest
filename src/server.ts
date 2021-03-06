import http from 'http';

import { port, isDevelopment } from './config';
import app from './app';
import sequelize from './database/connectDB';
import { includeIo, listen } from './sockets';

const server: http.Server = http.createServer(app);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connect to MySQL');
    })
    .catch(error => {
        if (isDevelopment) console.log(error);
        console.log('Unable to connect to the database');
    });

//socket

listen(includeIo(server));

server.listen(port, () => console.log(`🚀 Server ready at http://localhost:${port}  Pid: ${process.pid}   `));
process.on('SIGINT', () => {
    server.close(() => {
        process.exit(0);
    });
});
process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    });
});
process.on('SIGUSR2', () => {
    server.close(() => {
        process.exit(1);
    });
});
