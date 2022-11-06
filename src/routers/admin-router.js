import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { userService } from "../services/user-service";
import { orderService } from "../services/order-service";

const adminRouter = Router();

// 전체 유저 목록을 가져옴(배열 형태임)
// 관리자 전용
adminRouter.get("/users", async (req, res, next) => {
  try {
    // 전체 사용자 목록을 얻은
    const users = await userService.getUsers();
    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// 관리자 정보 조회
adminRouter.get("/:adminId", async (req, res, next) => {
  try {
    const { adminId } = req.params;
    const adminData = await userService.getUser(adminId);
    res.status(200).json(adminData);
  } catch (error) {
    next(error);
  }
});

// 관리자 정보 수정
adminRouter.put(
  "/:adminId",
  loginRequired,
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

    const adminId = req.params.adminId;

    const { fullName, password, address, phoneNumber, role, currentPassword } = req.body;

    if (!currentPassword) {
        throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
    }

    const adminInfoRequired = { adminId, currentPassword };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
        ...(fullName && { fullName }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        ...(role && { role }),
    };

    // 관리자 정보 업데이트
    const updatedAdminInfo = await userService.setUser(
        adminInfoRequired,
        toUpdate
    );

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(updatedAdminInfo);
    } catch (error) {
        next(error);
    }
  }
);

// 관리자 정보 삭제
adminRouter.delete("/:adminId", async (req, res, next) => {
  try {
      if (is.emptyObject(req.body)) {
          throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
          );
      }

      const { adminId } = req.params;
      const { currentPassword } = req.body;
      if (!currentPassword) {
          throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
      }
      const adminInfoRequired = { adminId, currentPassword };
      const deletedAdminInfo = await userService.deleteUser(adminInfoRequired);
      // 관리자 정보 삭제 성공
      if (deletedAdminInfo) {
          res.status(200).json({ result: "success" });
      }
  } catch (error) {
      next(error);
  }
});

// 주문 목록 조회
// 관리자 전용
adminRouter.get("/orders", async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// 주문 취소
// !!작성중!!
adminRouter.delete("orders/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const userId = await orderService.deleteOrder(orderId);
    
  } catch (error) {
    next(error);
  }
});

export { adminRouter };