import { Request, Response } from 'express';
import Model from '../../database/models/index';
import { isDevelopment } from '../../config';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const login = req.params.login;
        const user = await Model.User.findOne({ where: { login } });
        if (user === null) {
            res.status(404).json({ error: 'User is not found!' });
            return;
        }
        res.status(200).json({
            id: user.id,
            login: user.login,
            email: user.email,
            image: user.image,
            last_online: user.last_seen,
            createAt: user.createdAt,
        });
    } catch (error) {
        if (isDevelopment) console.log(error);
        res.status(500).json({ error: 'Failed to create dialogue! Please try again!' });
    }
};
