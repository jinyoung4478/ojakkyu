import * as Api from '../utils/api.js';
import { addCommas } from '../utils/useful-functions.js';

// [221103]작성. 상위요소 추후 수정예정
console.log('Hello Cart!');

// 요소(element), input 혹은 상수
/**제품 총수량 */
const COUNT_PRODUCT = document.getElementById('countAllItem');
/**장바구니 총액
 * @readonly
 */
const PRICCE_TOTAL = document.getElementById('priceTotal');

// __BUTTONS
/**장바구니 전체 비우는 버튼입니다
 * @todo del.All
 */
/**개별 상품 삭제 버튼입니다.
 * @todo this.del
 */
/**구매하기 버튼
 * @todo 구매목록 전송
 * @todo 장바구니 목록삭제
 */
const BTN_PERCHASE = document.getElementById('btnPurchase');
/**상품목록으로 돌아가는 버튼
 * @todo link
 */
const BTN_MOVO_ITEMLIST = document.getElementById('btnMoveToItemList');

// [221103]작성. 하위요소 추후 수정예정

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
      value="2"
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
    });
  } catch (err) {
    console.log(err);
  }
}
async function delData() {
  try {
    //delete: 장바구니 물건 전체 삭제
    const BTN_ALL_REMOVE = document.getElementById('btnAllRemove');
    BTN_ALL_REMOVE.addEventListener('click', (e) => {
      e.preventDefault();
      COUNT_PRODUCT.innerHTML = '0';
      PRICCE_TOTAL.innerHTML = '0';
      PRODUCT.innerHTML = '';
      console.log('all items delete - clear -');
    });

    //delete: 장바구니 물건 개별 삭제
    const BTN_DEL_ITEMS = document.querySelectorAll('#btnDeleteItem');
    const PERCHAISING = document.querySelector('#perchasing');
    for (let i = 0; i < BTN_DEL_ITEMS.length; i++) {
      let btndel = BTN_DEL_ITEMS[i];
      btndel.addEventListener('click', (e) => {
        e.preventDefault();
        btndel.parentElement.parentElement.parentElement.remove();
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function creatProduct() {
  await getData();
  await delData();
}

creatProduct();

// **** 참고 HOME.JS
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
