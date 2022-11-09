import * as Api from '/utils/api.js';
import { renderClientSideComponent } from '/utils/useful-functions.js';


// DOM
const productImg = document.querySelector('.productImg');
const productDetail = document.querySelector('.productDetail');

const editProduct = document.querySelector('.editProduct');
const purchaseButton = document.querySelector('#purchaseButton');
const adCartButton = document.querySelector('#adCartButton');
const productUrl = window.location.pathname.split('/');
const productId = productUrl[productUrl.length - 2];
const moveCart = document.querySelector(".moveCart");


let data;


// 페이지 렌더링
renderElements();
addAllEvents();

function renderElements() {
  renderClientSideComponent();
  drawDetail();
}

function addAllEvents() {
  purchaseButton.addEventListener('click', handlePurchase);
  moveCart.addEventListener('click', addCart)
//   adCartButton.addEventListener('click', handleProductToCart);

  // 관리자 전용
  editProduct.addEventListener('click', handleEditProduct);
}

async function drawDetail() {
  try {

        data = await Api.get('/api/product', productId);
        const { image, description, price, productName, productTitle, stoneType} = data;

        productImg.innerHTML = `
                <figure>
                    <img src="${image}"/>
                </figure>
            `;

        productDetail.innerHTML = ` 
                <ul class="productDesc">
                    <li><h1>${productTitle}</h1></li>
                    <li>${productName}</li>
                    <li>판매가 <span>${price}</span></li>
                    <li>${description}</li>
                    <li>
                        <select>
                            <label>-[필수]옵션을 선택해 주세요-</label>
                            <option>원석: ${stoneType}</option>
                        </select>
                    </li>
                    <li><strong>최소주문수량 1개 이상</strong></li>
                    <li>
                        <table>
                            <thead>
                                <tr>
                                    <th>상품명</th>
                                    <th>상품수</th>
                                    <th>가격</th>
                                </tr>
                            </thead>
                        </table>
                    </li>
                    <li>
                        <p>Total : ${price}<span>(${0}개)</span></p>
                    </li>
                </ul>
            `;
            
  } catch (err) {
    console.log(err);
  }
}

function handlePurchase(e) {
    e.preventDefault();
    const orderData = JSON.stringify({
        product: [
        {
            id: data.productId,
            name: data.productName,
            quantity: 1,
            price: data.price,
        },
        ],
    });
        sessionStorage.setItem('order', orderData);
        location.href = `/order`;
    }

function handleProductToCart() {

    console.log(data,"asdasd")

    // 기존 장바구니 목록 데이터
    let cartData = [];
    // try{
    //     cartData = sessionStorage.getItem('cart');
    //     cartData = JSON.parse(cartData).product;
    //     console.log(cartData)
    // }catch(err){
    //     console.log(err)
    // }
    
    // data = 기존 데이터 + 새로운 데이터
    // let cartDataStr;

    //     if (cartData) {
    //         cartDataStr = JSON.stringify({
    //         product: [
    //             ...cartData,
    //             {
    //                 description: data.description,
    //                 title: data.productTitle,
    //                 image: data.image,
    //                 id: data.productId,
    //                 name: data.productName,
    //                 price: data.price,
    //                 quantity: 1,
    //             },
    //         ],
                // if(isTrue){
            //     alert("이미 장바구니에 담긴 제품입니다.");
            //     return;
            // }
    //     });
    //     }else{
    //         cartDataStr = JSON.stringify({
    //         product: [
    //             {
    //             description: data.description,
    //             title: data.productTitle,
    //             image: data.image,
    //             id: data.productId,
    //             name: data.productName,
    //             price: data.price,
    //             quantity: 1,
    //             },
    //         ],
    //     });   
    // }


    // sessionStorage.setItem('cart', cartDataStr);
    // alert("성공적으로 장바구니에 담겼습니다.")
    // location.href = '/cart';
    
}

function addCart(){ 
    let isTrue = false;

    const cartObj = JSON.stringify(
        {
            description: data.description,
            title: data.productTitle,
            image: data.image,
            id: data.productId,
            name: data.productName,
            price: data.price,
            quantity: 1, 
        }
    )
    const baskets = JSON.parse(sessionStorage.getItem("cart")) || [];


    // 중복 제품 걸러줌
        baskets.filter((e) => {
            if(e.id === data.productId) isTrue = true;
        });

        if(isTrue){
            alert("이미 장바구니에 담긴 제품입니다.");
            return;
        }else{
            alert("제품을 성공적으로 담았습니다.")
            baskets.push(JSON.parse(cartObj))
            sessionStorage.setItem("cart", JSON.stringify(baskets));
            location.href = '/cart'
        }
}

function handleEditProduct() {
    const pareLi = e.target;
    location.href = `/product/edit/${pareLi.dataset.id}`;
}
