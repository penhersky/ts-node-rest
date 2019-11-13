import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { SECRET, isDevelopment } from '../config';

function auth(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: 'Access Denied!' });
        return;
    }

    try {
        const verified = <any>jwt.verify(String(token), String(SECRET));
        res.locals.user = {
            id: verified.id,
            email: verified.email,
            login: verified.login,
        };
        next();
    } catch (error) {
        if (isDevelopment) console.error(error);
        res.status(401).json({ error: 'Invalid Token!' });
    }
}

export default auth;
