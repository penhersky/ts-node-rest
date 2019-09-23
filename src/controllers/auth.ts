import { register } from './AuthService';
import { Request, Response } from 'express';

export default (req: Request, res: Response) => {
    register(req.body.login, req.body.email, req.body.password, (data: { error: String; status: number }) => {
        if (data.error) res.status(data.status).json({ error: data.error });
        res.status(201).json({ message: 'Authorization was successful!' });
    });
};
