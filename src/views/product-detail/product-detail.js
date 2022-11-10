import * as Api from '/utils/api.js';
import { renderClientSideComponent } from '/utils/useful-functions.js';

// DOM
const productImg = document.querySelector('.productImg');
const productDetail = document.querySelector('.productDetail');

const editProduct = document.querySelector('.editProduct');
const purchaseButton = document.querySelector('#purchaseButton');
const adCartButton = document.querySelector('#adCartButton');
const productUrl = window.location.pathname.split('/');
const productId = productUrl[productUrl.length - 2];
const moveCart = document.querySelector('.moveCart');

let data;

// 페이지 렌더링
renderElements();
addAllEvents();

function renderElements() {
  renderClientSideComponent();
  drawDetail();
}

function addAllEvents() {
  purchaseButton.addEventListener('click', handlePurchase);
  moveCart.addEventListener('click', addCart);
  //   adCartButton.addEventListener('click', handleProductToCart);

  // 관리자 전용
  editProduct.addEventListener('click', handleEditProduct);
}

async function drawDetail() {
  try {
    data = await Api.get('/api/product', productId);
    const { image, description, price, productName, productTitle, stoneType } =
      data;

    productImg.innerHTML = `
                <figure>
                    <img src="${image}"/>
                </figure>
            `;

    productDetail.innerHTML = ` 
                <ul class="productDesc">
                    <li><h1>${productTitle}</h1></li>
                    <li>${productName}</li>
                    <li>판매가 <span>${price}</span></li>
                    <li>${description}</li>
                    <li>
                        <select>
                            <label>-[필수]옵션을 선택해 주세요-</label>
                            <option>원석: ${stoneType}</option>
                        </select>
                    </li>
                    <li><strong>최소주문수량 1개 이상</strong></li>
                    <li>
                        <table>
                            <thead>
                                <tr>
                                    <th>상품명</th>
                                    <th>상품수</th>
                                    <th>가격</th>
                                </tr>
                            </thead>
                        </table>
                    </li>
                    <li>
                        <p>Total : ${price}<span>(${0}개)</span></p>
                    </li>
                </ul>
            `;

    // 상품 수정하기 버튼 클릭 시 어떤 아이템인지 인지할 수 있게 하는 설정
    editProduct.setAttribute('data-id', `${productId}`);

    // 제품 데이터 로컬스토리지에 담기
    localStorage.setItem('product', JSON.stringify(data));

    // [ 관리자 권한 ] 제품 수정하기 버튼클릭 시 제품 수정페이지로 이동
  } catch (err) {
    console.log(err);
  }
}

// 해당 제품 바로 구매하기
function handlePurchase(e) {
  e.preventDefault();
  const orderData = [
    {
      id: data.productId,
      name: data.productName,
      quantity: 1,
      price: data.price,
    },
  ];
  // 현재 상품으로 session Storage의 order 덮어쓰기
  sessionStorage.setItem('order', JSON.stringify(orderData));
  location.href = `/order`;
}

function addCart() {
  let isTrue = false;

  const cartObj = JSON.stringify({
    description: data.description,
    title: data.productTitle,
    image: data.image,
    id: data.productId,
    name: data.productName,
    price: data.price,
    quantity: 1,
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
    alert('제품을 성공적으로 담았습니다.');
    baskets.push(JSON.parse(cartObj));
    sessionStorage.setItem('cart', JSON.stringify(baskets));
    location.href = '/cart';
  }
}

function handleEditProduct(e) {
  const pareLi = e.target;
  location.href = `/product/edit/${pareLi.dataset.id}`;
}
