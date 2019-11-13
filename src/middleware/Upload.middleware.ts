import multer from 'multer';
import { mkdirSync } from 'fs';
import { DESTINATION } from '../config';

const storage: multer.StorageEngine = multer.diskStorage({
    destination: function(req: Express.Request, file: Express.Multer.File, cb: Function): void {
        const date = Date.now();
        const dir = DESTINATION + '\\' + date;
        mkdirSync(dir);
        cb(null, `./src/upload/${date}/`);
    },
    filename: function(req: Express.Request, file: Express.Multer.File, cb: Function): void {
        cb(null, file.originalname);
    },
});

const fileFilter: any = (req: Express.Request, file: Express.Multer.File, cb: Function): void => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb(null, true);
    else cb(new Error(`Invalid image type (${file.mimetype})!`), false);
};

export default multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter,
});
