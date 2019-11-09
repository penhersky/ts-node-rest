import { Request, Response, NextFunction } from 'express';

class HttpException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export const NotFoundError = (req: Request, res: Response, next: NextFunction): void => {
    const error: HttpException = new HttpException(404, 'Not Found!');
    next(error);
};

export const ServerError = (error: HttpException, req: Request, res: Response, next: NextFunction): void => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
};

export const AccessControlAllowOrigin = (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, auth-token, Accept, Authorization',
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET, HEAD');
        return res.status(200).json({});
    }
    next();
};
