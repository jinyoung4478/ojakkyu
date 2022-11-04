import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
  // orderId로 주문 찾기
  async findById(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }
  // order 생성
  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  // 단일 사용자 주문 내역 보기
  async findByUserId(orderInfo) {
    const order = await Order.find({ user_id: orderInfo.user_id })
        //.populate("user_id")
        //.populate("product_list");
    return order;
  }

  // 모든 사용자 주문 내역 보기(관리자)
  async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  // 주문 상태(상품 준비중, 배송중, 배송완료) 변경
  async statusUpdate(orderId) {
    const order = await Order.findOne({ orderId });
    const status = [];
    return order;
  }

  // 주문 삭제
  async deleteById(orderId) {
    const deletedOrder = await Order.findOneAndDelete({ _id: orderId});
    return deletedOrder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
