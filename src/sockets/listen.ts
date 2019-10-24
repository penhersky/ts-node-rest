import { Server } from 'socket.io';
import connectionSocket from './connectionSocket';
import disconnectSocket from './disconnectSocket';
import notificationMessages from './notificationMessages';

export default (io: Server) => {
    io.sockets.on('connection', socket => {
        connectionSocket(io, socket, (id: string) => {
            notificationMessages(io, socket, id);
            disconnectSocket(socket, id);
        });
    });
};
