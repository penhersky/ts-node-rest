import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
    if (req.params.userId === res.locals.user.id) {
        next();
    } else {
        res.status(401).json({
            error: 'You do not own this account!',
        });
        return;
    }
};
