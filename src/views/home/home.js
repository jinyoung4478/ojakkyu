import { renderClientSideComponent } from '/utils/useful-functions.js';
import * as Api from "/utils/api.js";

const product = document.querySelector(".product");
const moveDetail = document.querySelector(".product");

async function drawProduct() {
  try {
    const res = await Api.get("/api/product");
    console.log(res)

    product.innerHTML = res.map((tem) => {

      const img = tem.image;
      const description = tem.description;
      const price = tem.price;
      const id = tem.productId;
      const name = tem.productName;
      const title = tem.productTitle;
      const type = tem.stoneType;

      return`
            <li data-id="${id}" class="productEvent">
                <img src=${img}>
                <p>${description}</p>
                <p>${price}</p>
                <p>${id}</p>
                <p>${name}</p>
                <p>${title}</p>
                <p>${type}</p>
            </li>
          `
    }).join("");

  } catch (err) {
    console.log(err);
  }
}

// 제품 리스트 그려주는 비동기 함수 && 컴포넌트 랜더링 함수
async function start() {
  await renderClientSideComponent();
  await drawProduct();

}

start();


// 상세페이지 이동
moveDetail.addEventListener("click", (e) => {
  const pareLi = e.target.parentElement;
  location.href = `/product/${pareLi.dataset.id}`
})



