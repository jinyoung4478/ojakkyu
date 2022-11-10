import * as Api from '/utils/api.js';
import { renderClientSideComponent } from '/utils/useful-functions.js';

const product = document.querySelector('.product');
const categoryUrl = window.location.pathname.split('/');
const categoryType = categoryUrl[categoryUrl.length - 2];

start();

function start() {
  renderClientSideComponent();
  drawCategoryList();
}

async function drawCategoryList() {
  try {
    const res = await fetch(`/api/product/category/${categoryType}`);
    const data = await res.json();

    product.innerHTML = data
      .map((tem) => {
        const img = tem.image;
        const price = tem.price;
        const title = tem.productTitle;
        const name = tem.productName;
        const description = tem.description;
        const productId = tem.productId;

        return `
              <li class="productEvent" data-id="${productId}">
                  <img src=${img}>
                  <p>${description}</p>
                  <p>${price}</p>
                  <p>${name}</p>
                  <p>${title}</p>
              </li>
            `;
      })
      .join('');
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

product.addEventListener('click', (e) => {
  const pareLi = e.target.closest('.productEvent');
  location.href = `/product/${pareLi.dataset.id}`;
});
