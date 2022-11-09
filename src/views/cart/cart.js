import * as Api from '/utils/api.js';
import {
  addCommas,
  renderClientSideComponent,
  checkLogin,
} from '/utils/useful-functions.js';



renderClientSideComponent();

const productList = document.querySelector('.listItems');
const cartWrap = document.querySelector(".cartWrap");
const countDelete = document.querySelector(".countDelete");
const totalPriceOrder = document.querySelector(".totalPriceOrder");

const countProduct = document.getElementById('countAllItem');
const PRICCE_TOTAL = document.getElementById('priceTotal');
const BTN_PERCHASE = document.getElementById('btnPurchase');
const BTN_MOVO_ITEMLIST = document.getElementById('btnMoveToItemList');


console.log(productList)

// function ddd(data){
//   const productkeys = Object.keys(data);
// const productk = [];
  
//   productkeys.forEach((el) => {
//     productk.push(JSON.parse(localStorage.getItem(el)));
//   });
//   console.log(productk)

//   return productk;
// }



async function drawProduct() {
  const data = JSON.parse(sessionStorage.getItem('cart'));

  productList.innerHTML = "";

  try {

    countDelete.innerHTML = `
      <p class="productCount">
        총&nbsp;
        <span id="countAllItem">3</span>
        개
      </p>
      <p>
        <button id="btnAllRemove" class="deleteBtn">
          전체삭제
        </button>
      </p>
    `

    totalPriceOrder.innerHTML = `
      <div class="priceWrap">
        <div>
          <h3 class="productCount">
            총액:&nbsp;<span id="priceTotal" class="priceText"
              >19,000</span
            >&nbsp;원
          </h3>
          <p class="subtitle is-7"></p>
        </div>
        <a href="/order">
          <button id="btnPurchase" class="orderBtn">
            주문하기
          </button>
        </a>
      </div>
    
    `

    const insertList = data.map((tem) => {
      const { image, price, description, productId, productTitle } = data;

      return `

        <form class="cartForm">
          <div class="cartInfo">
            <figure class="innerImg">
              <img
                id="itemPreview"
                src=${image}
                class="mr-2"
              />
            </figure>
            <div class="subWrap">
                <h3 class="subTitle">
                  ${productTitle}
                </h3>
                <p class="subText">
                  ${description}
                </p>
                <p class="totalPrice">
                  <span id="pricePerItem">${price}</span>&nbsp;원
                </p>
              </div>
            </div>

            <div class="priceInput">
              <input type="hidden" value="${productId}">
              <input
                id="countItem"
                value="${productId}"
                class="countItem input is-3 column mr-4 "
                type="number"
                placeholder="0"
              />
              <button id="btnDeleteItem" class="delete column"></button>
            </div>
          </div>
        </form>
        
        `
    })

    productList.innerHTML = insertList.join("");

  } catch(err){
    console.log(err)
  }
}

drawProduct()

