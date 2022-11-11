import { Router } from 'express';
import is from '@sindresorhus/is';

import { loginRequired, adminRequired } from '../middlewares';

import { orderService } from '../services/order-service';

const orderRouter = Router();

// 전체 주문 내역 보기, /api/orders/all
// adminRequired
orderRouter.get('/all', adminRequired, async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// userId에 해당하는 주문 내역 보기, /api/orders/:userId
// loginRequired
orderRouter.get('/:userId', loginRequired, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const orders = await orderService.getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// productId에 해당하는 주문 내역 보기, /api/orders/:productId
// loginRequired
orderRouter.get('/:productId', loginRequired, async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const orders = await orderService.getOrdersByProductId(productId);

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// (사용자) 주문 추가, /api/orders
// loginRequired
orderRouter.post('/', loginRequired, async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const orderId = req.body.orderId;
    const productId = req.body.productId;
    const totalPrice = req.body.totalPrice;

    const newOrder = await orderService.addOrder({
      orderId,
      productId,
      totalPrice,
    });

    res.status(200).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// (주문/결제) 주문 추가, /api/orders/payment
// loginRequired
orderRouter.post('/payment', async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const userId = req.body.currentUserId;
    const summaryTitle = req.body.summaryTitle;
    const status = req.body.status;
    const totalPrice = req.body.totalPrice;
    const address = req.body.address;
    console.log(totalPrice);
    const newOrder = await orderService.addOrder({
      userId,
      summaryTitle,
      status,
      totalPrice,
      address,
    });

    res.status(200).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// (사용자) 주문 변경, /api/orders/:orderId
// adminRequired
orderRouter.patch('/:orderId', adminRequired, async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const orderId = req.params.orderId;
    const address = req.body.address;
    const status = req.body.status;

    const toUpdate = {
      ...(address && { address }),
      ...(status && { status }),
    };

    const updatedOrder = await orderService.setOrder(orderId, toUpdate);

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

// (주문/결제) 주문 변경, /api/orders/payment/:orderId
// loginRequired
orderRouter.patch(
  '/payment/:orderId',
  loginRequired,
  async (req, res, next) => {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }

      const orderId = req.params.orderId;
      const quantity = req.body.quantity;
      const totalPrice = req.body.totalPrice;
      const status = req.body.status;

      const toUpdate = {
        ...(quantity && { quantity }),
        ...(totalPrice && { totalPrice }),
        ...(status && { status }),
      };

      const updatedOrder = await orderService.setOrder(orderId, toUpdate);

      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  },
);

// 주문 삭제, /api/orders/:orderId
// loginRequired
orderRouter.delete('/:orderId', loginRequired, async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await orderService.deleteOrder(orderId);

    res.status(200).json(deletedOrder);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
