import * as Api from '/utils/api.js';
import {
  addCommas,
  renderClientSideComponent,
  checkLogin,
} from '/utils/useful-functions.js';

// 컴포넌틑 렌더링
renderClientSideComponent();

const productList = document.querySelector('.listItems');
const countDelete = document.querySelector(".countDelete");



async function drawProduct() {
  const data = JSON.parse(sessionStorage.getItem('cart'));
  console.log(data.product)

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

    const insertList = data.product.map((tem) => {
      const { image, id, title, name, quantity, price, description} = tem;
      console.log(tem)

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
                  ${title}
                </h3>
                <p class="subText">
                  ${description}
                </p>
                <p class="totalPrice">
                  <span id="pricePerItem">${price}</span>&nbsp;원
                </p>
              </div>
            </div>

            <div class="quantityInput">
              <input type="hidden" value="${id}">
              <input
                id="countItem"
                value="${quantity}"
                class="countItem"
                type="text"
                placeholder="0"
              />
              <button id="btnDeleteItem" class="deleteProduct"></button>
            </div>
          </div>
        </form>
        
        `
    })

    productList.innerHTML = insertList.join("");


      // 개별 삭제

    const deleteProduct = document.querySelector(".deleteProduct");

    console.log(deleteProduct)

    function deleteCart(e){
      e.preventDefault();

    }
    deleteProduct.addEventListener("click", deleteCart)

  } catch(err){
    console.log(err)
  }
}


//       //delete: 장바구니 물건 개별 삭제
//       //[221104 - 진행중: splice를 사용하면 순차적 삭제시 4번 이후로 삭제가 어렵습니다.]
//       const BTN_DEL_ITEMS = document.querySelectorAll('#btnDeleteItem');
//       const PERCHAISING = document.querySelector('#perchasing');
//       for (let i = 0; i < BTN_DEL_ITEMS.length; i++) {
//         let btndel = BTN_DEL_ITEMS[i];
//         btndel.addEventListener('click', (e) => {
//           e.preventDefault();


drawProduct()

