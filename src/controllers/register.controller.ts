import { register } from './auth/AuthService';
import { Request, Response } from 'express';
import { isDevelopment } from '../config';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const result: { error: String | undefined; status: number } = await register(
            req.body.login,
            req.body.email,
            req.body.password,
        );

        if (result.error) {
            res.status(result.status).json({ error: result.error });
            return;
        }
        res.status(result.status).json({ message: 'Authorization was successful!' });
    } catch (error) {
        if (isDevelopment) console.log(error);
        res.status(500).json({ error: 'Server Error!' });
    }
};
