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
                value="${quantity}"
                class="countItem"
                type="text"
                placeholder="0"
              />
              <button data-id="${id}" class="deleteProduct"></button>
            </div>
          </div>
        </form>
        
        `
    })

    productList.innerHTML = insertList.join("");

    // 개별 삭제
    const deleteProduct = document.querySelectorAll(".deleteProduct");
    console.log(deleteProduct[0].dataset);
    function deleteCart(e){
      e.preventDefault();
      console.log(e.target)
    };
    deleteProduct.addEventListener("click", deleteCart);

  } catch(err){
    console.log(err)
  }
}



drawProduct()

