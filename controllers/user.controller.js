import { check, validationResult } from 'express-validator'
import User from '../models/User.js'

const formLogin = (req, res) => {
  res.render('auth/login', {
    page: 'Iniciar Sesión '
  })
};

const formRegister = (req, res) => {
  res.render('auth/register', {
    page: 'Crear cuenta'
  })
};

const register = async (req, res) => {
  //Validación
  await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req);
  await check('email').isEmail().withMessage('No es un email valido').run(req);
  await check('password').isLength({ min: 6 }).withMessage('El password debe ser de al menos 6 caracteres').run(req);
  await check('password_repeat').equals('password').withMessage('El password no coincide').run(req);

  let result = validationResult(req);

  // Verificar que el resultado este vacio
  if(!result.isEmpty()){
    //Errores
    return res.render('auth/register', {
      page:'Crear Cuenta'
    });
  }

  res.json(result.array());

  const user = await User.create(req.body);
  res.json(user)
}

const recoverPassword = (req, res) => {
  res.render('auth/recover-password', {
    page: 'Recupera tu acceso a bienes raices'
  })
};


export {
  formLogin,
  formRegister,
  recoverPassword,
  register
}