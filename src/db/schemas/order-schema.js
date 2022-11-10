import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
    summaryTitle: {
      type: String,
    },
    quantity: {
      type: Number,
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
          receiverName: String,
          receiverPhoneNumber: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
    },
    status: {
      type: String,
      default: "상품 준비중",
    },
    initial: {
      type: String,
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

export { OrderSchema };
