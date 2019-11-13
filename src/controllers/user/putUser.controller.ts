import { Request, Response } from 'express';
import rimraf from 'rimraf';
import Model from '../../database/models/index';
import { isDevelopment, USER_IMAGE } from '../../config';
import updateUserValidation from './updateUserValidation';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.userId;
        const login = req.body.login;
        const email = req.body.email;
        const image = req.file.path;

        const user = await Model.User.findByPk(id);
        if (user === null) {
            res.status(404).json({
                error: 'User is not found!',
            });
            return;
        }
        const validationError = await updateUserValidation({
            login,
            email,
            image,
        });
        if (validationError) {
            res.status(400).json({ error: validationError });
            return;
        }

        if (user.image !== USER_IMAGE) {
            rimraf.sync('../../upload' + user.image);
        }

        user.update({
            login,
            email,
            image,
        });
    } catch (error) {
        if (isDevelopment) console.log(error);
        res.status(500).json({ error: 'Failed to change user account! Please try again!' });
    }
};
