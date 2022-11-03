import * as Api from "../utils/api.js";
import { randomId } from "../utils/useful-functions.js";

// [221103]작성. 상위요소 추후 수정예정
console.log("Hello Cart!");

// 요소(element), input 혹은 상수
// __OUTPUT
/**장바구니 상품 총 수량 - sum:INPUT_COUNT_ITEM(상품개수)
 * @readonly
 */
const COUNT_PRODUCT = document.getElementById("countAllItem");
/**제품사진 */
const IMG_PREVIEW = document.getElementById("itemPreview");
/**제품명 */
const TITLE_ITEM = document.getElementById("txtId");
/**제품설명 */
const SUBTITLE_ITEM = document.getElementById("txtSubtitle");
/**제품단가
 * @readonly
 */
const PRICE_ITEM = document.getElementById("pricePerItem");
/**장바구니 총액
 * @readonly
 */
const PRICCE_TOTAL = document.getElementById("priceTotal");

// __INPUT
/**반복될 장바구니리스트 양식
 * @todo .insertAdjacentHTML('beforeend',() =>)
*/
const FORM_PERCHASING = document.getElementById("purchasing");
/**상품개수; 총량, 총액에 사용되는 값;
 * @todo UPDATE기능추가 */
const INPUT_COUNT_ITEM = document.getElementById("countItem");

// __BUTTONS
/**장바구니 전체 비우는 버튼입니다 */
const BTN_ALL_REMOVE = document.getElementById("btnAllRemove");
/**개별 상품 삭제 버튼입니다. */
const BTN_DEL_ITEM = document.getElementById("btnDeleteItem");
/**구매하기 버튼 */
const BTN_PERCHASE = document.getElementById("btnPurchase");
/**상품목록으로 돌아가는 버튼 */
const BTN_MOVO_ITEMLIST = document.getElementById("btnMoveToItemList");

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
