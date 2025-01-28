import { connectApi } from "./connectApi.js"
import { mostrarProductos } from "./mostrarProductos.js"

async function deleteProduct(e, id){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const status = await connectApi.deleteProduct(id)
    if (status) mostrarProductos.listProducts();
}

export const product = {
    deleteProduct
}