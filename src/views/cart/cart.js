import {
  addCommas,
  renderClientSideComponent,
} from '/utils/useful-functions.js';

// dom 요소
const listItems = document.querySelector('.listItems');
const productList = document.querySelector('.listItems');
const totalItemNumber = document.querySelector('#totalItemNumber');
const allDelete = document.querySelector('.deleteBtn');
const totalPriceLabel = document.querySelector('#totalPriceLabel');
const purchaseButton = document.querySelector('#purchaseButton');
let cartData;

renderElements();
addAllEvents();

// 엘리먼트 렌더링
function renderElements() {
  renderClientSideComponent();
  renderCartList();
}

// 전체 이벤트 바인딩
function addAllEvents() {
  allDelete.addEventListener('click', deleteAllProducts);
  listItems.addEventListener('click', handleCartItem);
  purchaseButton.addEventListener('click', purchaseCartProducts);
}

// 장바구니 항목 렌더링
async function renderCartList() {
  cartData = JSON.parse(sessionStorage.getItem('cart'));
  if (cartData === null || cartData.length === 0) {
    productList.innerHTML = '<h1>장바구니가 비었습니다.</h1>';
  } else {
    const cartListElem = cartData.reduce((acc, item) => {
      return (
        acc +
        `
      <form class="cartForm">
          <div class="cartInfo">
            <p class="checkBox">
              <input 
                type="checkbox" 
                name="${item._id}"
                class="checkCart"
                id="checkbox-${item.id}"
                data-id="${item._id}"
                ${item.selected ? 'checked' : ''}
              />
            </p>
            <figure class="innerImg">
              <img src=${item.image} />
            </figure>
            <div class="subWrap">
              <h3 class="subTitle">
                ${item.title}
              </h3>
              <span class="nameText">${item.name}</span>
              <p class="descText">
                ${item.description}
              </p>
              <p class="totalPrice">
                <span id="pricePerItem">${addCommas(item.price)}원</span>
              </p>
            </div>
          </div>
          <div class="initialWrap">
            <label>
              ${item.initial ? `각인될 문구: ` : `입력하신 문구가 없습니다.`}
              ${item.initial ? `<span>${item.initial}</span>` : ''}
            </label>
          </div>
          <div class="quantityInput">
            <input
              value="${item.quantity}"
              class="countItem"
              name="${item._id}"
              type="number"
              min="1"
            />
            <button
              type="button"
              data-id="${item.id}"
              class="deleteProduct"
              >
            </button>
          </div>
        </div>
      </form>
      `
      );
    }, '');
    productList.innerHTML = cartListElem;
    renderTotalPrice();
  }
}

// 전체삭제
function deleteAllProducts() {
  if (window.confirm('정말 삭제 하시겠습니까?')) {
    cartData = [];
    productList.innerHTML = '';
    sessionStorage.removeItem('cart');
    renderTotalPrice();
  }
}

// 장바구니 품목 내부 이벤트
function handleCartItem(e) {
  // 장바구니 품목 선택 / 선택 해제
  if (e.target.type === 'checkbox') {
    cartData.filter((item) => item._id === e.target.name)[0].selected =
      e.target.checked;
    sessionStorage.setItem('cart', JSON.stringify(cartData));
    renderTotalPrice();
  }
  // 해당 품목 개별 삭제
  if (e.target.type === 'button') {
    cartData = cartData.filter((item) => item.id !== e.target.dataset.id);
    sessionStorage.setItem('cart', JSON.stringify(cartData));
    renderCartList();
    renderTotalPrice();
  }
  // 해당 품목 개수 조절
  if (e.target.type === 'number') {
    cartData = cartData.map((item) => {
      if (item._id === e.target.name) {
        item.quantity = e.target.value;
      }
      return item;
    });
    sessionStorage.setItem('cart', JSON.stringify(cartData));
    renderTotalPrice();
  }
}
// 총액 구하기
function renderTotalPrice() {
  let totalNumber = 0;
  const totalPrice = cartData.reduce((acc, item) => {
    if (item.selected) {
      totalNumber++;
      return acc + Number(item.price) * Number(item.quantity);
    } else {
      return acc;
    }
  }, 0);
  totalItemNumber.innerText = `총 ${totalNumber}개`;
  totalPriceLabel.innerText = addCommas(totalPrice);
}

// 주문하기 버튼
function purchaseCartProducts(e) {
  e.preventDefault();
  const orderData = cartData.reduce((acc, item) => {
    if (item.selected) {
      acc.push({
        id: item.id,
        initial: item.initial,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });
    }
    return acc;
  }, []);
  if (orderData.length === 0) {
    alert('선택된 상품이 없습니다.');
    return;
  }
  // 현재 상품으로 session Storage의 order 덮어쓰기
  sessionStorage.setItem('order', JSON.stringify(orderData));
  location.href = '/order';
}
