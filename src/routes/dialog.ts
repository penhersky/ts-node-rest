import express, { Router } from 'express';
import addDialog from '../controllers/dialog/addDialog.controller';
import deleteDelete from '../controllers/dialog/deleteDialog.controller';
import getDialog from '../controllers/dialog/getDialog.controller';
import allDialog from '../controllers/dialog/getAlldialogs.controller';
import verifyToken from '../middleware/verifyToken';

const router: Router = express.Router();

router.post('/dialog/:partnerId', verifyToken, addDialog);
router.delete('/dialog/:dialogId', verifyToken, deleteDelete);
router.get('/dialog/:dialogId', verifyToken, getDialog);
router.get('/', verifyToken, allDialog);

export default router;
