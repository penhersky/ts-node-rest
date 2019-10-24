import { Socket, Server } from 'socket.io';
import Model from '../database/models/index';
import { isDevelopment } from '../config';

export default (io: Server, socket: Socket, id: string) => {
    socket.on('message', ({ dialog, text }) => {
        Model.Dialog.findOne({ where: { id: dialog } })
            .then(Dialog => {
                if (Dialog === null) {
                    socket.emit('messageSent', { error: 'Dialog is not fount!' });
                } else {
                    Model.Message.create({
                        dialog: Dialog.id,
                        partner: Dialog.partner,
                        author: id,
                        text,
                        file: '',
                    })
                        .then(({ id, text, dialog, file, author, createdAt }) => {
                            io.sockets.in(Dialog.partner).emit('message', {
                                id,
                                text,
                                dialog,
                                file,
                                author,
                                createdAt,
                            });
                            socket.emit('connectionSent', {
                                message: {
                                    id,
                                    text,
                                    dialog,
                                    file,
                                    createdAt,
                                },
                            });
                        })
                        .catch(error => {
                            if (isDevelopment) console.log(error);
                            socket.emit('connectionSent', { error: 'Server Error!' });
                        });
                }
            })
            .catch(error => {
                if (isDevelopment) console.log(error);
                socket.emit('connectionSent', { error: 'Server Error!' });
            });
    });
};
