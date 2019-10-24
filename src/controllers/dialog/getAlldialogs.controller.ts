import { Request, Response } from 'express';

import Model from '../../database/models/index';
import { isDevelopment } from '../../config';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        /*
            temporary means for writing to the client!!!!!!!
        */

        //const userId = res.locals.user.id;
        //const dialogs = await Model.Dialog.findAll({ where: { author: userId } });
        res.status(200).json({
            count: 3 /*dialogs.length*/,
            dialogs: [
                {
                    id: 23,
                    image:
                        'https://cheesecake.articleassets.meaww.com/28740/uploads/d5d3d849-c418-4cdc-bcd9-2819fa26093d_800_420.jpeg',
                    lastOnline: '',
                    login: 'Alex228',
                },
                {
                    id: 3,
                    image:
                        'https://regnum.ru/uploads/pictures/news/2019/06/21/regnum_picture_15611274141218582_normal.jpg',
                    lastOnline: '12:11',
                    login: 'Tom',
                },
                {
                    id: 2334,
                    image: 'https://www.film.ru/sites/default/files/people/1455534-923219.jpg',
                    lastOnline: '21:01',
                    login: 'Scarlet',
                },
            ],
        });
    } catch (error) {
        if (isDevelopment) console.log(error);
        res.status(500).json({ error: 'Server error!' });
    }
};

// dialogs.map(async dialog => {
//     const partner = await Model.User.findOne({ where: { id: dialog.partner } });
//     if (!partner) return;
//     return {
//         id: dialog.id,
//         partner: {
//             login: partner.login,
//             image: partner.image,
//             lastOnline: partner.last_seen,
//         },
//         createAt: dialog.createdAt,
//     };
