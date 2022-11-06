import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(user_id) {
    const user = await User.findOne({ _id: user_id });
    return user;
  }

  async create(user_info) {
    const createdNewUser = await User.create(user_info);
    return createdNewUser;
  }

  // 비밀번호 숨김
  async findAll() {
    const users = await User.find({}, "-password");
    return users;
  }

  async update({ user_id, update }) {
    const filter = { _id: user_id };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  // 함수 추가
  async deleteById(user_id) {
    const deletedUser = await User.findOneAndDelete({ _id: user_id});
    return deletedUser;
  }

  // async updateOrder({ userId, orderId }) {
  //   const updatedOrder = await User.updateOne(
  //     { _id: userId },
  //     { $push: { orderList: orderId } },
  //   );
  //   return updatedOrder;
  // }

  // async deleteOrder({ userId, orderId }) {
  //   const deletedOrder = await User.updateOne(
  //     { _id: userId },
  //     { $pull: { orderList: orderId } },
  //   );
  //   return deletedOrder;
  // }
}

const userModel = new UserModel();

export { userModel };
