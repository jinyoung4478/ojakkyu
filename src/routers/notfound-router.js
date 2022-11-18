import express from 'express';
import is from "@sindresorhus/is";
import path from 'path';

// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴

const notFoundRouter = express();

// 로그인 api (아래는 /login 이지만, 실제로는 /api/users/login 로 요청해야 함.)
notFoundRouter.use("/", serveStatic())

function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/error`);
  const option = { index: `error.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { notFoundRouter };
