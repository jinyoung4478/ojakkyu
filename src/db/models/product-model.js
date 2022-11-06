import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("Product", ProductSchema);


export class ProductModel {

    async findAll() {
        const products = await Product.find({})
        console.log("findAll를 사용했습니다.")
        return products;
    }

    async findById(product_id) {
        const product = await Product.findOne({ product_id: product_id })
        console.log("findById를 사용했습니다.")
        return product;
    }

    async findByName(product_name) {
        const product = await Product.findOne({ product_name: product_name })
        return product;
    }

    async findByCategoty(category) {
        const products = await Product.find({ accessory_type: category })
        return products;
    }

    async create(productInfo) {
        const product = await Product.create(productInfo);
        console.log("model")
        return product;
    }

    async update({ product_id, updateContent }) {
        const findProduct = { product_id: product_id };
        const option = { returnOriginal: false };
        const updatedProduct = await Product.findOneAndUpdate(findProduct, updateContent, option)
        return updatedProduct
    }

    async delete(product_id) {
        Product.findOneAndDelete(product_id)
        return
    }
}

const productModel = new ProductModel();

export { productModel };
