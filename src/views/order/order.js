import * as Api from '../utils/api.js';
import { renderClientSideComponent } from '../utils/useful-functions.js';

const listItems = document.querySelector('#listItems');
const nameInput = document.querySelector('#nameInput');
const postalCodeInput = document.querySelector('#postalCodeInput');
const searchAddressButton = document.querySelector('#searchAddressButton');
const addressInput = document.querySelector('#addressInput');
const addressDetailInput = document.querySelector('#addressDetailInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const purchaseButton = document.querySelector('#purchaseButton');
let userData;

// 상품페이지에서 접근했는지, 장바구니에서 접근했는지 구분하기

// 페이지 렌더링
renderElements();
addAllEvents();

function renderElements() {
  // 컴포넌트 렌더링
  renderClientSideComponent();
  // 주문 목록 제품 리스트 렌더링
  renderProductList();
  // 해당 유저 정보 불러오기
  insertUserData();
}

// 주문 목록 제품 리스트 렌더링
function renderProductList() {
  // 주문 목록 데이터 불러오기
  const orderData = JSON.parse(sessionStorage.getItem('order')).product;
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

async function insertUserData() {
  // 로그인 여부 판별
  const token = sessionStorage.getItem('token');
  // 로그인 상태일 경우 유저 데이터 불러오기
  if (token) {
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
}

function addAllEvents() {
  searchAddressButton.addEventListener('click', searchAddress);
  purchaseButton.addEventListener('click', handlePurchase);
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

function handlePurchase(e) {
  e.preventDefault();
  // 구매자 데이터 입력이 잘 되었는지 검증
  // order api 요청
}
