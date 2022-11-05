import * as Api from "../../utils/api.js";
// import { clientSideInclude } from "../../utils/useful-functions.js";

// clientSideInclude();

const product_url = window.location.pathname.split('/');
const productId = product_url[2];

const searchParams = new URLSearchParams(location.search);

// console.log(window.location.search,"ASDasdasdas")

// const urlParams = new URL(location.href).searchParams;

// const name = urlParams.get('product_id');

// console.log(name,"asdasd")

window.onload = async function(){
    try{
        const data = await fetch(`/product/:${productId}`)
        const res = data.json();
        console.log(res,data)


    }catch(err){
        console.log(err)
    }
}