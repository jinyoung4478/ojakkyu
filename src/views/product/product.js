import * as Api from "/utils/api.js";
import { renderClientSideComponent } from "/utils/useful-functions.js";


const product = document.querySelector(".product");
const categoryUrl = window.location.pathname.split('/');
const categoryType = categoryUrl[categoryUrl.length - 2];

async function drawCategoryList() {
    try {

        // const data = Api.get(`/api/product/category`, categoryType)
        const res = await fetch(`/api/product/category/${categoryType}`);
        const data = await res.json();
        console.log(data)

        data.forEach((e) => {
            const img = e.image;
            const price = e.price;
            const title = e.productTitle;
            const name = e.productName;
            const description = e.description;

            product.insertAdjacentHTML( 
                'afterbegin',
                `
                    <li class="productEvent">
                        <img src=${img}>
                        <p>${description}</p>
                        <p>${price}</p>
                        <p>${name}</p>
                        <p>${title}</p>
                    </li>
                    
                `)
        })
    
    } catch (err) {
        console.log(err);
    }
}

async function start(){
    await renderClientSideComponent();
    await drawCategoryList();
}

start();