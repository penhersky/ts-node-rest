import { Request, Response } from 'express';
import Model from '../../database/models/index';
import { isDevelopment } from '../../config';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.userId;
        const user = await Model.User.findByPk(id);
        if (user === null) {
            res.status(404).json({ error: 'User is not found!' });
            return;
        }
        await Model.Dialog.destroy({ where: { author: id } });
        await Model.Message.destroy({ where: { author: id } });
        await user.destroy();
        res.status(201).json({ message: 'User deleted!' });
    } catch (error) {
        if (isDevelopment) console.log(error);
        res.status(500).json({ error: 'Failed to delete User! Please try again!' });
    }
};
