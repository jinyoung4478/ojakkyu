import {
  addCommas,
  renderClientSideComponent,
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

function totalProductItems(){
  const countAllItem = document.querySelector(".countAllItem");
  const productCount = document.querySelector(".productCount");
  console.log(data.length)

    if(data.length === null) {
      productCount.innerText = "0";
      sessionStorage.clear(); 
    }
    else countAllItem.innerText = data.length;
 
}

totalProductItems();



async function drawProduct() {

  productList.innerHTML = "";
  try {
    console.log(data)

    if(data !== null && data.length !== 0){
      const insertList = data.map((tem,idx) => {
        const { image, id, title, name, quantity, price, description, initial, _id} = tem;
    
          return `
            <section class="cartForm">
              <div class="cartInfo">
                <p class="checkBox"><input type="checkbox" name="cart" class="checkCart" data-id="${_id}"/></p>
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
                ${initial ? 
                (
                  `
                  <label>각인될 문구: 
                      <span>${initial}</span> 
                  </label>
                  `
                ) : (
                  `<label>입력하신 문구가 없습니다.</label>`
                )}   
                </div>
    
                <div class="quantityInput" key=${idx}>
                  <input
                    value="${quantity}"
                    class="countItem"
                    type="text"
                    placeholder="0"
                    disabled = "true"
                  />
                  <button tpye="button" data-id="${id}" class="deleteProduct"></button>
                </div>
              </div>
            </section>
            `
        })
      productList.innerHTML = insertList.join("");

    }else{
      const container = document.querySelector(".container");
      const mark = `
        <div class="emptyCart">
          <h1>장바구니가 비었습니다.</h1>
        </div>
      `
      container.innerHTML = mark;
    }
   


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
// 체크된 인풋
const checkValue = Array.from(quantityInput).map(e => e.attributes[1].value)

const checkLen = Array.from(checkCart).filter(e => e.checked === true).length;
console.log(checkLen)

function checkDelete(e){
  if(checkLen){
    
  }

}

// const newCartList = cartList.filter(({ productId }) => checked.indexOf(productId) === -1);


// function deleteChoice(e){

//   if(e.target.className === "deleteProduct"){
//     e.preventDefault();

//     const local = data.filter( a => (a.id != e.target.dataset.id));
  
//     checkCart.forEach((c,idx) => {
//       if(c.checked){
//           e.target.closest(".cartForm").remove(),
//           sessionStorage.setItem("cart",JSON.stringify(local))
//       }else{
//           // alert("품목을 선택해주세요.")
//       }
      
//     })
//     const totalPrice = data.reduce(
//       (acc, item) => acc + Number(item.price),
//       0,
//     );
//     priceText.innerText = renderTotalPrice(totalPrice)
//   }

// }
// listItems.addEventListener("click", deleteChoice);



// 체크 품목 결제페이지로 넘기기


const priceWrap = document.querySelector(".priceWrap");

function checkedOrder(e){
  const checkItem = [];
  const checkConfirm = Array.from(checkCart).map(e => {
      if(e.checked === true) return e.dataset.id
  });
  const orderItem = data.filter((a, idx) => a._id == checkConfirm[idx])
  checkItem.push(orderItem)
  sessionStorage.setItem("item", JSON.stringify(orderItem))

  if(e.target.className === "orderBtn"){
    e.preventDefault();
    location.href = "/order";

  }

}
priceWrap.addEventListener("click", checkedOrder)

