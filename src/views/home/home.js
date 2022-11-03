

const product = document.querySelector(".product");

async function getData() {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();
    // const value = data.Product;
    
    data.forEach((tem) => {
      product.innerHTML += `<li>
          <img src=${tem.image}>
          <p>${tem.accessory_type}</p>
          <p>${tem.description}</p>
          <p>${tem.price}</p>
          <p>${tem.product_id}</p>
          <p>${tem.product_name}</p>
          <p>${tem.product_title}</p>
          <p>${tem.stone_type}</p>
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
