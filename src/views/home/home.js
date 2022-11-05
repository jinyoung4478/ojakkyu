import { clientSideInclude } from '../utils/useful-functions.js';
import * as Api from "../utils/api.js";

const product = document.querySelector(".product");
const moveDetail = document.getElementsByClassName("productEvent");
const DETAIL_PAGE = "/product";

async function creatProduct() {
  try {
    const res = await Api.get("/api/products");
    console.log(res)
    // const res = await fetch("/api/products");
    // const data = await res.json();
    res.forEach((tem) => {
      const img = tem.image;
      const description = tem.description;
      const price = tem.price;
      const id = tem.product_id;
      const name = tem.product_name;
      const title = tem.product_title;
      const type = tem.stone_type;
      // insertAdjacentHTML


      product.innerHTML += `
      <li data-id="${id}" class="productEvent">
          <img src=${img}>
          <p>${description}</p>
          <p>${price}</p>
          <p>${id}</p>
          <p>${name}</p>
          <p>${title}</p>
          <p>${type}</p>
        </li>`;
    });


    // saveProduct(res)
  } catch (err) {
    console.log(err);
  }
}

function saveProduct(productData){
  localStorage.setItem("product", JSON.stringify(productData));
}

async function startProduct() {
  await creatProduct();
}

startProduct();




const url = new URL(location.href)
console.log(url)




window.onload = function(){
  

  Array.from(moveDetail).forEach((tem, idx) => {

    tem.addEventListener("click", async function(e){
      if (e.target !== e.currentTarget) return;
     

      location.href = `/product/${e.target.dataset.id}`
    
    })
  })
  
};


// 컴포넌트 랜더링
clientSideInclude();
