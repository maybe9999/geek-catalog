import { connectApi } from "./connectApi.js"

let nombreAddProduct = document.querySelector("[data-name]")
let priceAddProduct = document.querySelector("[data-price]")
let imageAddProduct = document.querySelector("[data-img]")

let form = document.querySelector("[data-form]");
let buttonFormClear = document.querySelector(".add-product__clear")

async function createNewProduct(e){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const lenProducts = await connectApi.getLenProducts()
    const name = nombreAddProduct.value;
    const price = priceAddProduct.value;
    const img = imageAddProduct.value;

    await connectApi.addProduct(lenProducts, name, price, img);

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

