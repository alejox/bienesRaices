const formLogin = (req, res) => {
  res.render('auth/login', {
    page:'Iniciar Sesión '
  })
};

const formRegister = (req, res) => {
  res.render('auth/register', {
    page:'Crear cuenta'
  })
};

const recoverPassword = (req, res) => {
  res.render('auth/recover-password', {
    page:'Recupera tu acceso a bienes raices'
  })
};


export{
  formLogin,
  formRegister,
  recoverPassword
}