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
      userId, 
      status, 
      totalPrice, 
      productList,
    } = orderInfo;

    const newOrderInfo = { 
      userId, 
      status, 
      totalPrice, 
      productList,
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

  // user_id로 사용자 별 주문 내역 조회
  async getFindByUserId(userId) {
    const orders = await this.orderModel.findByUserId(userId);
    return orders;
  }

  // order_id로 주문 상세 조회
  async getFindByOrderId(orderId) {
    const order = await this.orderModel.findByOrderId(orderId);
    return order;
  }

  // 주문 상태 변경
  async setOrderStatus(orderId, status) {
    const order = await this.orderModel.update(orderId, status);

    return order;
  }

  // 주문 내역 삭제
  async deleteOrder(orderId) {
    const deletedOrder = await this.orderModel.deleteById(orderId);
    return deletedOrder;
  }

}

const orderService = new OrderService(orderModel);

export { orderService };
