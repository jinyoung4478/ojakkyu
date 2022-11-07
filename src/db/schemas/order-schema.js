import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
        type: String,
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
          receiverName: String,
          receiverPhoneNumber: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

export { OrderSchema };
