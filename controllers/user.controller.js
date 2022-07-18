const formLogin = (req, res) => {
  res.render('auth/login', {

  })
};

const formRegister = (req, res) => {
  res.render('auth/register', {
    page:'Crear cuenta'
  })
};


export{
  formLogin,
  formRegister
}