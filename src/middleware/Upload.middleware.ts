import multer from 'multer';

const storage: multer.StorageEngine = multer.diskStorage({
    destination: function(req: Express.Request, file: Express.Multer.File, cb: Function): void {
        cb(null, '../uploads/');
    },
    filename: function(req: Express.Request, file: Express.Multer.File, cb: Function): void {
        cb(null, Date() + file.originalname);
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
