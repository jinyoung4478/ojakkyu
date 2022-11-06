import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { userService } from "../services/user-service";
import { orderService } from "../services/order-service";
import { productService } from "../services/product-service";

import { model } from "mongoose";
import { OrderSchema } from "../db/schemas/order-schema";

const Order = model("orders", OrderSchema);

const orderRouter = Router();

// 전체 주문 내역 보기
orderRouter.get("/", async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// 주문 내역 상태 변경(상품 준비중, 상품 배송중, 배송 완료)
orderRouter.post("/:order_id/status", async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
        throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
        );
    }

    const order_id = req.params.order_id;
    const { status } = req.body;
    const updateStatus = await orderService.setOrderStatus(order_id, status);

    res.status(200).json(updateStatus);
  } catch (error) {
    next(error);
  }
});

// 주문 삭제
orderRouter.delete("/:orderId", loginRequired, async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    await orderService.deleteUserOrder(orderId);

    res.status(200).json("해당 주문이 취소되었습니다.");
  } catch (error) {
    next(error);
  }
});

export { orderRouter };