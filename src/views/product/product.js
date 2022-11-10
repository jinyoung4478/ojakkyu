import * as Api from '/utils/api.js';
import { renderClientSideComponent } from '/utils/useful-functions.js';

const productWrapper = document.querySelector('#productWrapper');
const categoryUrl = window.location.pathname.split('/');
const categoryType = categoryUrl[categoryUrl.length - 2];

// 페이지 렌더링
renderElements();
// 이벤트 바인딩
addAllEvents();

function renderElements() {
  renderClientSideComponent();
  drawCategoryProducts();
}

async function drawCategoryProducts() {
  try {
    const data = await Api.get(`/api/product/category/${categoryType}`);
    const categoryTitle = document.querySelector(".categoryTitle h1");


    if(categoryType === "bracelet") categoryTitle.innerText = "팔찌";
    if(categoryType === "ring") categoryTitle.innerText = "반지";
    if(categoryType === "necklace") categoryTitle.innerText = "목걸이";


    productWrapper.innerHTML = data.reduce(
      (acc, item) =>
        acc +
        `
        <li class="productEvent" data-id="${item.productId}">
            <img src=${item.image}>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <p>${item.productName}</p>
            <p>${item.productTitle}</p>
        </li>
        `,
      '',
    );
  } catch (err) {
    alert(`Error: ${err}`);
    location.href = '/';
  }
}

function addAllEvents() {
  productWrapper.addEventListener('click', (e) => {
    const pareLi = e.target.closest('.productEvent');
    if (pareLi) {
      location.href = `/product/${pareLi.dataset.id}`;
    }
  });
}
