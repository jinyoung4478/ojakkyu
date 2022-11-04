import { clientSideInclude } from '../utils/useful-functions.js';

const product = document.querySelector('.product');

async function getData() {
  try {
    const res = await fetch('./product.json');
    const data = await res.json();
    const value = data.Product;

    value.forEach((tem) => {
      product.innerHTML += `<li>
          <img src=${tem.url}>
          <p>${tem.id}</p>
          <p>${tem.productTitle}</p>
          <p>${tem.subTitle}</p>
          <p>${tem.productPrice}</p>
        </li>`;
    });
  } catch (err) {
    console.log(err);
  }
}

async function creatProduct() {
  await getData();
}

clientSideInclude();
creatProduct();
