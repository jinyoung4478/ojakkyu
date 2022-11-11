import {
  renderClientSideComponent,
  addCommas,
} from '/utils/useful-functions.js';
import * as Api from '/utils/api.js';

const product = document.querySelector('.product');

start();

async function drawProduct() {
  try {
    const data = await Api.get('/api/product/newProducts');
    product.innerHTML = data
      .map((tem) => {
        const { image, description, price, productTitle, productId } = tem;

        return `
            <li class="productList">
                <h2><img src=${image} data-id="${productId}" class="productEvent"></h2>
                <dl>
                  <dt><strong>${productTitle}</strong></dt>
                  <dd><span>${description}</span></dd>
                  <dd><small>${addCommas(price)}</small></dd>
                </dl>
            </li>
          `;
      })
      .join('');
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

// 제품 리스트 그려주는 비동기 함수 && 컴포넌트 랜더링 함수
async function start() {
  await renderClientSideComponent();
  await drawProduct();
}

// 상세페이지 이동
product.addEventListener('click', (e) => {
  const pareLi = e.target.closest('.productEvent');
  location.href = `/product/${pareLi.dataset.id}`;
});
