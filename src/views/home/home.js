

<<<<<<< HEAD
import cors from "cors";
import express from "express";
import { viewsRouter, userRouter } from "./routers";
import { errorHandler } from "./middlewares";

const app = express();

app.use(viewsRouter);
=======
const product = document.querySelector(".product");

async function getData() {
  try {
    const res = await fetch("./product.json");
    const data = await res.json();
    const value = data.Product;

    value.forEach((tem) => {
      product.innerHTML += `<li>
          <img src=${tem.url}>
          <p>${tem.id}</p>
          <p>${tem.productTitle}</p>
          <p>${tem.subTitle}</p>
          <p>${tem.productPrice}</p>
        </li>`;
    });

  } catch (err) {
    console.log(err);
  }
}

async function creatProduct(){
  await getData()
}

creatProduct();

window.addEventListener('load', function() {

  let allElements = document.getElementsByTagName('*');
  Array.prototype.forEach.call(allElements, function(el) {
      let includePath = el.dataset.includePath;
      if (includePath) {
          let xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                  el.outerHTML = this.responseText;
              }else if(this.status == 404){
              }
          };
          xhttp.open('GET', includePath, true);
          xhttp.send();
      }
  });

});
>>>>>>> dev
