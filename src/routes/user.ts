import { Router } from 'express';
import verifyToken from '../middleware/verifyToken';
import getUser from '../controllers/user/getUser.controller';

const router = Router();

router.get('/:login', verifyToken, getUser);

export default router;
