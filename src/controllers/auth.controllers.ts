import { authorization } from './AuthService';
import { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
    const result: { error: String | undefined; status: number; token: string | undefined } = await authorization(
        req.body.email,
        req.body.password,
    );

    if (result.error) res.status(result.status).json({ error: result.error });
    res.status(result.status).json({ message: 'Authorization was successful!', token: result.token });
};
