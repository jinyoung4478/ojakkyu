import * as Api from '../utils/api.js';
import {
  clientSideInclude,
  checkLogin,
  formatPhoneNumber,
} from '../utils/useful-functions.js';

// 각 element 바인딩
const nameInput = document.querySelector('#nameInput');
const newPasswordInput = document.querySelector('#newPasswordInput');
const newPasswordConfirmInput = document.querySelector(
  '#newPasswordConfirmInput',
);
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const saveButton = document.querySelector('#saveButton');
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
  const { full_name, phone_number } = userData;

  nameInput.value = full_name;
  phoneNumberInput.value = phone_number;
}

function formValidate(data) {
  console.log(data);
}

function addAllEvents() {
  saveButton.addEventListener('click', handleSubmit);
  phoneNumberInput.addEventListener('input', handlePhoneNumberInput);
}

async function handleSubmit(e) {
  e.preventDefault();
  const name = nameInput.value;
  const password = newPasswordInput.value;
  const passwordConfirm = newPasswordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;

  const data = {
    full_name: name,
    password,
    phone_number: phoneNumber,
  };

  // 비밀번호 입력 필요
  data.current_password = '123123123';

  // 입력받은 데이터 유효성 검사
  formValidate(data);

  const { _id } = userData;
  console.log(_id);
  await Api.put('/api/users', _id, data);
}

function handlePhoneNumberInput() {
  phoneNumberInput.value = formatPhoneNumber(this.value);
}
