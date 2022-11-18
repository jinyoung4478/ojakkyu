// 문자열+숫자로 이루어진 랜덤 5글자 반환
export const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

// 이메일 형식인지 확인 (true 혹은 false 반환)
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

// 폰번호 형식 일치 여부 검증 기능 - 구현 예정
export const validatePhoneNumber = (phoneNumber) => {
  return String(phoneNumber).match(/^\d{3}-\d{3,4}-\d{4}$/);
};

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 13,000원, 2개 등의 문자열에서 쉼표, 글자 등 제외 후 숫자만 뺴냄
// 예시: 13,000원 -> 13000, 20,000개 -> 20000
export const convertToNumber = (string) => {
  return parseInt(string.replace(/(,|개|원)/g, ''));
};

// ms만큼 기다리게 함.
export const wait = (ms) => {
  return new Promise((r) => setTimeout(r, ms));
};

// 로그인 여부(토큰 존재 여부) 확인
export const checkLogin = () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    // 현재 페이지의 url 주소 추출하기
    const path = window.location.pathname;
    const search = window.location.search;
    // 로그인 후 다시 지금 페이지로 자동으로 돌아가도록 하기 위한 준비작업
    window.location.replace(`/login?previouspage=${path + search}`);
  }
};

// 관리자 여부 확인
export const checkAdmin = async () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    // 현재 페이지의 url 주소 추출하기
    const path = window.location.pathname;
    const search = window.location.search;
    // 로그인 후 다시 지금 페이지로 자동으로 돌아가도록 하기 위한 준비작업
    window.location.replace(`/login?previouspage=${path + search}`);
  }

  const res = await fetch('/api/admin/check', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { result } = await res.json();

  if (result === 'success') {
    window.document.body.style.display = 'block';
    return;
  } else {
    alert('관리자 전용 페이지입니다.');
    // 홈으로 리다이렉트
    window.location.replace('/');
  }
};

// 로그인 상태일 때에는 접근 불가한 페이지로 만듦. (회원가입 페이지 등)
export const blockIfLogin = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    alert('로그인 상태에서는 접근할 수 없는 페이지입니다.');
    window.location.replace('/');
  }
};

// 클라이언트 사이드 컴포넌트 렌더링
export const renderClientSideComponent = () => {
  
    const headerId = document.querySelector('#header');
    const footerId = document.querySelector('#footer');

    if (headerId) {
      const header = fetch('/components/header.html');
      header
        .then((res) => res.text())
        .then((text) => {
          document.querySelector('#header').innerHTML = text;
          let style = document.createElement("link");
          style.href = '/components/header.css';
          style.rel = 'stylesheet'
          document.head.appendChild(style);
          let script = document.createElement('script');
          script.type = 'module';
          script.src = '/components/header.js';
          document.body.appendChild(script);
        });
    }

    if (footerId) {
      const footer = fetch('/components/footer.html');
      footer
        .then((res) => res.text())
        .then((text) => {
          document.querySelector('#footer').innerHTML = text;
          let style = document.createElement("link");
          style.href = '/components/footer.css';
          style.rel = 'stylesheet'
          document.head.appendChild(style);
          let script = document.createElement('script');
          script.type = 'module';
          script.src = 'https://kit.fontawesome.com/9daa42bcef.js';
          document.body.appendChild(script);
        });
    }

};

// 폰 번호 형식 자동 포맷
export function formatPhoneNumber(phoneNumber) {
  const formattedPhoneNumber = phoneNumber
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/(\-{1,2})$/g, '');
  return formattedPhoneNumber;
}
