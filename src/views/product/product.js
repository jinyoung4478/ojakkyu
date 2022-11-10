import * as Api from '/utils/api.js';
import { renderClientSideComponent } from '/utils/useful-functions.js';

const productWrapper = document.querySelector('#productWrapper');
const category = document.querySelector('#category');
const birthStoneUl = document.querySelector('#birthStoneUl');
const categoryUrl = window.location.pathname.split('/');
const categoryType = categoryUrl[categoryUrl.length - 2];
const categoryToKorean = {
  bracelet: '팔찌',
  ring: '반지',
  necklace: '목걸이',
};
let productData;
let nowStone = 'all';

// 페이지 렌더링
renderElements();
// 이벤트 바인딩
addAllEvents();

function renderElements() {
  renderClientSideComponent();
  renderTitle();
  drawCategoryProducts();
}

function renderTitle() {
  if (nowStone === 'all') {
    category.innerText = categoryToKorean[categoryType];
  } else {
    category.innerText = `${categoryToKorean[categoryType]} - ${nowStone}`;
  }
}

async function drawCategoryProducts() {
  try {
    productData = await Api.get(`/api/product/category/${categoryType}`);
    productWrapper.innerHTML = productData.reduce(
      (acc, item) =>
        acc +
        `
        <li class="productEvent" data-id="${item.productId}">
            <img src=${item.image}>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <p>${item.productName}</p>
            <p>${item.productTitle}</p>
        </li>
        `,
      '',
    );
  } catch (err) {
    alert(`Error: ${err}`);
    location.href = '/';
  }
}

function addAllEvents() {
  birthStoneUl.addEventListener('mousedown', handleBirthStoneFilter);
  productWrapper.addEventListener('click', (e) => {
    const pareLi = e.target.closest('.productEvent');
    if (pareLi) {
      location.href = `/product/${pareLi.dataset.id}`;
    }
  });
}

function handleBirthStoneFilter(e) {
  const target = e.target.id;
  if (target === '') {
    return;
  }

  // 선택된 탄생석으로 타이틀 변경
  nowStone = target;
  renderTitle();

  // 상품 필터링
  productWrapper.innerHTML = productData.reduce((acc, item) => {
    if (item.stoneType === target || target === 'all') {
      return (
        acc +
        `
        <li class="productEvent" data-id="${item.productId}">
            <img src=${item.image}>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <p>${item.productName}</p>
            <p>${item.productTitle}</p>
        </li>
        `
      );
    } else {
      return acc;
    }
  }, '');
}
