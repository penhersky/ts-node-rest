import { Request, Response } from 'express';

import messageModel, { Message } from '../../database/models/message';
import { isDevelopment } from '../../config';

export default async (req: Request, res: Response): Promise<void> => {
    const dialog = req.params.dialogId;
    try {
        const messages: Message[] = await messageModel.findAll({ where: { dialog } });
        res.status(200).json({
            count: messages.length,
            messages: messages.map(message => {
                return {
                    id: message.id,
                    text: message.text,
                    file: message.file,
                    createAt: message.createdAt,
                    author: message.author,
                };
            }),
        });
    } catch (error) {
        if (isDevelopment) console.log(error);
        res.status(500).json({ error: 'Server error!' });
    }
};
