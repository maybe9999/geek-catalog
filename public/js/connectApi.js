async function getProducts(retries = 3, delay = 1000) {
    try {
        const response = await fetch("/api/");
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        if (data.ok){
            console.log(data.err);
            throw new Error('Error en la respuesta de la API');
        }
        return data;  // Asegúrate de retornar los productos
    } catch (error) {
        console.error('Error:', error);
        
        if (retries > 0) {
            console.log(`Reintentando... Intento restante: ${retries}`);
            // Espera el tiempo definido antes de reintentar
            await new Promise(res => setTimeout(res, delay));
            return getProducts(retries - 1, delay); // Reintenta la solicitud
        } else {
            console.log("Recargue la página o intente más tarde.");
            return [];  // Retorna un arreglo vacío si se agotaron los intentos
        }
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