import { orderModel } from "../db/models/order-model";

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

  // 전체 주문내역 조회
  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  // userId로 사용자 별 주문 내역 조회
  async getFindByUserId(userId) {
    const orders = await this.orderModel.findByUserId(userId);
    return orders;
  }

  // orderId로 주문 상세 조회
  async getFindByOrderId(orderId) {
    const order = await this.orderModel.findByOrderId(orderId);
    return order;
  }

  // orderId로 사용자 찾기
  async findUser(orderId) {
    const order = await this.orderModel.findById(orderId);
    const userId = order.userId;
    return userId;
  }

  // 주문 상태 변경
  async setOrderStatus(orderId, status) {
    const order = await this.orderModel.update(orderId, status);

    return order;
  }

  // 주문 내역 삭제
  async deleteUserOrder(orderId) {
    const deletedOrder = await this.orderModel.deleteById(orderId);
    return deletedOrder;
  }

}

const orderService = new OrderService(orderModel);

export { orderService };
