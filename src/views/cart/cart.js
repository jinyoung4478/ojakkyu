import * as Api from "../utils/api.js";
import { randomId } from "../utils/useful-functions.js";


// [221103]작성. 상위요소 추후 수정예정
console.log('Hello Cart!');

// 요소(element), input 혹은 상수
const COUNT_PRODUCT = document.getElementById('countAllItem');
const BTN_ALL_REMOVE = document.getElementById('btnAllRemove');
const FORM_PERCHASING = document.getElementById('purchasing');
const IMG_PREVIEW = document.getElementById('itemPreview');
const TITLE_ITEM = document.getElementById('txtId');
const SUBTITLE_ITEM = document.getElementById('txtSubtitle');
const PRICE_ITEM = document.getElementById('pricePerItem');
const INPUT_COUNT_ITEM = document.getElementById('countItem');
const BTN_DEL_ITEM = document.getElementById('btnDeleteItem');
const PRICCE_TOTAL = document.getElementById('priceTotal');
const BTN_PERCHASE = document.getElementById('btnPurchase');
const BTN_MOVO_ITEMLIST = document.getElementById('btnMoveToItemList');


// [221103]작성. 하위요소 추후 수정예정













// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertTextToLanding();
  insertTextToGreeting();
}


// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  landingDiv.addEventListener("click", alertLandingText);
  greetingDiv.addEventListener("click", alertGreetingText);
}




async function getDataFromApi() {
  // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
  const data = await Api.get("/api/user/data");
  const random = randomId();

  console.log({ data });
  console.log({ random });
}
