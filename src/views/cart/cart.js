import {
  addCommas,
  renderClientSideComponent,
} from '/utils/useful-functions.js';

// dom 요소
const listItems = document.querySelector('.listItems');
const productList = document.querySelector('.listItems');
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
  listItems.addEventListener('click', deleteProduct);
  purchaseButton.addEventListener('click', purchaseCartProducts);
}

// 장바구니 항목 렌더링
async function renderCartList() {
  cartData = JSON.parse(sessionStorage.getItem('cart'));
  if (cartData === null) {
    productList.innerHTML = '<h1>텅</h1>';
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
              type="text"
              disabled = "true"
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

// 개별 삭제하기
function deleteProduct(e) {
  if (e.target.type === 'checkbox') {
    cartData.filter((v) => v._id === e.target.name)[0].selected =
      e.target.checked;
    sessionStorage.setItem('cart', JSON.stringify(cartData));
    renderTotalPrice();
  }

  if (e.target.type === 'button') {
    cartData = cartData.filter((item) => item.id !== e.target.dataset.id);
    sessionStorage.setItem('cart', JSON.stringify(cartData));
    renderCartList();
    renderTotalPrice();
  }
}

// 총액 구하기
function renderTotalPrice() {
  const totalPrice = cartData.reduce((acc, item) => {
    if (item.selected) {
      return acc + Number(item.price);
    } else {
      return acc;
    }
  }, 0);
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
