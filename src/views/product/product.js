
const products = document.querySelector("#product");
const category = location.pathname.split('product/category/')[1]

async function findAndViewProduct() {
    try {
        console.log("제품데이터를 불러옵니다..." + category)
        let res;

        // 제품리스트를 카테고리로 불러올지, 전체를 불러올지 로직을 여기서 구현했습니다.
        if (category == "All/") {
            console.log("모든 리스트를 불러옵니다..")
            res = await fetch(`/api/product`);
        } else {
            res = await fetch(`/api/product/category/${category}`);
        }

        const data = await res.json();
        console.log(data)
        data.forEach((tem) => {
            console.log(`${tem.product_id}`)
            products.innerHTML += `<li class="productEvent">
                    <a href="http://localhost:3000/product/${tem.product_id}">
                    <img class="productEvent" src="${tem.image[0]}">
                    <p>${tem.accessory_type}</p>
                    <p>${tem.description}</p>
                    <p>${tem.price}</p>
                    <p data-id="${tem.product_id}">${tem.product_id}</p>
                    <p>${tem.product_name}</p>
                    <p>${tem.product_title}</p>
                    <p>${tem.stone_type}</p>
                    </a>
                </li>`;
        });


    } catch (err) {
        console.log(err);
    }
}

findAndViewProduct()
