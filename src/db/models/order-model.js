import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
  // order_id로 주문 찾기
  async findById(order_id) {
    const order = await Order.findOne({ _id: order_id });
    return order;
  }
  // order 생성
  async create(order_info) {
    const createdNewOrder = await Order.create(order_info);
    return createdNewOrder;
  }

  // user_id로 사용자 별 주문 내역 보기
  async findByUserId(user_id) {
    const order = await Order.find({ user_id: user_id })
        //.populate("user_id")
        //.populate("product_list");
    return order;
  }

  // order_id로 주문 상세 보기
  async findByOrderId(order_id) {
    const order = await Order.findOne({ _id: order_id });
    
    return order;
  }

  // 모든 사용자 주문 내역 보기(관리자)
  async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  // 주문 상태(상품 준비중, 배송중, 배송완료) 변경
  async update(order_id, status) {
    const filter = { _id: order_id };
    const update = { status: status};
    const option = { returnOriginal: false };

    const order = await Order.findOneAndUpdate(filter, update, option);
    return order;
  }

  // 주문 삭제
  async deleteById(order_id) {
    const deletedOrder = await Order.findOneAndDelete({ _id: order_id});
    return deletedOrder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
