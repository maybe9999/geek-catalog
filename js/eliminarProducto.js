import { connectApi } from "./connectApi.js"

let products = document.querySelectorAll(".product__element__ico-delete")

async function deleteProduct(e, id){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const product = await connectApi.deleteProduct(id)
}

products.forEach( element => {
    element.addEventListener("click", (e)=>{
        deleteProduct(e, element.getAttribute('data-id'))
    })
})