import { renderClientSideComponent } from '/utils/useful-functions.js';
import * as Api from '/utils/api.js';
renderClientSideComponent();

const product = document.querySelector('.product');

async function drawProduct() {
    const res = await Api.get('/api/product/allProducts');
    product.innerHTML = res
        .map((tem) => {
            const { price, productTitle, createdAt, category, productId } = tem;

            return `
            <ul style="display: flex; gap: 40px;" class="allProduct">
                <li>${createdAt}</li>
                <li>${category}</li>
                <li>${price}</li>
                <li>${productTitle}</li>
                <li cursor:pointer;">
                    <a href="/product/edit/${productId}" style="color: coral;">상품수정/삭제</a>
                </li>
            </ul>
        
        `;
        })
        .join(' ');
}

drawProduct();
