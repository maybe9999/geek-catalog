import express from 'express';
import path from 'path';
import controller from '../api/index.js'; // Para hacer consultas a la bd

const routerApi = express.Router(); // Crea un nuevo router de Express

const __dirname = import.meta.dirname;

const routesPublic = {// Resuelve la ruta absoluta hacia los archivos
    "" : path.resolve(__dirname, '../public/index.html'), //home
};

//Rutas obtener
routerApi.get('/', async (req, res) => await controller.getProducts(req,res));

//Rutas Crear
routerApi.post('/new', async (req, res) => await controller.postProducts(req,res));

// Rutas Borrar
routerApi.delete('/delete', async (req, res) => await controller.deleteProducts(req,res));

// Rutas actualizar
routerApi.put('/update', async (req, res) => await controller.putProducts(req,res));


//Devuelve el archivo index.html de la sección correspondiente en base a la solicitud.
function mostrarSeccion(req, res) {
    let endPointActual = req.path.replace(/(\/)/gm,""); 
    res.sendFile(routesPublic[endPointActual]); //Modificado para el Login
}

export default { routerApi, mostrarSeccion };



