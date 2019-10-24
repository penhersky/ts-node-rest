import { Socket, Server } from 'socket.io';
import Model from '../database/models/index';
import { isDevelopment } from '../config';

export default (io: Server, socket: Socket, cb: Function) => {
    return socket.on('join', data => {
        const id = <string>data.id;
        Model.User.findOne({ where: { id } })
            .then(user => {
                if (user) {
                    socket.join(data.id);
                    io.sockets.in(user.id.toString()).emit('connectionResult', {
                        message: 'You have successfully connected!',
                    });
                    user.update({ last_seen: '' });
                } else {
                    socket.emit('connectionResult', { error: 'The entrance is closed!' });
                }
            })
            .catch(error => {
                if (isDevelopment) console.log(error);
                socket.emit('connectionResult', { error: 'Server Error!' });
            });
        return cb(id);
    });
};
