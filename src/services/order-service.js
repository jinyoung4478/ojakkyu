import { orderModel } from "../db/models/order-model";

import bcrypt from "bcrypt";

class OrderService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 주문 변경
  async addOrder(orderInfo) {
    // 객체 destructuring
    const { 
        user_id, 
        status, 
        total_price, 
        product_list,
    } = orderInfo;

    const newOrderInfo = { 
        user_id, 
        status, 
        total_price, 
        product_list,
    };

    // db에 저장
    const createdNewOrder = await this.orderModel.create(newOrderInfo);

    return createdNewOrder;
  }

  // 모든 주문 내역 보기(모든 사용자)
  async findAllOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  // 모든 주문 내역 보기(단일 사용자)
  async findOrders(userId) {
    const orders = await this.orderModel.findAllForOneUser(userId);
    return orders;
  }

  // orderId로 사용자 찾기
  async findUser(orderId) {
    const order = await this.orderModel.findById(orderId);
    const userId = order.userId;
    return userId;
  }
  // 주문 내역 삭제
  async deleteUserOrder(orderId) {
    const deletedOrder = await this.orderModel.deleteById(orderId);
    return deletedOrder;
  }

}

const orderService = new OrderService(orderModel);

export { orderService };
