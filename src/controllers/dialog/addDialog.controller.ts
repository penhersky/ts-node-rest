import { Request, Response } from 'express';

import Model from '../../database/models/index';
import { isDevelopment } from '../../config';

export default async (req: Request, res: Response): Promise<void> => {
    const partner: string = req.params.userId;
    const author: string = res.locals.user.id;

    try {
        const allPartnerData = await Model.User.findOne({ where: { id: partner } });
        if (!allPartnerData) {
            res.status(400).json({
                error: 'User is not Fount!',
            });
            return;
        }

        const newDialog = await Model.Dialog.create({
            partner,
            author,
        });

        res.status(201).json({
            dialog: {
                id: newDialog.id,
                name: allPartnerData.login,
                image: allPartnerData.image,
                lastOnline: allPartnerData.last_seen,
            },
        });
    } catch (error) {
        if (isDevelopment) console.log(error);
        res.status(500).json({ error: 'Failed to create dialogue! Please try again!' });
    }
};
