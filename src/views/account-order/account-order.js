import * as Api from '/utils/api.js';
import {
  checkLogin,
  renderClientSideComponent,
} from '/utils/useful-functions.js';

// 로그인 여부 판별
checkLogin();

// 페이지 렌더링
renderElements();
addAllEvents();

const ordersContainer = document.querySelector('#ordersContainer');

function renderElements() {
  // 컴포넌트 렌더링
  renderClientSideComponent();
  // 주문 목록 렌더링
  renderOrderList();
}

function addAllEvents() {}

async function renderOrderList() {
  // 로그인된 유저 id 불러오기
  const { _id } = await Api.get('/api/users/myInfo');
  // 로그인된 유저의 주문 목록 불러오기
  const orderList = await Api.get('/api/orders', _id);
  orderList.forEach((item) => {
    // 각 항목 HTML 요소 추가
    const orderElem = `
    <div class="columns orders-item" id="order-${item._id}">
      <div class="column is-2">${item.createdAt.split('T')[0]}</div>
      <div class="column is-6 order-summary">${item.summaryTitle}</div>
      <div class="column is-2">${item.status}</div>
      <div class="column is-2">
        <button class="button" id="delete-${item._id}">주문 취소</button>
      </div>
    </div>
    `;
    ordersContainer.insertAdjacentHTML('beforeend', orderElem);
    // 주문취소 버튼 이벤트 등록
    const deleteButton = document.querySelector(`#delete-${item._id}`);
    deleteButton.addEventListener('click', handleCancelButton);
  });
}

// 주문 취소 클릭 시
function handleCancelButton(e) {
  e.preventDefault();
  if (!confirm('정말 삭제하시겠습니까?')) {
    return;
  }
  const orderId = e.target.id.split('-')[1];
  cancelOrder(orderId);
}

async function cancelOrder(id) {
  try {
    // id에 해당하는 order 삭제 요청
    await Api.delete('/api/orders', id);
    // 웹 페이지에서 제거
    document.querySelector(`#order-${id}`).remove();
  } catch (err) {
    alert(`Error: ${err}`);
  }
}
