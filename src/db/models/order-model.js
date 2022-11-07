import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
  // order_id로 주문 찾기
  async findById(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }
  // order 생성
  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  // user_id로 사용자 별 주문 내역 보기
  async findByUserId(userId) {
    const order = await Order.find({ userId });
        //.populate("user_id")
        //.populate("product_list");
    return order;
  }

  // order_id로 주문 상세 보기
  async findByOrderId(orderId) {
    const order = await Order.findOne({ _id: orderId });
    
    return order;
  }

  // 모든 사용자 주문 내역 보기(관리자)
  async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  // 주문 상태(상품 준비중, 배송중, 배송완료) 변경
  async update(orderId, update) {
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
