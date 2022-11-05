import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
//import { loginRequired } from "../middlewares";
import { userService } from "../services/user-service";
import { orderService } from "../services/order-service";
import { productService } from "../services/product-service";

import { model } from "mongoose";
import { OrderSchema } from "../db/schemas/order-schema";

const User = model("users", OrderSchema);

const orderRouter = Router();

// 전체 주문 내역 보기
orderRouter.get("/", async (req, res, next) => {
  try {
    const orders = await orderService.findAllOrders();

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// 주문 내역 상태 변경(상품 준비중, 상품 배송중, 배송 완료)
orderRouter.post("/:orderId", async (req, res, next) => {
  try {
        // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
    throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
    );
    }
  } catch (error) {
    next(error);
}
});

export { orderRouter };