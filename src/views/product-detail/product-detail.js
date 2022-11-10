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

let data;

// 페이지 렌더링
renderElements();
addAllEvents();

function renderElements() {
  renderClientSideComponent();
  drawDetail();

  // admin 계정일 경우 상품 수정 버튼 렌더링
  //renderAdminComponents();
}

function addAllEvents() {
  purchaseButton.addEventListener('click', handlePurchase);
  moveCart.addEventListener('click', addCart)

  // 관리자 전용
  editProduct.addEventListener('click', handleEditProduct);
}

async function drawDetail() {

  try {
    data = await Api.get('/api/product', productId);
    const { image, description, price, productName, productTitle, stoneType } = data;
    console.log(data)
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

    // 상품 수정하기 버튼 클릭 시 어떤 아이템인지 인지할 수 있게 하는 설정
    editProduct.setAttribute('data-id', `${productId}`);


  } catch (err) {
    console.log(err);
  }
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

  // 이니셜 입력 체크
  if(initial === "" || initial.length < 3) {
    alert("이니셜을 입력해주세요. 최소 3글자를 입력해야 합니다.");
    return;
  }

  // 중복 제품 걸러줌
  baskets.filter((e) => {
    if (e.id === data.productId) isTrue = true;
  });

  if (isTrue) {
    alert('이미 장바구니에 담긴 제품입니다.');
    return;
  } else {
    alert('제품을 성공적으로 담았습니다.');
    baskets.push(JSON.parse(cartObj));
    sessionStorage.setItem('cart', JSON.stringify(baskets));
    location.href = '/cart';
  }
  baskets.push(JSON.parse(cartObj));
  sessionStorage.setItem('cart', JSON.stringify(baskets));
  alert('제품을 성공적으로 담았습니다.');
  location.href = '/cart';
}

function handleEditProduct(e) {
  const pareLi = e.target;
  location.href = `/product/edit/${pareLi.dataset.id}`;
}
