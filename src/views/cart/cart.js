import * as Api from '../utils/api.js';
import { addCommas, clientSideInclude } from '../utils/useful-functions.js';
clientSideInclude();

console.log('Hello Cart!');

const COUNT_PRODUCT = document.getElementById('countAllItem');
const PRICCE_TOTAL = document.getElementById('priceTotal');
const BTN_PERCHASE = document.getElementById('btnPurchase');
const BTN_MOVO_ITEMLIST = document.getElementById('btnMoveToItemList');
const PRODUCT = document.querySelector('#listItems');

async function getData() {
  try {
    const res = await fetch('../home/product.json');
    const data = await res.json();
    const value = data.Product;

    value.forEach((tem) => {
      PRODUCT.innerHTML += `
      <div id="purchasing ">
      <form
      class="box block columns is-flex is-align-items-center is-justify-content-space-between"
      >
      <div class="is-flex is-align-items-center">
      <figure class="image is-128x128 is-flex mr-2">
      <img
      id="itemPreview"
      src=${tem.url}
      class="mr-2"
      />
      </figure>
      <div>
      <h3 id="txtId" class="title is-5">
      ${tem.productTitle}
      </h3>
      <p id="txtSubtitle" class="subtitle is-7">
      ${tem.subTitle}
      </p>
      <p class="subtitle is-7 tag is-link is-light">
      <span id="pricePerItem">${addCommas(tem.productPrice)}</span>&nbsp;원
      </p>
      </div>
      </div>
      <div
      class="block is-flex is-align-items-center is-justify-content-flex-end"
      >
      <input type="hidden" value="${tem.id}">
      <input
      id="countItem"
      value="${tem.id}"
      class="countItem input is-3 column mr-4 "
      type="number"
      min=1
      placeholder="0"
      />
      <button id="btnDeleteItem" class="delete column"></button>
      </div>
      </form>
      </div>
      `;

      // read: 장바구니 물건 총개수
      const INPUT_VALUES = document.querySelectorAll('#countItem');
      let totalItems = [];
      for (let el of INPUT_VALUES) {
        totalItems.push(el.value);
      }

      let values = 0;
      for (let i = 0; i < totalItems.length; i++) {
        values += totalItems[i] * 1;
      }

      const COUNT_PRODUCT = document.getElementById('countAllItem');
      COUNT_PRODUCT.innerHTML = values;

      //update: 장바구니 물건 개수 변경
      for (let i = 0; i < INPUT_VALUES.length; i++) {
        let input = INPUT_VALUES[i];
        input.addEventListener('input', () => {
          let totalItems = [];
          for (let el of INPUT_VALUES) {
            totalItems.push(el.value);
          }

          let values = 0;
          for (let i = 0; i < totalItems.length; i++) {
            values += totalItems[i] * 1;
          }

          COUNT_PRODUCT.innerHTML = values.toString();
        });
      }

      //read: 장바구니 총액 반영
      for (let i = 0; i < INPUT_VALUES.length; i++) {
        const INPUT_VALUES = document.querySelectorAll('#countItem');
        let totalItems = [];
        for (let el of INPUT_VALUES) {
          totalItems.push(el.value);
        }

        let values = 0;
        for (let i = 0; i < totalItems.length; i++) {
          values += totalItems[i] * 1 * (tem.productPrice * 1);
        }

        PRICCE_TOTAL.innerHTML = addCommas(values).toString();
      }

      //update: 총액 숫자 변경
      for (let i = 0; i < INPUT_VALUES.length; i++) {
        let input = INPUT_VALUES[i];
        input.addEventListener('input', () => {
          const INPUT_VALUES = document.querySelectorAll('#countItem');
          let totalItems = [];
          for (let el of INPUT_VALUES) {
            totalItems.push(el.value);
          }

          let values = 0;
          for (let i = 0; i < totalItems.length; i++) {
            values += totalItems[i] * 1 * (tem.productPrice * 1);
          }
          PRICCE_TOTAL.innerHTML = addCommas(values).toString();
        });
      }
      //delete: 장바구니 물건 전체 삭제
      const BTN_ALL_REMOVE = document.getElementById('btnAllRemove');
      BTN_ALL_REMOVE.addEventListener('click', (e) => {
        e.preventDefault();
        COUNT_PRODUCT.innerHTML = '0';
        PRICCE_TOTAL.innerHTML = '0';
        PRODUCT.innerHTML = '';
        console.log('all items delete - clear -');
      });

      //delete: 장바구니 물건 개별 삭제[221104]
      const BTN_DEL_ITEMS = document.querySelectorAll('#btnDeleteItem');
      const PERCHAISING = document.querySelector('#perchasing');
      for (let i = 0; i < BTN_DEL_ITEMS.length; i++) {
        let btndel = BTN_DEL_ITEMS[i];
        btndel.addEventListener('click', (e) => {
          e.preventDefault();

          //update: 장바구니 물건 개수 변경
          totalItems.splice(i, 1);
          let result = totalItems.reduce((pre, cur) => pre * 1 + cur * 1);
          console.log(totalItems);
          COUNT_PRODUCT.innerHTML = result;

          btndel.parentElement.parentElement.parentElement.remove();
          //1. 개별삭제시 총액에 반영하기
          //2. 개별삭제로 목록이 모두 삭제될 시 총액 0으로 변경
          //3.개별삭제 모두 진행시 금액 반영
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
}

async function creatProduct() {
  await getData();
}

creatProduct();

// **** 리팩토링 "참고" HOME.JS
// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertTextToLanding();
  insertTextToGreeting();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  landingDiv.addEventListener('click', alertLandingText);
  greetingDiv.addEventListener('click', alertGreetingText);
}

async function getDataFromApi() {
  // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
  const data = await Api.get('/api/user/data');
  const random = randomId();

  console.log({ data });
  console.log({ random });
}
