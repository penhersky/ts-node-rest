import http from 'http';

import { port } from './config';
import app from './app';

const server: http.Server = http.createServer(app);

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
