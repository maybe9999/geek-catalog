import mySqlDB from "mysql2"; // Se importa el modulo para conectarse a la Base de Datos
import dotenv from "dotenv"; // Sirve para usar variables de entorno...

dotenv.config(); // Carga las variables de entorno

configBD = {
    host : process.env.HOST_DATABASE,
    user : process.env.USER_DATABASE,
    password : process.env.PASSWORD_DATABASE,
    database : process.env.NAME_DATABASE,
    port: process.env.PORT_DATABASE,
    connectTimeout: 10000,
}

//Se hace la conexión a la Base de Datos... (se logea)
const connection = await mySqlDB.createConnection(configBD);


//se llama al método connect y mediante una función anónima verificamos si la conexión se realizo correctamente
connection.connect((err) => {
    if (err) {
        console.log("Error en la conexión a la base de datos:", err.code, err);
    } else {
        console.log("Conectado con éxito a la base de datos");
    }
});

connection.on('error', (err) => {
    console.log("Error en la conexión a la base de datos:", err.code, err);

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        connection.connect();
    } else if (err.code === 'ER_USER_LIMIT_REACHED'){
        connection.end(err => {
            if (err) {
                console.error('Error al cerrar todas las conexiones:', err);
            } else {
                console.log('Todas las conexiones fueron cerradas correctamente.');
                connection.connect();
            }
        })
    } else if (err.code === 'PROTOCOL_CONNECTION_LOST'){
        console.log('Conexion perdida, recuperando...');
        setTimeout(() => connection.connect(), 1000);
    } else {
        console.log('Error, recuperando...\n El error es:,',err.code, "\ncodigo de error extendido:", err);;
        setTimeout(() => connection.connect(), 60000);
        
    }
});


export default connection;
