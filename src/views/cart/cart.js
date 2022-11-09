import * as Api from '/utils/api.js';
import {
  addCommas,
  renderClientSideComponent,
  checkLogin,
} from '/utils/useful-functions.js';

// dom 요소
const productList = document.querySelector('.listItems');
const countDelete = document.querySelector(".countDelete");
const data = JSON.parse(sessionStorage.getItem("cart"));


renderElements();

// 엘리먼트 렌더링
function renderElements() {
  renderClientSideComponent();
  drawProduct();
}

// 총 개수 세기
totalProductItems();

function totalProductItems(){
  const countAllItem = document.querySelector(".countAllItem");
  const productCount = document.querySelector(".productCount");

  if(data.length === 0) {
    productCount.innerText = "장바구니가 비어있습니다.";
    sessionStorage.clear(); 
  }
  else countAllItem.innerText = data.length;
}



async function drawProduct() {

  productList.innerHTML = "";
  try {
    console.log(data)
    const insertList = data.map((tem) => {
    const { image, id, title, name, quantity, price, description} = tem;

      console.log(tem)
      return `

        <form class="cartForm">
          <div class="cartInfo">
            <p class="checkBox"><input type="checkbox" name="cart" class="checkCart"/></p>
            <figure class="innerImg">
              <img
                src=${image}
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
                type="number"
                placeholder="0"
              />
              <button tpye="button" data-id="${id}" class="deleteProduct"></button>
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

const allDelete = document.querySelector(".deleteBtn");
function allDeleteCart(){
  if(window.confirm("정말 삭제 하시겠습니까?")) {
    data.product.length ? (
      productList.innerHTML = "",
      sessionStorage.clear()
    )
    :
    (
      ""
    )
  }
}

allDelete.addEventListener("click", allDeleteCart)


// 개별 삭제
const quantityInput = document.querySelector(".quantityInput");
const deleteProduct = document.querySelectorAll(".deleteProduct");
const checkCart = document.querySelectorAll(".checkCart");
const listItems = document.querySelector(".listItems");

function deleteChoice(e){


  if(e.target.className === "deleteProduct"){
    e.preventDefault();
    const local = data.filter( a => a.id != e.target.dataset.id);

    checkCart.forEach((c) => {
      c.checked ? (
        e.target.closest(".cartForm").remove(),
        sessionStorage.setItem("cart",JSON.stringify(local))
      ) : (
          ""
      )
    })
    
  }
}
listItems.addEventListener("click", deleteChoice);



  





