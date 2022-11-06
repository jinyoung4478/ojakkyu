import * as Api from '../utils/api.js';
import {
  clientSideInclude,
  checkLogin,
  formatPhoneNumber,
} from '../utils/useful-functions.js';

// 각 element 바인딩
const emailInput = document.querySelector('#emailInput');
const nameInput = document.querySelector('#nameInput');
const nameToggle = document.querySelector('#nameToggle');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const passwordToggle = document.querySelector('#passwordToggle');
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
  clientSideInclude();
  // 해당 유저 정보 불러오기
  insertData();
  // 모든 인풋 요소 초기화 (비활성화)
  disableAllElements();
}

async function insertData() {
  userData = await Api.get('/api/users/myInfo');

  const { fullName, phoneNumber } = userData;
  userData.password = '';

  emailInput.value = userData.email;
  nameInput.value = fullName;
  phoneNumberInput.value = phoneNumber;
}

function addAllEvents() {
  nameToggle.addEventListener('change', handleToggleButton);
  passwordToggle.addEventListener('change', handleToggleButton);
  phoneNumberToggle.addEventListener('change', handleToggleButton);
  phoneNumberInput.addEventListener('input', handlePhoneNumberInput);
  saveButton.addEventListener('click', openModal);
  modalCloseButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', keyDownCloseModal);
  saveCompleteButton.addEventListener('click', updateUserData);
}

function handleToggleButton(e) {
  const toggleTargets = {
    nameToggle: [nameInput],
    passwordToggle: [passwordInput, passwordConfirmInput],
    phoneNumberToggle: [phoneNumberInput],
  };
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

function disableAllElements() {
  nameInput.setAttribute('disabled', '');
  nameToggle.checked = false;
  passwordInput.setAttribute('disabled', '');
  passwordToggle.checked = false;
  passwordConfirmInput.setAttribute('disabled', '');
  phoneNumberInput.setAttribute('disabled', '');
  phoneNumberToggle.checked = false;
}

async function updateUserData(e) {
  e.preventDefault();

  const name = nameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;
  const currentPassword = currentPasswordInput.value;

  if (password && password.length < 4) {
    return alertError('비밀번호는 최소 4글자 이상입니다.');
  }
  if (password && password !== passwordConfirm) {
    return alertError('비밀번호를 다시 확인해주세요');
  }

  const data = { currentPassword };

  if (name !== userData.fullName && name.length > 1) {
    data.fullName = name;
  }
  // 비밀번호 및 비밀번호 확인 일치 여부
  if (password !== userData.password) {
    data.password = password;
  }
  // 폰 번호 수정 사항 여부 판별
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
    alert('회원정보가 안전하게 저장되었습니다.');
  } catch (err) {
    closeModal();
    alert(err);
  }
}

function alertError(message) {
  closeModal();
  alert(message);
}

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
