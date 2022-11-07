import * as Api from "../../utils/api.js";
import { clientSideInclude } from "../../utils/useful-functions.js";
const productImg = document.querySelector(".productImg");
const productDetail = document.querySelector(".productDetail");

const product_url = window.location.pathname.split('/');
const productId = product_url[product_url.length - 2];


async function start(){
    try{
        const data = await Api.get(`/api/products`, productId)
      
        const img = data.image
        const description = data.description;
        const price = data.price;
        const id = data.product_id;
        const name = data.product_name;
        const title = data.product_title;
        const type = data.stone_type;

        productImg.insertAdjacentHTML(
            'afterbegin',
            `
                <figure>
                    <img src="${img}"/>
                </figure>
            `
        )

        productDetail.insertAdjacentHTML(
            'afterbegin',
            `      
                <p>${description}</p>
                <li>${price}</li>
                <li>${id}</li>
                <li>${name}</li>
                <li>${title}</li>
                <li>${type}</li>
                

            `
        )
    
    }catch(err){
        console.log(err)
    }
}

async function createDetail(){
    await clientSideInclude();
    await start();
}

createDetail()
