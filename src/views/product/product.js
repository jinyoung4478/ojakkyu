
const products = document.querySelector("#product");
const category = location.pathname.split('product/category/')[1]

async function drawCategoryList() {
    try {
        console.log("제품데이터를 불러옵니다..." + category)
        let res;

        // 제품리스트를 카테고리로 불러올지, 전체를 불러올지 로직을 여기서 구현했습니다.
        if (category == "All/") {
            console.log("모든 리스트를 불러옵니다..")
            res = await fetch(`/api/products`);
        } else {
            res = await fetch(`/api/products/category/${category}`);
        }

        const data = await res.json();
        console.log("data", data)
        data.forEach((tem) => {
            console.log(`제품 id : ${tem.productId}`)
            products.innerHTML += `<li class="productEvent">
                    <a href="http://localhost:3000/product/${tem.productId}">
                    <img class="productEvent" src="${tem.image[0]}">
                    <p>${tem.accessoryType}</p>
                    <p>${tem.description}</p>
                    <p>${tem.price}</p>
                    <p>${tem.productName}</p>
                    <p>${tem.productTitle}</p>
                    <p>${tem.stoneType}</p>
                    </a>
                </li>`;
        });


    } catch (err) {
        console.log(err);
    }
}

drawCategoryList()
