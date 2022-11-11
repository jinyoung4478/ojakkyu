import * as Api from '../utils/api.js';
import {
  renderClientSideComponent,
  checkLogin,
  formatPhoneNumber,
  validatePhoneNumber,
} from '../utils/useful-functions.js';

// 각 element 바인딩
const emailInput = document.querySelector('#emailInput');
const nameInput = document.querySelector('#nameInput');
const nameToggle = document.querySelector('#nameToggle');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const passwordToggle = document.querySelector('#passwordToggle');

const postalCodeInput = document.querySelector('#postalCodeInput');
const searchAddressButton = document.querySelector('#searchAddressButton');
const addressToggle = document.querySelector('#addressToggle');
const addressInput = document.querySelector('#addressInput');
const addressDetailInput = document.querySelector('#addressDetailInput');

const phoneNumberInput = document.querySelector('#phoneNumberInput');
const phoneNumberToggle = document.querySelector('#phoneNumberToggle');
const saveButton = document.querySelector('#saveButton');
const modal = document.querySelector('#modal');
const modalBackground = document.querySelector('#modalBackground');
const modalCloseButton = document.querySelector('#modalCloseButton');
const currentPasswordInput = document.querySelector('#currentPasswordInput');
const saveCompleteButton = document.querySelector('#saveCompleteButton');
let userData;

// 로그인 여부 판별
checkLogin();

// 페이지 렌더링
renderElements();
addAllEvents();

function renderElements() {
  // 컴포넌트 렌더링
  renderClientSideComponent();
  // 해당 유저 정보 불러오기
  insertData();
  // 모든 인풋 요소 초기화 (비활성화)
  disableAllElements();
}

// 유저 기존 데이터 자동 완성
async function insertData() {
  userData = await Api.get('/api/users/myInfo');

  const { fullName, phoneNumber, address } = userData;
  userData.password = '';

  emailInput.value = userData.email;
  nameInput.value = fullName;
  postalCodeInput.value = address.postalCode;
  addressInput.value = address.address1;
  addressDetailInput.value = address.address2;
  phoneNumberInput.value = phoneNumber;
}

// 모든 이벤트 바인딩
function addAllEvents() {
  nameToggle.addEventListener('change', handleToggleButton);
  passwordToggle.addEventListener('change', handleToggleButton);
  phoneNumberToggle.addEventListener('change', handleToggleButton);
  addressToggle.addEventListener('change', handleToggleButton);
  searchAddressButton.addEventListener('click', searchAddress);

  phoneNumberInput.addEventListener('input', handlePhoneNumberInput);
  saveButton.addEventListener('click', openModal);
  modalBackground.addEventListener('click', closeModal);
  modalCloseButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', keyDownCloseModal);
  saveCompleteButton.addEventListener('click', updateUserData);
}

const toggleTargets = {
  nameToggle: [nameInput],
  passwordToggle: [passwordInput, passwordConfirmInput],
  addressToggle: [
    postalCodeInput,
    addressInput,
    addressDetailInput,
    searchAddressButton,
  ],
  phoneNumberToggle: [phoneNumberInput],
};

// 토글 버튼 기능 동작
function handleToggleButton(e) {
  const isChecked = e.target.checked;
  const targets = toggleTargets[e.target.id];
  targets.forEach((target, index) => {
    if (isChecked) {
      target.removeAttribute('disabled');
      if (index === 0) {
        target.focus();
      }
    } else {
      target.setAttribute('disabled', '');
    }
  });
}

// 모든 form 관련 요소 비활성화
function disableAllElements() {
  nameInput.setAttribute('disabled', '');
  nameToggle.checked = false;
  passwordInput.setAttribute('disabled', '');
  passwordToggle.checked = false;
  passwordConfirmInput.setAttribute('disabled', '');
  postalCodeInput.setAttribute('disabled', '');
  addressInput.setAttribute('disabled', '');
  addressDetailInput.setAttribute('disabled', '');
  addressToggle.checked = false;
  searchAddressButton.setAttribute('disabled', '');
  phoneNumberInput.setAttribute('disabled', '');
  phoneNumberToggle.checked = false;
}

// daum 주소 API를 활용한 주소 입력 (참조 : https://postcode.map.daum.net/guide)
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

// 개인정보 수정 폼 검증 및 api 요청
async function updateUserData(e) {
  e.preventDefault();

  const name = nameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = addressInput.value;
  const address2 = addressDetailInput.value;
  const phoneNumber = phoneNumberInput.value;
  const currentPassword = currentPasswordInput.value;

  if (password && password.length < 4) {
    return alertError('비밀번호는 최소 4글자 이상입니다.');
  }
  if (password && password !== passwordConfirm) {
    return alertError('비밀번호를 다시 확인해주세요');
  }
  if (!validatePhoneNumber(phoneNumber)) {
    return alertError('전화번호 형식이 맞지 않습니다.');
  }
  if (!postalCode && !address1) {
    return alert('주소를 입력해주세요');
  }
  if (!address2) {
    return alert('상세 주소를 입력해주세요');
  }

  const data = { currentPassword };

  // 이름 변경 여부 판별
  if (name !== userData.fullName && name.length > 1) {
    data.fullName = name;
  }
  // 비밀번호 및 비밀번호 확인 일치 여부
  if (password !== userData.password) {
    data.password = password;
  }
  //주소 수정 여부 판별
  if (
    postalCode !== userData.postalCode ||
    address1 !== userData.address1 ||
    address2 !== userData.address2
  ) {
    data.address = { postalCode, address1, address2 };
  }
  // 폰 번호 수정 여부 판별
  if (
    phoneNumber &&
    phoneNumber !== userData.phoneNumber &&
    phoneNumber.length === 13
  ) {
    data.phoneNumber = phoneNumber;
  }

  if (Object.keys(data).length === 1) {
    closeModal();
    return alert('업데이트된 정보가 없습니다.');
  }

  try {
    const { _id } = userData;
    await Api.put('/api/users', _id, data);
    closeModal();
    disableAllElements();
    alert('회원정보가 안전하게 저장되었습니다.');
  } catch (err) {
    closeModal();
    alert(err);
  }
}

// form 관련 에러 알림 띄우기
function alertError(message) {
  closeModal();
  alert(message);
}

// 폰 번호 입력 시 자동 포맷팅
function handlePhoneNumberInput() {
  phoneNumberInput.value = formatPhoneNumber(this.value);
}

// Modal 창 열기
function openModal(e) {
  e.preventDefault();
  modal.classList.add('is-active');
  currentPasswordInput.focus();
}

// Modal 창 닫기
function closeModal(e) {
  if (e) {
    e.preventDefault();
  }
  currentPasswordInput.value = '';
  modal.classList.remove('is-active');
}

// 키보드로 Modal 창 닫기
function keyDownCloseModal(e) {
  // Esc 키
  if (e.keyCode === 27) {
    closeModal();
  }
}
