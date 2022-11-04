import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    user_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
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
