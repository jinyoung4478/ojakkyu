import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { userService } from "../services";

const adminRouter = Router();

// 주문 목록 조회
adminRouter.get("/orders", async (req, res, next) => {
  try {
    const orders = await orderService.findAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// 주문 취소
adminRouter.delete("orders/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const userId = await orderService.findUser(orderId);
    
  }
})

export { adminRouter };