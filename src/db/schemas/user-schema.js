import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: false,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
    },
    role: {
      type: String,
      required: false,
      default: "basic-user",
    },
    // 주문내역
    order_list: {
      type: [String],
      required: false,
      default: [],
    }
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { UserSchema };
