import * as Api from '../utils/api.js';
import {
  clientSideInclude,
  checkLogin,
  formatPhoneNumber,
} from '../utils/useful-functions.js';

// 각 element 바인딩
const emailInput = document.querySelector('#emailInput');
const nameInput = document.querySelector('#nameInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const saveButton = document.querySelector('#saveButton');
// modal
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
}

async function insertData() {
  userData = await Api.get('/api/users/myInfo');

  //const { fullName, phoneNumber } = userData;
  const { full_name, phone_number } = userData;
  userData.password = '';

  emailInput.value = userData.email;
  //nameInput.value = fullName;
  nameInput.value = full_name;
  //phoneNumberInput.value = phoneNumber;
  phoneNumberInput.value = phone_number;
}

function addAllEvents() {
  phoneNumberInput.addEventListener('input', handlePhoneNumberInput);
  saveButton.addEventListener('click', openModal);
  modalCloseButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', keyDownCloseModal);
  saveCompleteButton.addEventListener('click', updateUserData);
}

async function updateUserData(e) {
  e.preventDefault();

  const name = nameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;
  //const currentPassword = currentPasswordInput.value;
  const current_password = currentPasswordInput.value;

  if (password && password.length < 4) {
    return alertError('비밀번호는 최소 4글자 이상입니다.');
  }
  if (password && password !== passwordConfirm) {
    return alertError('비밀번호를 다시 확인해주세요');
  }

  //const data = { currentPassword };
  const data = { current_password };

  //if (name !== userData.fullName) {
  if (name !== userData.full_name && name.length > 1) {
    //data.fullName = name;
    data.full_name = name;
  }
  // 비밀번호 및 비밀번호 확인 일치 여부
  if (password !== userData.password) {
    data.password = password;
  }
  //if (phoneNumber && phoneNumber !== userData.phoneNumber) {
  if (
    phoneNumber &&
    phoneNumber !== userData.phone_number &&
    phoneNumber.length === 13
  ) {
    //data.phoneNumber = phoneNumber
    data.phone_number = phoneNumber;
  }

  const { _id } = userData;
  try {
    await Api.put('/api/users', _id, data);
  } catch (err) {
    alert('회원 정보 수정을 실패하였습니다 : ', err);
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
  modal.classList.remove('is-active');
}

// 키보드로 Modal 창 닫기
function keyDownCloseModal(e) {
  // Esc 키
  if (e.keyCode === 27) {
    closeModal();
  }
}
