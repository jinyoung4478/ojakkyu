import * as Api from '/utils/api.js';
import {
  renderClientSideComponent,
  addCommas,
} from '/utils/useful-functions.js';

// DOM
const productImg = document.querySelector('.productImg');
const productDetail = document.querySelector('#productDetail');
const productDesc = document.querySelector('#productDesc');
const editProduct = document.querySelector('.editProduct');
const purchaseButton = document.querySelector('#purchaseButton');
const adCartButton = document.querySelector('#adCartButton');
const productUrl = window.location.pathname.split('/');
const productId = productUrl[productUrl.length - 2];
const moveCart = document.querySelector('.moveCart');
const initialInput = document.querySelector('#initialInput');
const buttonWrapper = document.querySelector('#buttonWrapper');

let data;
let isAdmin = false;

// 페이지 렌더링 함수 바인딩
renderElements();
// 이벤트 함수 바인딩
addAllEvents();

async function renderElements() {
  // 헤더, 푸터 컴포넌트 렌더링
  renderClientSideComponent();
  // 상품 정보 렌더링
  drawDetail();

  // 접속 계정 확인
  await checkAdminUser();
  // admin 계정일 경우 어드민 UI 렌더링
  if (isAdmin) {
    await renderAdminComponents();
    // 관리자 전용
    buttonWrapper.addEventListener('click', handleEditProduct);
  }
}

async function drawDetail() {
  try {
    data = await Api.get('/api/product/productDetail', productId);
    const { image, description, price, productName, productTitle, stoneType } =
      data;
    console.log(data);

    productImg.innerHTML = `
                <figure>
                    <img src="${image}"/>
                </figure>
            `;

    const productDataElem = `
        <li><h1>${productTitle}</h1></li>
        <li>제품명 : ${productName}</li>
        <li>판매가: ${addCommas(price)}원</li>
        <li><label>제품 설명 : ${description}</label></li>
        <li>
          <label>원석: ${stoneType}</label>
        </li>
        
        <li>
            <p>Total : ${addCommas(price)}원</p>
        </li>
    `;
    productDesc.insertAdjacentHTML('afterbegin', productDataElem);
  } catch (err) {
    alert(err);
  }
}

// 관리자 계정 여부 확인
async function checkAdminUser() {
  // 로그인 여부 확인
  const token = sessionStorage.getItem('token');
  if (!token) {
    return;
  }
  try {
    // 로그인 상태일 경우 어드민 여부 확인
    const { role } = await Api.get('/api/users/myInfo');
    if (role === 'admin-user') {
      isAdmin = true;
    }
    return;
  } catch (err) {
    alert(`잘못된 토큰입니다. ${err}`);
  }
  return;
}

async function renderAdminComponents() {
  const adminEditButtonElem = `
  <button type="button" data-id="${productId}" id="editProductButton">
    상품수정
  </button>
  `;
  buttonWrapper.insertAdjacentHTML('beforeend', adminEditButtonElem);
}

function addAllEvents() {
  purchaseButton.addEventListener('click', handlePurchase);
  moveCart.addEventListener('click', addCart);
}

// 해당 제품 바로 구매하기
function handlePurchase(e) {
  e.preventDefault();
  const initial = initialInput.value;
  const orderData = [
    {
      id: data.productId,
      name: data.productName,
      quantity: 1,
      price: data.price,
      initial,
    },
  ];
  // 현재 상품으로 session Storage의 order 덮어쓰기
  sessionStorage.setItem('order', JSON.stringify(orderData));
  location.href = `/order`;
}

// 장바구니에 제품 추가
function addCart() {
  let isTrue = false;
  const initial = initialInput.value;

  const cartObj = JSON.stringify({
    _id: data._id,
    description: data.description,
    title: data.productTitle,
    image: data.image,
    id: data.productId,
    name: data.productName,
    price: data.price,
    quantity: 1,
    initial,
  });
  const baskets = JSON.parse(sessionStorage.getItem('cart')) || [];

  // 중복 제품 걸러줌
  baskets.filter((e) => {
    if (e.id === data.productId) isTrue = true;
  });

  if (isTrue) {
    alert('이미 장바구니에 담긴 제품입니다.');
    return;
  } else {
    // 이니셜 입력 체크
    if (initial === '') {
      if (
        window.confirm(
          '이니셜 문구가 입력되지 않았습니다. 계속 진행 하시겠습니까?',
        )
      )
        location.href = '/cart';
      else return;
    }
    alert('제품을 성공적으로 담았습니다.');
    baskets.push(JSON.parse(cartObj));
    sessionStorage.setItem('cart', JSON.stringify(baskets));
    location.href = '/cart';
  }
}

function handleEditProduct(e) {
  const pareLi = e.target.closest('#editProductButton');
  location.href = `/product/edit/${pareLi.dataset.id}`;
}
