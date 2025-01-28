import express from 'express';  // Importamos el modulo express
import morgan from 'morgan'; // Info por consola sobre las peticiones entrantes
import path from 'path'; // Para obtener rutas de archivos
import router from './router/index.js'; // Contiene ubicación de los index y devuelve archivos


const app = express();

//CONFIGURACIÓN Y MIDDLEWARE
app.set("port", 5001)//Se configura el puerto como port=5001
app.use(morgan('dev')); //Muestra las peticiones por consola
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Middleware para manejar URL-encoded
app.use(express.static('./public')); //Sirve archivos estáticos

// Rutas para hacer consultas a la bd
app.use('/api', async (req, res) => await router.routerApi(req, res));

// Ruta para manejar el GET
app.get('/', (req, res) => router.mostrarSeccion);// Esta linea no se ejecuta xq express.static la sirve automáticamente(no se puede contabilizar trafico asi como esta ahora desde dentro del sitio)
app.get('/*', (req, res) => res.sendFile('./public/404.html'));


//Se le indica mediante .listen() que use el puerto X para escuchar o recibir peticiones, get post etc...
app.listen(app.get("port") , () => { 
    console.log(`Servidor ejecutándose en el puerto ${app.get("port")}`)
});