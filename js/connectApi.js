async function getProducts(){
    try {
        const response = await fetch("http://127.0.0.1:3001/products");
        const data = await response.json();
        return data;  // Asegúrate de retornar los productos
    } catch (error) {
        console.error('Error:', error);
        return [];  // En caso de error, retornar un arreglo vacío
    }
}

async function addProduct(id, name, price, img){
    try{
        const peticion = await fetch("http://127.0.0.1:3001/products", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                name: name,
                price: price,
                img: img
            }),
            cache: "no-cache"
        });
        
        if (peticion.ok){
            const data = await peticion.json();
            return false
        } else {
            console.error("Error al agregar el producto", peticion.status);
        }
    } catch (error) {
        console.error("Error al conectar con la API", error);
    }
}

async function deleteProduct(id){
    let peticion = await fetch(`http://127.0.0.1:3001/products/${id}`,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        },
    })
    let data = peticion.json()
    return data
}

async function getLenProducts(){
    try {
        const response = await fetch("http://127.0.0.1:3001/products");
        const data = await response.json();
        return data.length;  // Asegúrate de retornar los productos
    } catch (error) {
        console.error('Error:', error);
        return [];  // En caso de error, retornar un arreglo vacío
    }
}


export const connectApi = {
    getProducts, addProduct, deleteProduct, getLenProducts
}