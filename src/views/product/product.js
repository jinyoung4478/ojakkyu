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

function addAllEvents() {
  productWrapper.addEventListener('click', (e) => {
    const pareLi = e.target.closest('.productEvent');
    if (pareLi) {
      location.href = `/product/${pareLi.dataset.id}`;
    }
  });
}

async function drawCategoryProducts() {
  try {
    const data = await Api.get(`/api/product/category/${categoryType}`);

    productWrapper.innerHTML = data.reduce(
      (acc, item) =>
        acc +
        `
        <li class="productEvent" data-id="${item.productId}">
            <img src=${item.image}>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <p>${item.name}</p>
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
