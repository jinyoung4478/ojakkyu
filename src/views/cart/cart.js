import * as Api from '/utils/api.js';
import {
  addCommas,
  renderClientSideComponent,
  checkLogin,
} from '/utils/useful-functions.js';

// dom 요소
const productList = document.querySelector('.listItems');
const data = JSON.parse(sessionStorage.getItem("cart"));

renderElements();

// 엘리먼트 렌더링
function renderElements() {
  renderClientSideComponent();
  drawProduct();
}

// 총 개수 세기
// totalProductItems();

// function totalProductItems(){
//   const countAllItem = document.querySelector(".countAllItem");
//   const productCount = document.querySelector(".productCount");
//   console.log(data.length)
//   if(data.length === 0) {
//     productCount.innerText = "장바구니가 비어있습니다.";
//     sessionStorage.clear(); 
//   }
//   else countAllItem.innerText = data.length;
// }



async function drawProduct() {

  productList.innerHTML = "";
  try {
    console.log(data)
    const insertList = data.map((tem,idx) => {
    const { image, id, title, name, quantity, price, description, initial, _id} = tem;

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
                <span class="nameText">${name}</span>
                <p class="descText">
                  ${description}
                </p>
                <p class="totalPrice">
                  <span id="pricePerItem">${addCommas(price)}</span>&nbsp;원
                </p>
              </div>
            </div>

            <div class="initialWrap">
              <label>각인될 문구: 
                <i class="fa-solid fa-bracket-square"></i>
                  <span>${initial}</span> 
                <i class="fa-solid fa-bracket-square"></i>
              </label>
            </div>

            <div class="quantityInput" key=${idx}>
              <input
                value="${quantity}"
                class="countItem"
                type="text"
                placeholder="0"
                disabled = "true"
              />
              <button tpye="button" data-id="${id}" data-key="${idx}" data-initial="${initial}" class="deleteProduct"></button>
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


// 전체삭제
const allDelete = document.querySelector(".deleteBtn");
function allDeleteCart(){
  if(window.confirm("정말 삭제 하시겠습니까?")) {
    data.length ? (
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

// 총액 구하기
const priceText = document.querySelector(".priceText");
function renderTotalPrice() {
  const totalPrice = data.reduce(
    (acc, item) => acc + Number(item.price),
    0,
  );
  priceText.innerText = addCommas(totalPrice);
}

renderTotalPrice();


// 개별 삭제
const checkCart = document.querySelectorAll(".checkCart");
const listItems = document.querySelector(".listItems");
const quantityInput = document.querySelectorAll(".quantityInput");
const ar = Array.from(quantityInput).map(e => e.attributes[1].value)
console.log(ar)

function deleteChoice(e){
  if(e.target.className === "deleteProduct"){
    e.preventDefault();

    const local = data.filter( a => (a.id != e.target.dataset.id));
    
    // console.log( e.target.closest(".checkCart"),e.target)
    // console.log(local,"asdasd")
    checkCart.forEach((c,idx) => {
      // console.log(c,idx, "asd" , ar[idx])
      if(c.checked){
          e.target.closest(".cartForm").remove(),
          sessionStorage.setItem("cart",JSON.stringify(local))
      }else{
          // alert("품목을 선택해주세요.")
      }
      
    })
  }

}
listItems.addEventListener("click", deleteChoice);




// 체크 품목 결제페이지로 넘기기
const orderBtn = document.querySelector(".orderBtn");

function checkedOrder(e){
  e.preventDefault();
  checkCart.forEach(c => {
    if(!c.checked) alert("제품을 선택해주세요.");

  })

}
// orderBtn.addEventListener("click", checkedOrder);