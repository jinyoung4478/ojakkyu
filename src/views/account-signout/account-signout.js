import * as Api from '../../utils/api.js';
import {
  renderClientSideComponent,
  checkLogin,
} from '../../utils/useful-functions.js';

// 로그인 여부 판별
checkLogin();

// 요소(element), input 혹은 상수
const passwordInput = document.querySelector('#passwordInput');
const submitButton = document.querySelector('#submitButton');
const modal = document.querySelector('#modal');
const modalBackground = document.querySelector('#modalBackground');
const modalCloseButton = document.querySelector('#modalCloseButton');
const deleteCompleteButton = document.querySelector('#deleteCompleteButton');
const deleteCancelButton = document.querySelector('#deleteCancelButton');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  // 컴포넌트 렌더링
  renderClientSideComponent();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
  deleteCompleteButton.addEventListener('click', deleteUserData);
  modalBackground.addEventListener('click', closeModal);
  modalCloseButton.addEventListener('click', closeModal);
  deleteCancelButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', keyDownCloseModal);
}

function handleSubmit(e) {
  e.preventDefault();
  const password = passwordInput.value;
  if (password.length < 4) {
    alert('비밀번호를 다시 확인해주세요.');
    passwordInput.value = '';
    passwordInput.focus();
    return;
  }
  openModal();
}

// db에서 회원정보 삭제
async function deleteUserData(e) {
  e.preventDefault();

  const currentPassword = passwordInput.value;
  const data = { currentPassword };

  try {
    //const userToDelete = await Api.get('/api/users/myInfo');
    const { _id } = await Api.get('/api/users/myInfo');

    // 삭제 진행
    await Api.delete('/api/users', _id, data);

    // 토큰 삭제
    sessionStorage.removeItem('token');

    // 삭제 성공
    alert('회원 정보가 안전하게 삭제되었습니다.');

    window.location.href = '/';
  } catch (err) {
    alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
    closeModal();
  }
}

// Modal 창 열기
function openModal() {
  modal.classList.add('is-active');
}

// Modal 창 닫기
function closeModal(e) {
  if (e) {
    e.preventDefault();
  }
  passwordInput.value = '';
  modal.classList.remove('is-active');
}

// 키보드로 Modal 창 닫기
function keyDownCloseModal(e) {
  // Esc 키
  if (e.keyCode === 27) {
    closeModal();
  }
}
