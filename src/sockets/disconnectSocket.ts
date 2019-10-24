import { Socket } from 'socket.io';
import Model from '../database/models/index';
import { isDevelopment } from '../config';

export default (socket: Socket, id: string) => {
    socket.on('disconnect', reason => {
        socket.emit('disconnectResult', { message: reason });
        Model.User.findOne({ where: { id } })
            .then(user => {
                if (user) user.update({ last_seen: Date() });
            })
            .catch(error => isDevelopment && console.log(error));
    });
};
