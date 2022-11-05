import { clientSideInclude } from '../utils/useful-functions.js';
import * as Api from "../utils/api.js";

const product = document.querySelector(".product");
const moveDetail = document.getElementsByClassName("productEvent");
const DETAIL_PAGE = "/product";

async function creatProduct() {
  try {
    const res = await Api.get("/api/products");

    // const res = await fetch("/api/products");
    // const data = await res.json();

    res.forEach((tem) => {
      product.innerHTML += `<li  data-id="${tem.product_id}" class="productEvent">
          <img src=${tem.image}>
          <p>${tem.accessory_type}</p>
          <p>${tem.description}</p>
          <p>${tem.price}</p>
          <p>${tem.product_id}</p>
          <p>${tem.product_name}</p>
          <p>${tem.product_title}</p>
          <p>${tem.stone_type}</p>
        </li>`;
    });
    // <a href="${DETAIL_PAGE}"><img class="productEvent" src=${tem.image}></a>

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



window.onload = function(){
  


  Array.from(moveDetail).forEach((tem, idx) => {

      // 제품 li 하나씩 클릭하는 이벤트
    tem.addEventListener("click", async function(e){
      // e.stopPropagtion();
      // if (e.target !== e.currentTarget) return;

      //  데이터 셋 변수에 담아놓은 product_id
      // const productId = e.target.dataset.id;
      

    //  console.log(tem.dataset,idx)
      
    })
  })
  
};


// 컴포넌트 랜더링
clientSideInclude();
