async function getProducts(){
    try {
        const response = await fetch("/api/");
        const data = await response.json();
        return data;  // Asegúrate de retornar los productos
    } catch (error) {
        console.error('Error:', error);
        return [];  // En caso de error, retornar un arreglo vacío
    }
}

async function addProduct(title, price, img){
    try{
        const peticion = await fetch("/api/new", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title,
                price,
                img
            }),
            cache: "no-cache"
        });
        const data = await peticion.json();
        if (data.ok && peticion.ok){
            console.log("Producto agregado con éxito")
            return true;
        } else {
            console.error("Error al agregar el producto", peticion.status, data.err);
            return false;
        }
    } catch (error) {
        console.error("Error al conectar con la API", error);
        return false;
    }
}

async function deleteProduct(id) {
    try{
        const peticion = await fetch(`/api/delete/`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id
            }),
            cache: "no-cache"
        });

        const data = await peticion.json();
        if (data.ok && peticion.ok){
            console.log("Producto eliminado con éxito")
            return true;
        } else {
            console.error("Error al eliminar el producto", peticion.status, data.err);
            return false;
        }
    } catch (error) {
        console.error("Error al conectar con la API", error);
        return false;
    }
}


export const connectApi = {
    getProducts, addProduct, deleteProduct
}