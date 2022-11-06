import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares/login-required";
import { adminRequired } from "../middlewares/admin-required"
import { userService } from "../services/user-service";
import { orderService } from "../services/order-service";
import { productService } from "../services/product-service";

import { model } from "mongoose";
import { OrderSchema } from "../db/schemas/order-schema";

const Order = model("orders", OrderSchema);

const orderRouter = Router();

// 전체 주문 내역 보기
orderRouter.get("/", adminRequired, async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// user_id에 해당하는 주문 내역 보기
orderRouter.get("/:user_id", loginRequired, async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const order = await orderService.getFindByUserId(user_id);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

// order_id에 해당하는 주문 내역 보기
orderRouter.get("/:order_id", loginRequired, async (req, res, next) => {
  try {
    const order_id = req.params.order_id;
    const order = await orderService.getFindByOrderId(order_id);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

// 주문 추가
orderRouter.post("/addOrder", loginRequired, async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
        throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
        );
    }

    const { user_id, status, total_price, product_list } = req.body;
    const order_info = { user_id, status, total_price, product_list };
    const order = await orderService.addOrder(order_info);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

// 주문 내역 상태 변경(상품 준비중, 상품 배송중, 배송 완료)
// adminRequired 필요?
orderRouter.patch("/:order_id/status", adminRequired, async (req, res, next) => {
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
orderRouter.delete("/:order_id", loginRequired, async (req, res, next) => {
  try {
    const order_id = req.params.order_id;
    await orderService.deleteOrder(order_id);

    res.status(200).json("해당 주문이 취소되었습니다.");
  } catch (error) {
    next(error);
  }
});

export { orderRouter };