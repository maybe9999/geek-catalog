// /api/products.js
const fs = require('fs');
const path = require('path');

// Ruta del archivo db.json
const dbPath = path.join(__dirname, '../db.json');

// Función para leer el archivo db.json
const readDb = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

// Función para guardar los cambios en db.json
const saveDb = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Función que maneja las peticiones API
module.exports = async (req, res) => {
    const method = req.method;
    let data = readDb();
    const products = data.products;

    // GET: Obtener todos los productos
    if (method === 'GET') {
        res.status(200).json(products);
    }
    
    // POST: Agregar un nuevo producto
    else if (method === 'POST') {
        const newProduct = req.body;
        
        // Agregar el nuevo producto al arreglo
        products.push(newProduct);

        // Guardar los cambios en db.json
        saveDb({ products });

        res.status(201).json(newProduct);  // Retorna el nuevo producto agregado
    }

    // DELETE: Eliminar un producto por id
    else if (method === 'DELETE') {
        const { id } = req.query;
        
        // Encontrar el índice del producto con el id proporcionado
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex !== -1) {
            // Eliminar el producto
            const removedProduct = products.splice(productIndex, 1);

            // Guardar los cambios en db.json
            saveDb({ products });

            res.status(200).json(removedProduct);  // Retorna el producto eliminado
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }

    // Método no permitido
    else {
        res.status(405).json({ message: 'Método no permitido' });
    }
};
