import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    user_id: {
        type: String,
        ref: "users",
        required: true,
    },
    status: {
        type: String,
        enum: ["상품 준비중", "상품 배송중", "배송완료"],
        default: "상품 준비중",
    },
    total_price: {
        type: Number,
    },
    product_list: [
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
