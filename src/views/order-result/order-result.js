import * as Api from '/utils/api.js';
import {
  checkLogin,
  renderClientSideComponent,
} from '/utils/useful-functions.js';

// 요소(element), input 혹은 상수
const checkUserOrder = document.querySelector('#checkUserOrder');

// 페이지 로드 시 실행, 삭제할 주문 id를 전역변수로 관리함
let orderIdToDelete;

checkLogin();
addAllElements();

// 요소 삽입 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  renderClientSideComponent();
}

// 주문 가져오기
const res = await fetch('/api/product');
const orders = await res.json();

for (const order of orders) {
  const { _id, date, productTitle, price, productName } = order;
  orderIdToDelete = _id;
  //const date = createdAt.split('T')[0];

  console.log('id', order);
  checkUserOrder.insertAdjacentHTML(
    'beforeend',
    `
      <ul class="orderList" id="order-${_id}">
      <li>${date}</li>
      <li>${productTitle} / ${price}</li>
      <li>${productName}</li>
      <li><button class="deleteButton" id="deleteButton-${_id}">주문취소</button></li>
      </ul>
      `,
  );
}

//전역변수에 해당 주문의 id 할당
const deleteButton = document.querySelector(`#deleteButton-${orderIdToDelete}`);
deleteButton.addEventListener('click', () => {
  Api.delete('/api/product', orderIdToDelete);

  // 삭제 성공
  alert('주문 정보가 삭제되었습니다.');

  // 삭제한 아이템 화면에서 지우기
  const deletedItem = document.querySelector(`#order-${orderIdToDelete}`);
  deletedItem.remove();

  // 전역변수 초기화
  orderIdToDelete = '';
});
