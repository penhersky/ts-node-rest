import { Request, Response } from 'express';

import Model from '../../database/models/index';
import { isDevelopment } from '../../config';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const dialog: string = req.params.dialogId;
        await Model.Dialog.destroy({ where: { id: dialog } });
        await Model.Message.destroy({ where: { dialog } });
        res.status(201);
    } catch (error) {
        if (isDevelopment) console.log(error);
        res.status(500).json({ error: 'Failed to delete dialogue! Please try again!' });
    }
};
