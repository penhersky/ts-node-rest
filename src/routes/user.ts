import { Router } from 'express';
import verifyToken from '../middleware/verifyToken';
import userIdentity from '../middleware/userIdentity';
import upload from '../middleware/Upload.middleware';
import getUser from '../controllers/user/getUser.controller';
import putUser from '../controllers/user/putUser.controller';

const router = Router();

router.get('/:login', verifyToken, getUser);
router.put('/:userId', verifyToken, userIdentity, upload.single('image'), putUser);

export default router;
