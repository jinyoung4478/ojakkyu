import { clientSideInclude } from '../utils/useful-functions.js';
import * as Api from "../utils/api.js";

const product = document.querySelector(".product");
const moveDetail = document.getElementsByClassName("productEvent");
const DETAIL_PAGE = "/product";

async function creatProduct() {
  try {
    const res = await fetch("/api/products");
    // const res = await Api.get("/api/products");
    const data = await res.json();

    data.forEach((tem) => {
      product.innerHTML += `<li class="productEvent">
          <a href="${DETAIL_PAGE}"><img class="productEvent" src=${tem.image}></a>
          <p>${tem.accessory_type}</p>
          <p>${tem.description}</p>
          <p>${tem.price}</p>
          <p data-id="${tem.product_id}">${tem.product_id}</p>
          <p>${tem.product_name}</p>
          <p>${tem.product_title}</p>
          <p>${tem.stone_type}</p>
        </li>`;
    });

    // <img src=${tem.image}>
    saveProduct(data)
  } catch (err) {
    console.log(err);
  }
}

function saveProduct(productData){
  localStorage.setItem("product", JSON.stringify(productData));
  // console.log(productData)
}

async function startProduct() {
  await creatProduct();
}

startProduct();



window.onload = function(){

  Array.from(moveDetail).forEach((tem, idx) => {
    tem.addEventListener("click", function(e){
      // Api.get(`/api/products:${e.target.dataset.id}`)
      const productId = Api.get(`/product/:productId=${e.target.dataset.id}`)
      console.log("success",productId)
    })
  })
  
};

// 컴포넌트 랜더링
clientSideInclude();

