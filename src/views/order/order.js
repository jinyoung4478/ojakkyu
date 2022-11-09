import * as Api from '../utils/api.js';
import {
  renderClientSideComponent,
  addCommas,
  validatePhoneNumber,
  formatPhoneNumber,
} from '../utils/useful-functions.js';

const listItems = document.querySelector('#listItems');
const nameInput = document.querySelector('#nameInput');
const postalCodeInput = document.querySelector('#postalCodeInput');
const searchAddressButton = document.querySelector('#searchAddressButton');
const addressInput = document.querySelector('#addressInput');
const addressDetailInput = document.querySelector('#addressDetailInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const priceTotalSpan = document.querySelector('#priceTotalSpan');
const purchaseButton = document.querySelector('#purchaseButton');

// 직전 페이지 url
const exUrl = new URL(document.referrer).pathname;
let userData;
let orderData;
let isCartOrder = false;

// 상품페이지에서 접근했는지, 장바구니에서 접근했는지 구분하기
checkOrderType();

// 페이지 렌더링
renderElements();
addAllEvents();

function renderElements() {
  // 컴포넌트 렌더링
  renderClientSideComponent();
  // 주문 목록 제품 리스트 렌더링
  renderOrderList();
  renderTotalPrice();
  // 해당 유저 정보 불러오기
  insertUserData();
}

function checkOrderType() {
  // 장바구니 페이지에서 유입되었을 경우
  if (exUrl === '/cart/') {
    isCartOrder = true;
  }
}

// 주문 목록 제품 리스트 렌더링
function renderOrderList() {
  // 주문 목록 데이터 불러오기
  let type = 'order';
  if (isCartOrder) {
    type = 'cart';
  }
  try {
    orderData = JSON.parse(sessionStorage.getItem(type)).product;
  } catch (err) {
    alert('주문 목록이 없습니다.');
    location.href = exUrl;
    return;
  }

  // 추가할 주문 목록 데이터를 element로 변환
  const elementOfProducts = orderData.reduce(
    (acc, item) =>
      acc +
      `
        <li>
            <p>${item.name}</p>
            <p>${item.quantity}</p>
            <p>${item.price}</p>
        </li>
        `,
    '',
  );
  // HTML 이어붙이기
  listItems.innerHTML += `<ul>${elementOfProducts}</ul>`;
}

function renderTotalPrice() {
  const totalPrice = orderData.reduce(
    (acc, item) => acc + Number(item.price),
    0,
  );
  priceTotalSpan.innerText = addCommas(totalPrice);
}

async function insertUserData() {
  // 로그인 여부 판별
  const token = sessionStorage.getItem('token');

  // 로그인이 안되어있을 경우
  if (!token) {
    return;
  }
  // 로그인 상태일 경우 유저 데이터 불러오기
  userData = await Api.get('/api/users/myInfo');
  const { fullName, phoneNumber, address } = userData;
  // 유저 비밀번호(민감한 정보) 데이터 삭제
  userData.password = '';

  // 각 Input 엘레멘트에 데이터 추가
  nameInput.value = fullName;
  postalCodeInput.value = address.postalCode;
  addressInput.value = address.address1;
  addressDetailInput.value = address.address2;
  phoneNumberInput.value = phoneNumber;
}

function addAllEvents() {
  searchAddressButton.addEventListener('click', searchAddress);
  purchaseButton.addEventListener('click', handlePurchase);
  phoneNumberInput.addEventListener('input', handlePhoneNumberInput);
}

function searchAddress(e) {
  e.preventDefault();
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      }
      postalCodeInput.value = data.zonecode;
      addressInput.value = `${addr} ${extraAddr}`;
      addressDetailInput.placeholder = '상세 주소를 입력해 주세요';
      addressDetailInput.focus();
    },
  }).open();
}

// 폰 번호 입력 시 자동 포맷팅
function handlePhoneNumberInput() {
  phoneNumberInput.value = formatPhoneNumber(this.value);
}

async function handlePurchase(e) {
  e.preventDefault();
  const postalCode = postalCodeInput.value;
  const address1 = addressInput.value;
  const address2 = addressDetailInput.value;
  const receiverName = nameInput.value;
  const receiverPhoneNumber = phoneNumberInput.value;
  const totalPrice = priceTotalSpan.value;

  // 구매자 데이터 입력이 잘 되었는지 검증
  if (!nameInput.value) {
    return alert('주문자 이름을 입력해주세요');
  }
  if (!addressInput.value || !addressInput.value) {
    return alert('주소 입력은 필수입니다.');
  }
  if (!addressDetailInput.value) {
    return alert('상세주소를 입력해주세요.');
  }
  if (!phoneNumberInput.value) {
    return alert('전화번호를 입력해주세요.');
  }
  if (!validatePhoneNumber(phoneNumberInput.value)) {
    return alert('전화번호 형식이 맞지 않습니다.');
  }

  // order api 요청
  const currentUserId = userData._id;
  const summaryTitle = ''; // 미구현
  const status = '상품 준비 중';
  const address = {
    postalCode,
    address1,
    address2,
    receiverName,
    receiverPhoneNumber,
  };

  const data = {
    currentUserId,
    summaryTitle,
    address,
    quantity: 1,
    status,
    totalPrice,
  };
  const jsonData = JSON.stringify(data);

  const result = await Api.post('/api/orders/payment', jsonData);
  console.log(result);
}
