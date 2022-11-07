// import * as Api from "../utils/api.js";

async function drawCategory(){
    const gnbContents = document.querySelector(".gnbContents");

    const res = await fetch("/api/product");
    const data = await res.json();
    const categoryType = data.map(e => e.accessoryType);

    gnbContents.insertAdjacentHTML(
        'afterbegin',
        `
            <li>ABOUT US</li>
            <li>팔찌</li>
            <li>반지</li>
            <li>목걸이</li>
            <li>내 탄생석은?</li>
        `
    )

    const gnbLiContents = document.querySelectorAll(".gnbContents li");
    function moveCategory(){
        Array.prototype.forEach.call(gnbLiContents, function(e){
            e.addEventListener('click', function(){
                if(e.innerText === "팔찌"){
                    const typeId = categoryType.find(e => e === "ring");
                    location.href = `/product/category/${typeId}`
                }

                if(e.innerText === "반지"){
                    const typeId = categoryType.find(e => e === "bracelet");
                    location.href = `/product/category/${typeId}`
                }

                if(e.innerText === "목걸이"){
                    const typeId = categoryType.find(e => e === "neckless");
                    location.href = `/product/category/${typeId}`
                }
            })
            
        })
    }
    moveCategory()
}




drawCategory();


