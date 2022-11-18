import * as Api from '../utils/api.js';
import {
  blockIfLogin,
  validateEmail,
  validatePhoneNumber,
  renderClientSideComponent,
  formatPhoneNumber,
} from '../utils/useful-functions.js';

// 로그인 상태에 접근 차단
blockIfLogin();

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const postalCodeInput = document.querySelector('#postalCodeInput');
const searchAddressButton = document.querySelector('#searchAddressButton');
const addressInput = document.querySelector('#addressInput');
const addressDetailInput = document.querySelector('#addressDetailInput');
const submitButton = document.querySelector('#submitButton');
const phonNumberInput = document.querySelector('#phonNumberInput');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  renderClientSideComponent();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  searchAddressButton.addEventListener('click', searchAddress);
  submitButton.addEventListener('click', handleSubmit);
  phonNumberInput.addEventListener('input', handlePhoneNumberInput);
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

// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();

  const email = emailInput.value;
  const fullName = fullNameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = addressInput.value;
  const address2 = addressDetailInput.value;
  const phoneNumber = phonNumberInput.value;

  // 잘 입력했는지 확인
  const isEmailValid = validateEmail(email);
  const isFullNameValid = fullName.length >= 2;
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;
  const isPhoneNumberValid = validatePhoneNumber(phoneNumber);

  if (!email) {
    return alert('이메일 입력은 필수입니다.');
  }
  if (!isEmailValid) {
    return alert('이메일 형식이 맞지 않습니다.');
  }
  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }
  if (!isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
  }
  if (!postalCode && !address1) {
    return alert('주소를 입력해주세요');
  }
  if (!address2) {
    return alert('상세 주소를 입력해주세요');
  }
  if (!isPhoneNumberValid) {
    return alert('전화번호 형식이 맞지 않습니다.');
  }

  // 회원가입 api 요청
  try {
    const data = {
      email,
      fullName,
      password,
      phoneNumber,
    };
    data.address = {
      postalCode,
      address1,
      address2,
    };

    await Api.post('/api/users', data);

    // 회원가입 성공
    alert(`정상적으로 회원가입되었습니다.`);

    // 자동 로그인
    await handleLogin({ email, password });

    // 메인 페이지로 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 폰 번호 포맷 자동 수정
function handlePhoneNumberInput(e) {
  phonNumberInput.value = formatPhoneNumber(this.value);
}

// 회원가입 성공 시 자동 로그인 기능
async function handleLogin(data) {
  const result = await Api.post('/api/users/login', data);
  const token = result.token;

  // jwt 토큰 저장
  sessionStorage.setItem('token', token);
}
