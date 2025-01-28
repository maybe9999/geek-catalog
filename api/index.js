import connection from './db.js';


//Obtener
const getProducts = (req, res) => {
    const sql = `SELECT * FROM Products`;
    connection.query(sql, (err, data) => {
        if (err){
            res.json({"err":`${err}`, "ok":False})
        }else{
            res.json(data)
        }
    })
}

//Crear
const postProducts = async (req, res) => {
    console.log(req.body)
    const {title, price, img} = req.body
    const sql = `INSERT INTO Products (title, price, img) VALUES ('${title}', '${price}', '${img}')`;
    connection.query(sql, (err, data) => {
        if (err){
            res.json({err:`${err}`, ok:false})
        }else{
            res.json({ok:true})
        }
    })
}

//Actualizar
const putProducts = async (req, res) => {
    const {id} = req.body
    const sql = ``;
    connection.query(sql, (err, data) => {
        if (err){
            res.json({err:`${err}`, ok:false})
        }else{
            res.json({ok:true})
        }
    })
}

//Eliminar
const deleteProducts = async (req, res) => {
    const {id} = req.body
    const sql = `DELETE FROM Products WHERE id = '${id}'`;
    connection.query(sql, (err, data) => {
        if (err){
            res.json({err, ok:false})
        }else{
            res.json({ok:true})
        }
    })
}

export default {
    getProducts,
    postProducts,
    putProducts,
    deleteProducts
};
