// import * as Api from "../../utils/api.js";
import { renderClientSideComponent } from "../../../utils/useful-functions.js";


const products = document.querySelector("#product");
const categoryUrl = window.location.pathname.split('/');
const categoryType = categoryUrl[categoryUrl.length - 2];
console.log(categoryUrl)


async function drawCategoryList() {
    try {

        // const data = Api.get(`/api/product/category`, categoryType)
        const res = await fetch(`/api/product/category/${categoryType}`);
        const data = await res.json();
        console.log(data)

        // let res;

        // // 제품리스트를 카테고리로 불러올지, 전체를 불러올지 로직을 여기서 구현했습니다.
        // if (categoryType == "All/") {
        //     console.log("모든 리스트를 불러옵니다..")
        //     res = await fetch(`/api/product`);
        // } else {
        //     res = await fetch(`/api/product/category/${categoryType}`);
        // }

        // const data = await res.json();
        // console.log("data", data)
        // data.forEach((tem) => {
        //     console.log(`제품 id : ${tem.productId}`)
        //     products.innerHTML += `<li class="productEvent">
        //             <a href="http://localhost:3000/product/${tem.productId}">
        //             <img class="productEvent" src="${tem.image[0]}">
        //             <p>${tem.accessoryType}</p>
        //             <p>${tem.description}</p>
        //             <p>${tem.price}</p>
        //             <p>${tem.productName}</p>
        //             <p>${tem.productTitle}</p>
        //             <p>${tem.stoneType}</p>
        //             </a>
        //         </li>`;
        // });


    } catch (err) {
        console.log(err);
    }
}
renderClientSideComponent()
drawCategoryList()