import * as Api from '../utils/api.js';
import { clientSideInclude, checkLogin } from '../utils/useful-functions.js';

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

async function insertData() {
  userData = await Api.get('/api/users/info');
  const { full_name } = userData;
  nameInput.value = full_name;
}

function renderElements() {
  // 컴포넌트 렌더링
  clientSideInclude();
  // 해당 유저 정보 불러오기
  insertData();
}

function formValidate(data) {
  console.log(data);
}

saveButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const password = newPasswordInput.value;
  const passwordConfirm = newPasswordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;

  const userInputData = { name, password, passwordConfirm, phoneNumber };

  // 입력받은 데이터 유효성 검사
  formValidate(userInputData);
});
