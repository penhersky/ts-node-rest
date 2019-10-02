import express, { Router } from 'express';
import addDialog from '../controllers/dialog/addDialog.controller';
import deleteDelete from '../controllers/dialog/deleteDialog.controller';
import verifyToken from '../middleware/verifyToken';

const router: Router = express.Router();

router.post('/create/:partnerId', verifyToken, addDialog);
router.post('/delete/:dialogId', verifyToken, deleteDelete);

export default router;
