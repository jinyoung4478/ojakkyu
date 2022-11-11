import * as Api from '/utils/api.js';
import { renderClientSideComponent } from '/utils/useful-functions.js';
renderClientSideComponent();

// 요소(element), input 혹은 상수
const productImageInput = document.querySelector('#productImage');
const productIdInput = document.querySelector('#productId');
const productNameInput = document.querySelector('#productName');
const productTitleInput = document.querySelector('#productTitle');
const descriptionInput = document.querySelector('#description');
const priceInput = document.querySelector('#price');
const stoneTypeInput = document.querySelector('#stoneType');
const categoryInput = document.querySelector('#category');
const submitButton = document.querySelector('#submitButton');
// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();

  const productImage = productImageInput.value;
  const productId = productIdInput.value;
  const productName = productNameInput.value;
  const productTitle = productTitleInput.value;
  const description = descriptionInput.value;
  const price = priceInput.value;
  const stoneType = stoneTypeInput.value;
  const category = categoryInput.value;


  // 회원가입 api 요청
  try {
    const data = {
      productId,
      productName,
      productTitle,
      description,
      price,
      stoneType,
      category,
      "image": productImage,
      "availability": true,
      "likes": 0
    };
    await Api.post('/api/product/productDetail', data);

    alert(`정상적으로 상품이 등록되었습니다.`);

    // 메인 페이지 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
submitButton.addEventListener('click', handleSubmit);
