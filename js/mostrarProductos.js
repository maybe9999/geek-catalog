import { connectApi } from "./connectApi.js"

const product__list = document.querySelector(".product__list");

function cardFormat(id, name, price, img){
    let card = document.createElement("li");
    card.className = "product__element";
    card.id = id.toString()

    card.innerHTML = `
    <img src="${img}" alt="Imagen de" class="product__element__imagen">
    <p class="product__element__name">${name}</p>
    <p class="product__element__price">$ ${price} <img src="./assets/icoDelete.png" alt="" class="product__element__ico-delete" data-id="${id}"></p>
    `
    return card
}

function listProducts(){
    connectApi.getProducts()
    .then((products) => {
        products.forEach(element => {
            product__list.appendChild(cardFormat(element.id, element.name, element.price, element.img))
        });
        import('./eliminarProducto.js')
    })
    .catch((error) => {
        console.error("Error al obtener los productos:", error);
    });
}



listProducts()

export const mostrarProductos = {
    listProducts
}

