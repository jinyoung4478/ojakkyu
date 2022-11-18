import * as Api from '/utils/api.js';
import {
  renderClientSideComponent,
  addCommas,
} from '/utils/useful-functions.js';

const productWrapper = document.querySelector('#productWrapper');
const pagelist = document.querySelector('#pagelist');

const categoryUrl = window.location.pathname.split('/');
const categoryType =
  categoryUrl[categoryUrl.findIndex((a) => a == 'category') + 1];
const pageUrl = window.location.search;
const page = Number(pageUrl.split('?page=')[1] || 1);

const categoryToKorean = {
  bracelet: '팔찌',
  ring: '반지',
  necklace: '목걸이',
};
let totalPage;
let products;

let nowStone = 'all';

// 페이지 렌더링
renderElements();
// 이벤트 바인딩
addAllEvents();

function renderElements() {
  // 컴포넌트 렌더링
  renderClientSideComponent();
  // 카테고리 페이지 타이틀 렌더링
  renderTitle();
  // 카테고리에 해당하는 상품 리스트 렌더링
  drawCategoryProducts(page);
}

// 카테고리 페이지 타이틀 렌더링
function renderTitle() {
  if (nowStone === 'all') {
    category.innerText = categoryToKorean[categoryType];
  } else {
    category.innerHTML = `${categoryToKorean[categoryType]} - <span>${nowStone}</span>`;
  }
}

// 카테고리에 해당하는 상품 리스트 렌더링
async function drawCategoryProducts(page) {
  try {
    let result;
    if (nowStone === 'all') {
      result = await Api.get(
        `/api/product/category/${categoryType}/all/?page=${page}`,
      );
    } else {
      // 탄생석별 API 요청
      result = await Api.get(
        `/api/product/category/${categoryType}/${nowStone}?page=${page}?`,
      );
    }

    // 총 페이지 수
    totalPage = result.totalPage;
    // 현재 페이지 제품 데이터
    products = result.products;

    productWrapper.innerHTML = products.reduce(
      (acc, item) =>
        acc +
        `
        <li class="categoryList">
            <h2><img src=${item.image} class="productEvent" data-id="${
          item.productId
        }"></h2>
            <dl>
                  <dt><strong>${item.productTitle}</strong></dt>
                  <dd><span>${item.description}</span></dd>
                  <dd><small>${addCommas(item.price)}</small></dd>
            </dl>
        </li>
        `,
      '',
    );
    pagelist.innerHTML = '';
    // 페이지 리스트 렌더링
    for (let i = 1; i <= totalPage; i++) {
      if (i == page) {
        pagelist.innerHTML += `<li><a href="/product/category/${categoryType}?page=${i}" style="font-weight:bold">${i}</a></li>`;
      } else {
        pagelist.innerHTML += `<li><a href="/product/category/${categoryType}?page=${i}">${i}</a></li>`;
      }
    }
  } catch (err) {
    alert(`Error: ${err}`);
    location.href = '/';
  }
}

// 모든 이벤트 핸들러 바인딩
function addAllEvents() {
  birthStoneUl.addEventListener('mousedown', handleBirthStoneFilter);
  productWrapper.addEventListener('click', handleToProductDetail);
}

// 탄생석별로 모아보기 버튼 이벤트 동작
function handleBirthStoneFilter(e) {
  const target = e.target.id;
  // 빈칸 클릭 방지
  if (target === '' || target === 'birthStoneUl') {
    return;
  }
  // 선택된 탄생석으로 타이틀 변경
  nowStone = target;
  // 타이틀 리렌더링
  renderTitle();
  // 제품 리스트 리렌더링
  drawCategoryProducts(page);
}

// 제품 클릭 시 해당 상세 페이지로 이동
function handleToProductDetail(e) {
  const pareImg = e.target.closest('.productEvent');
  if (pareImg) {
    location.href = `/product/${pareImg.dataset.id}`;
  }
}
