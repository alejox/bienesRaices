import { check, validationResult } from 'express-validator'
import User from '../models/User.js';
import { idGenerator } from '../helpers/tokens.js';
import { emailRegister } from '../helpers/emails.js'

const formLogin = (req, res) => {
  res.render('auth/login', {
    page: 'Iniciar Sesión '
  })
};

const formRegister = (req, res) => {
  res.render('auth/register', {
    page: 'Crear cuenta',
    csrfToken: req.csrfToken()
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
      csrfToken: req.csrfToken(),
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


  // Almacenar un usuario
  const user = await User.create({
    name,
    email,
    password,
    token: idGenerator()
  })

  // Envia email de confirmación
  emailRegister({
    name: user.name,
    email: user.email,
    token: user.token
  })

  //Mostrar mensaje de confirmación
  res.render('templates/msg', {
    page: 'Cuenta creada correctamente',
    msg: 'Hemos enviado un email de confirmación, presiona el enlace'
  })
}

// Función que comprueba una cuenta
const confirm = async (req, res) => {
  const { token } = req.params;

  //Verificar si el token es valido
  const user = await User.findOne({ where: { token } });

  if (!user) {
    return res.render('auth/verifyAccount', {
      page: 'Error al confirmar tu cuenta',
      msg: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
      err: true
    })
  }


  //Confirmar la cuenta
  user.token = null;
  user.confirm = true;
  await user.save();

  return res.render('auth/verifyAccount', {
    page: 'Cuenta confirmada',
    msg: 'La cuenta se confirmo correctamente'
  })

}

const recoverPassword = (req, res) => {
  res.render('auth/recover-password', {
    page: 'Recupera tu acceso a bienes raices'
  })
};


export {
  formLogin,
  formRegister,
  register,
  confirm,
  recoverPassword
}
