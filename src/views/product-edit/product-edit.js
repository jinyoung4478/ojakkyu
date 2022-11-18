import * as Api from '/utils/api.js';
import { renderClientSideComponent } from '/utils/useful-functions.js';

// admin 유저 판별
checkAdminUser();

renderClientSideComponent();

const productUrl = window.location.pathname.split('/');
const productId = productUrl[productUrl.length - 2];

// 요소(element), input 혹은 상수
const productImageInput = document.querySelector('#productImage');
const productIdInput = document.querySelector('#productId');
const productNameInput = document.querySelector('#productName');
const productTitleInput = document.querySelector('#productTitle');
const descriptionInput = document.querySelector('#description');
const priceInput = document.querySelector('#price');
const stoneTypeInput = document.querySelector('#stoneType');
const categoryInput = document.querySelector('#category');
const editButton = document.querySelector('#editButton');
const deleteButton = document.querySelector('#deleteButton');

// 기존 정보를 불러와서 입력란에 선 기입
async function writeOriginalData() {
  const product = await Api.get('/api/product/productDetail', productId);
  const productName = product.productName;
  const productTitle = product.productTitle;
  const description = product.description;
  const price = product.price;
  const stoneType = product.stoneType;
  const category = product.category;
  const likes = product.likes;
  const availability = product.availability;
  const productImage = product.image;

  productImageInput.value = productImage;
  productIdInput.value = productId;
  productNameInput.value = productName;
  productTitleInput.value = productTitle;
  descriptionInput.value = description;
  priceInput.value = price;
  stoneTypeInput.value = stoneType;
  categoryInput.value = category;
  likesInput.value = likes;
  //availabilityInput.value = availability;
}
writeOriginalData();

async function checkAdminUser() {
  // 로그인 여부 확인
  const token = sessionStorage.getItem('token');
  if (!token) {
    const path = window.location.pathname;
    const search = window.location.search;
    // 로그인 후 다시 지금 페이지로 자동으로 돌아가도록 하기 위한 준비작업
    window.location.replace(`/login?previouspage=${path + search}`);
  }
  try {
    // 로그인 상태일 경우 어드민 여부 확인
    const { role } = await Api.get('/api/users/myInfo');
    if (role === 'admin-user') {
      return;
    }
  } catch (err) {
    alert(`Error: ${err}`);
  }
  window.location.replace('/');
}

// 제품 수정
async function handleEdit(e) {
  e.preventDefault();

  const image = productImageInput.value;
  const editproductId = productIdInput.value;
  const editproductName = productNameInput.value;
  const productTitle = productTitleInput.value;
  const description = descriptionInput.value;
  const price = priceInput.value;
  const stoneType = stoneTypeInput.value;
  const category = categoryInput.value;
  const likes = likesInput.value;

  // 상품 수정 API 요청
  try {
    const data = {
      image,
      editproductId,
      editproductName,
      productTitle,
      description,
      price,
      stoneType,
      category,
      likes,
      availability: true,
    };
    console.log(productId);
    await Api.put('/api/product/productDetail', `${productId}`, data);

    alert(`정상적으로 상품이 수정되었습니다.`);

    // 수정된 페이지로이동
    window.location.href = `/product/${editproductId}`;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

//상품 삭제하기
async function handleDelete(e) {
  e.preventDefault();

  //상품을 삭제하시겠습니까???
  try {
    const delConfirm = confirm('상품을 삭제하시겠습니까?');
    if (delConfirm) {
      await Api.delete('/api/product/productDetail', `${productId}`, {
        productId,
      });
      // 홈페이지로 이동
      window.location.href = `/`;
      alert('삭제되었습니다.');
    }
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

editButton.addEventListener('click', handleEdit);
deleteButton.addEventListener('click', handleDelete);
