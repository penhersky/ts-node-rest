import express, { Router } from 'express';
import addDialog from '../controllers/dialog/addDialog.controller';
import deleteDelete from '../controllers/dialog/deleteDialog.controller';
import getDialog from '../controllers/dialog/getDialog.controller';
import verifyToken from '../middleware/verifyToken';

const router: Router = express.Router();

router.post('/:partnerId', verifyToken, addDialog);
router.delete('/:dialogId', verifyToken, deleteDelete);
router.get('/:dialogId', verifyToken, getDialog);

export default router;
