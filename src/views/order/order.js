import * as Api from '../utils/api.js';
import { renderClientSideComponent } from '../utils/useful-functions.js';

const nameInput = document.querySelector('#nameInput');
const postalCodeInput = document.querySelector('#postalCodeInput');
const searchAddressButton = document.querySelector('#searchAddressButton');
const addressInput = document.querySelector('#addressInput');
const addressDetailInput = document.querySelector('#addressDetailInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const purchaseButton = document.querySelector('#purchaseButton');
let userData;

// 페이지 렌더링
renderElements();
addAllEvents();

function renderElements() {
  // 컴포넌트 렌더링
  renderClientSideComponent();

  // 해당 유저 정보 불러오기
  insertData();
}

async function insertData() {
  userData = await Api.get('/api/users/myInfo');
  const { fullName, phoneNumber, address } = userData;
  userData.password = '';

  nameInput.value = fullName;
  postalCodeInput.value = address.postalCode;
  addressInput.value = address.address1;
  addressDetailInput.value = address.address2;
  phoneNumberInput.value = phoneNumber;
}

function addAllEvents() {
  searchAddressButton.addEventListener('click', searchAddress);
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
