import express from 'express';
import { formLogin, formRegister, recoverPassword } from '../controllers/user.controller.js';

const router = express.Router();

// Routing
router.get('/login', formLogin);
router.get('/register', formRegister);
router.get('/recover-password', recoverPassword);


export default router