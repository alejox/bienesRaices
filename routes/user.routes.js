import express from 'express';
import { formLogin, formRegister, register, confirm, recoverPassword } from '../controllers/user.controller.js';

const router = express.Router();

// Routing
router.get('/login', formLogin);

router.get('/register', formRegister);

router.post('/register', register);

router.get('/confirm/:token', confirm)

router.get('/recover-password', recoverPassword);


export default router