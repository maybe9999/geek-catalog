import { connectApi } from "./connectApi.js"
import { mostrarProductos } from "./mostrarProductos.js"

let nombreAddProduct = document.querySelector("[data-name]")
let priceAddProduct = document.querySelector("[data-price]")
let imageAddProduct = document.querySelector("[data-img]")

let form = document.querySelector("[data-form]");
let buttonFormClear = document.querySelector(".add-product__clear")

async function createNewProduct(e){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const title = nombreAddProduct.value;
    const price = priceAddProduct.value;
    const img = imageAddProduct.value;

    const status = await connectApi.addProduct(title, price, img);

    if (status) mostrarProductos.listProducts();
    return false
}

function clearForm(e){
    e.preventDefault();

    nombreAddProduct.value = "";
    priceAddProduct.value = "";
    imageAddProduct.value = "";
}

buttonFormClear.addEventListener("click", (e) => clearForm(e))
form.addEventListener("submit", (e) => createNewProduct(e))

