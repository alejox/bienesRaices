import express from "express";
import userRoutes from './routes/user.routes.js';
import db from "./config/db.js";

// Crear la app
const app = express();

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }))

//Conexion a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log('Conexión correcta a la base de datos');
} catch (error) {

}

// Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views');

//Carpeta Pública
app.use(express.static('public'))

// Routing
app.use('/auth', userRoutes);

// Definir un puerto y arrancar el proyecto
const port = 3000;

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
})
