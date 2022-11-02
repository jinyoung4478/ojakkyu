import { Schema } from "mongoose";

const ProductSchema = new Schema(
    {
        product_id: {
            type: String,
            required: true,
        },

        //상품 이름
        product_name: {
            type: String,
            required: true,
        },

        //상품 제목
        product_title: {
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
        stone_type: {
            type: String,
            required: true,
        },

        //악세사리 종류
        accessory_type: {
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
    })

export { ProductSchema };
