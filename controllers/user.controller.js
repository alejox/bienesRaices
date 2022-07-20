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
  await check('name').notEmpty().withMessage('El nombre no puede ir vacio').run(req);
  await check('email').isEmail().withMessage('No es un email valido').run(req);
  await check('password').isLength({ min: 6 }).withMessage('El password debe ser de al menos 6 caracteres').run(req);
  await check('password_repeat').equals('password').withMessage('El password no coincide').run(req);

  let result = validationResult(req);

  //return res.json(result.array())
  // Verificar que el resultado este vacio
  if (!result.isEmpty()) {
    //Errores
    return res.render('auth/register', {
      page: 'Crear Cuenta',
      errors: result.array(),
      user: {
        name: req.body.nombre,
        email: req.body.email
      }
    });
  };

  // Extraer los datos
  const { name, email, password } = req.body

  // Verificar que el usuario no este duplicado

  const userExist = await User.findOne({ where: { email } });

  if (userExist) {
    return res.render('auth/register', {
      page: 'Crear Cuenta',
      errors: [{ msg: 'El usuario ya esta registrado' }],
      user: {
        name: req.body.nombre,
        email: req.body.email
      }
    });
  }
  console.log(userExist)

  return;
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
