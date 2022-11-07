import { orderModel } from "../db/models/order-model";

class OrderService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 주문 변경
  async addOrder(orderInfo) {
    // db에 저장
    const createdNewOrder = await this.orderModel.create(orderInfo);
    console.log("orderInfo:", orderInfo);
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

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!order) {
      throw new Error("해당 id의 주문을 찾을 수 없습니다.");
    }

    return order;
  }

  // 주문 변경
  async setOrder(orderId, toUpdate) {
    const order = await this.orderModel.update({
      orderId,
      update: toUpdate,
    });

    return order;
  }

  // 주문 내역 삭제
  async deleteOrder(orderId) {
    const { deletedOrder } = await this.orderModel.deleteById(orderId);
    
    // 삭제 실패시 에러 메시지 반환
    if (deletedOrder === 0) {
      throw new Error(`${orderId} 주문 삭제에 실패했습니다.`);
    }
    
    return { result: "success" };
  }

}

const orderService = new OrderService(orderModel);

export { orderService };
