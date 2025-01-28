import { connectApi } from "./connectApi.js"
import { product } from "./eliminarProducto.js"

const productConteiner = document.querySelector(".product");

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
    let product__list = document.querySelector(".product__list");
    let productCard = document.createElement("ul");
    productCard.className = "product__list";

    connectApi.getProducts()
    .then((newProducts) => {
        productCard.innerHTML = ""
        newProducts.forEach(element => {
            productCard.appendChild(cardFormat(element.id, element.title, element.price, element.img))
        });
        product__list.remove()
        productConteiner.appendChild(productCard)



        let products = document.querySelectorAll(".product__element__ico-delete")

        products.forEach( element => {
            element.addEventListener("click", (e)=>{
                product.deleteProduct(e, element.getAttribute('data-id'))
            })
        })
    })
    .catch((error) => {
        console.error("Error al obtener los productos:", error);
    });
}



listProducts()

export const mostrarProductos = {
    listProducts
}

