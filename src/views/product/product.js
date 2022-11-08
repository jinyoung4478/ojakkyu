import * as Api from "/utils/api.js";
import { renderClientSideComponent } from "/utils/useful-functions.js";


const product = document.querySelector(".product");
const categoryUrl = window.location.pathname.split('/');
const categoryType = categoryUrl[categoryUrl.length - 2];
const categoryTitle = document.querySelector(".categoryTitle");
const categoryWrap = document.querySelector(".categoryWrap");
const productAddButton = document.querySelector('#productAddButton')
const productAddButton = document.querySelector('#productAddButton')

async function drawCategoryList() {
  try {

    const res = await fetch(`/api/product/category/${categoryType}`);
    const data = await res.json();

    console.log(data)

    product.innerHTML = data.map((tem) => {
      const img = tem.image;
      const price = tem.price;
      const title = tem.productTitle;
      const name = tem.productName;
      const description = tem.description;

      return `
                    <li class="productEvent">
                        <img src=${img}>
                        <p>${description}</p>
                        <p>${price}</p>
                        <p>${name}</p>
                        <p>${title}</p>
                    </li>
            `

    }).join("")

  } catch (err) {
    console.log(err);
  }
}

async function start() {
  await renderClientSideComponent();
  await

    drawCategoryList();
}



start();
