import { Request, Response } from 'express';

import Model from '../../database/models/index';
import { isDevelopment } from '../../config';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = res.locals.user.id;
        const dialogs = await Model.Dialog.findAll({ where: { author: userId } });
        const newDialogs = dialogs.map(async dialog => {
            const partner = await Model.User.findOne({ where: { id: dialog.partner } });
            if (!partner) return;
            return {
                id: dialog.id,
                login: partner.login,
                image: partner.image,
                lastOnline: partner.last_seen,
                createAt: dialog.createdAt,
            };
        });
        res.status(200).json({
            count: dialogs.length,
            dialogs: await Promise.all(newDialogs),
        });
    } catch (error) {
        if (isDevelopment) console.log(error);
        res.status(500).json({ error: 'Server error!' });
    }
};
