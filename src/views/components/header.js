// import * as Api from "/utils/api.js";

async function drawCategory() {
  // login
  const utilContents = document.querySelector('.utilContents');
  const token = sessionStorage.getItem('token');

  // gnb
  const gnbContents = document.querySelector('.gnbContents');
  const res = await fetch('/api/product');
  const data = await res.json();
  const categoryType = data.map((e) => e.category);

  if (!token) {
    utilContents.innerHTML = `
            <li><a href="/login">로그인</a></li>
            <li><a href="/register">회원가입</a></li>
            <li><a href="/cart">장바구니</a></li>
        `;
  }

  if (token) {
    utilContents.innerHTML = `
            <li class="logout">로그아웃</li>
            <li><a href="/account">마이페이지</a></li>
            <li><a href="/cart">장바구니</a></li>
        `;

    // 로그아웃
    const logout = document.querySelector('.logout');
    logout.addEventListener('click', () => {
      sessionStorage.removeItem('token');
      location.href = '/';
    });
  }

  gnbContents.innerHTML = `
            <li><a href="/about-us">ABOUT US</a></li>
            <li>팔찌</li>
            <li>반지</li>
            <li>목걸이</li>
            <li><a href="/birthstone">내 탄생석은?</a></li>
        `;

  const gnbLiContents = document.querySelectorAll('.gnbContents li');
  function moveCategory() {
    Array.prototype.forEach.call(gnbLiContents, function (e) {
      e.addEventListener('click', function () {
        if (e.innerText === '팔찌') {
          const typeId = categoryType.find((e) => e === 'bracelet');
          location.href = `/product/category/${typeId}`;
        }

        if (e.innerText === '반지') {
          const typeId = categoryType.find((e) => e === 'ring');
          location.href = `/product/category/${typeId}`;
        }

        if (e.innerText === '목걸이') {
          const typeId = categoryType.find((e) => e === 'neckless');
          location.href = `/product/category/${typeId}`;
        }
      });
    });
  }
  moveCategory();
}

drawCategory();
