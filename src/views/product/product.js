import * as Api from '/utils/api.js';
import { renderClientSideComponent } from '/utils/useful-functions.js';

const productWrapper = document.querySelector('#productWrapper');
const pagelist = document.querySelector('#pagelist');
const categoryUrl = window.location.pathname.split('/');
const categoryType = categoryUrl[categoryUrl.findIndex(a => a == "category") + 1];
console.log(categoryType)
const pageUrl = window.location.search
console.log("pageUrl", pageUrl)
const page = Number(pageUrl.split("?page=")[1] || 1);
console.log("url", pageUrl.split("?page="))
// 페이지 렌더링
renderElements();
// 이벤트 바인딩
addAllEvents();

function renderElements() {
  renderClientSideComponent();
  drawCategoryProducts(page);
}

async function drawCategoryProducts(page) {
  try {
    const data = await Api.get(`/api/product/category/${categoryType}`);
    const categoryTitle = document.querySelector(".categoryTitle h1");


    if(categoryType === "bracelet") categoryTitle.innerText = "팔찌";
    if(categoryType === "ring") categoryTitle.innerText = "반지";
    if(categoryType === "necklace") categoryTitle.innerText = "목걸이";


    const { totalPage, products } = await Api.get(`/api/product/category/${categoryType}?page=${page}`);
    productWrapper.innerHTML = products.reduce(
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

    for (let i = 1; i <= totalPage; i++) {
      if (i == page) {
        pagelist.innerHTML +=
          `<a href="/product/category/${categoryType}?page=${i}" style="font-weight:bold">${i}</a>`
      } else {
        pagelist.innerHTML +=
          `<a href="/product/category/${categoryType}?page=${i}">${i}</a>`
      }

    }

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

