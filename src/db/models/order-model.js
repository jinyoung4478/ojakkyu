import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
  // orderId로 주문 찾기
  async findById(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }

  // orderId로 모든 주문 찾기
  async findAllById(orderId) {
    const order = await Order.find({ orderId });
    return order;
  }

  // productId로 모든 주문 찾기
  async findAllByProductId(productId) {
    const order = await Order.find({ productId });
    return order;
  }

  // userId로 모든 주문 찾기
  async findAllByUserId(userId) {
    const order = await Order.find({ userId });
    return order;
  }

  // order 생성
  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  // 모든 사용자 주문 내역 보기(관리자)
  async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  // 주문 변경
  async update({ orderId, update }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
    return updatedOrder;
  }

  // 주문 삭제
  async deleteById(orderId) {
    const deletedOrder = await Order.findOneAndDelete({ _id: orderId});
    return deletedOrder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
