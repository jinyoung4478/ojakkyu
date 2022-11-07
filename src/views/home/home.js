import { renderClientSideComponent } from '../utils/useful-functions.js';
import * as Api from "../utils/api.js";

const product = document.querySelector(".product");
const moveDetail = document.querySelectorAll(".newArrival .productWrap .product")[0].children;

async function drawProduct() {
  try {
    const res = await Api.get("/api/product");
    
    res.forEach((tem) => {
      const img = tem.image;
      const description = tem.description;
      const price = tem.price;
      const id = tem.productId;
      const name = tem.productName;
      const title = tem.productTitle;
      const type = tem.stoneType;


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

    // 로컬스토리지에 제품 저장
    // saveProduct(res)

  } catch (err) {
    console.log(err);
  }
}


// 로컬스토리지에 제품 저장 함수
function saveProduct(productData){
  localStorage.setItem("product", JSON.stringify(productData));
}

// 제품 리스트 그려주는 비동기 함수
async function start() {
  await drawProduct();
}

start();

// 페이지 랜딩시 그려진 제품 리스트마다 이벤트 핸들러 등록
window.onload = function(){
  Array.from(moveDetail).forEach((tem, idx) => {
    tem.addEventListener("click", function(e){
      let temLength = tem.children.length;
      let temChildren = tem.children
      for(let i = 0; i < temLength; i++){
        temChildren[i].addEventListener('click', (a) => a.stopPropagation());
      }
      location.href = `/product/${tem.dataset.id}`
    
    })
  })
};

// 컴포넌트 렌더링
renderClientSideComponent();