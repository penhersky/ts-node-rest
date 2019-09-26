import express, { Router } from 'express';
import register from '../controllers/register.controller';
import auth from '../controllers/auth.controllers';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', auth);

export default router;
