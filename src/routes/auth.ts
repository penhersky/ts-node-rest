import express, { Router } from 'express';
import auth from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/register', auth);

export default router;
