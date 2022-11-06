import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
        type: String,
        ref: "users",
        required: true,
    },
    status: {
        type: String,
        enum: ["상품 준비중", "상품 배송중", "배송완료"],
        default: "상품 준비중",
    },
    totalPrice: {
        type: Number,
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
    productList: [
        {
            id: String,
            name: String,
            quantity: Number,
        }
    ],
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

export { OrderSchema };
