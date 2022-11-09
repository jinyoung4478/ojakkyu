import {
  renderClientSideComponent,
  addCommas,
} from '../utils/useful-functions.js';

// 요소(element), input 혹은 상수
const checkUserOrder = document.querySelector('#checkUserOrder');
const cancelOrder = document.querySelector('#submitButton');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  // 컴포넌트 렌더링
  renderClientSideComponent();
  // 해당 주문 정보 불러오기
  orderData();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  cancelOrder.addEventListener('click', deleteProductData);
}

// 주문내용 화면출력
async function orderData() {
  try {
    const res = await fetch(`/api/product`);
    const data = await res.json();

    console.log(data);

    checkUserOrder.innerHTML = data
      .map((tem) => {
        const date = tem.date;
        const title = tem.productTitle;
        const price = tem.price;
        const state = tem.state;

        return `
                    <ul class="orderList">
                        <li>${date}</li>
                        <li>${title} / ${price}</li>
                        <li>${state}</li>
                        <li><button class="submitBtn" id="submitButton">주문취소</button></li>
                    </ul>
            `;
      })
      .join('');
  } catch (err) {
    console.log(err);
  }
}

// 주문건별 삭제
async function deleteProductData(e) {
  try {
    e.preventDefault();
    e.remove();
  } catch (err) {
    console.log(err);
  }
}
