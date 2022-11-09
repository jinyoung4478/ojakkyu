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
renderClientSideComponent();

// 주문 가져오기
const res = await fetch('/api/product');
const orders = await res.json();

for (const order of orders) {
  const { _id, date, productTitle, price, productName } = order;
  orderIdToDelete = _id;
  //const date = createdAt.split('T')[0];

  console.log('id', _id);
  checkUserOrder.innerHTML += `
      <ul class="orderList" id="order-${_id}">
      <li>${date}</li>
      <li>${productTitle} / ${price}</li>
      <li>${productName}</li>
      <li><button class="deleteButton" id="deleteButton-${_id}">주문취소</button></li>
      </ul>
      `;
}

// 주문 삭제
checkUserOrder.onclick = async function (event) {
  if (event.target.className != 'deleteButton') return;

  alert('주문 정보가 삭제되었습니다.');
  let orderList = event.target.closest('.orderList');
  orderList.remove();
  await Api.delete('/api/product', orderIdToDelete);

  // 전역변수 초기화
  orderIdToDelete = '';
};
