import { Server } from 'http';
import ioServer from 'socket.io';

export default (server: Server) => {
    const io = ioServer(server, {
        path: '/dialog',
        serveClient: false,
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false,
    });
    return io;
};
