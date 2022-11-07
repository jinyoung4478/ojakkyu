import { Schema } from "mongoose";

const ProductSchema = new Schema(
    {
        productId: {
            type: String,
            required: true,
        },

        //상품 이름
        productName: {
            type: String,
            required: true,
        },

        //상품 제목
        productTitle: {
            type: String,
            required: false,
        },

        //상품 설명
        description: {
            type: String,
            required: false,
        },

        //가격
        price: {
            type: String,
            required: true,
        },

        //원석 종류
        stoneType: {
            type: String,
            required: true,
        },

        //악세사리 종류
        category: {
            type: String,
            required: true,
        },

        // 주문 가능여부
        availability: {
            type: Boolean,
            required: true
        },

        //좋아요 수
        likes: {
            type: Number,
            required: false,
        },

        // 상품 이미지
        image: ["link"],
    },
    {
        collection: "products",
        timestamps: true,
    }
);

export { ProductSchema };
