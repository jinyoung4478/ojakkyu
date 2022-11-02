import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema.js";

const Product = model("users", ProductSchema);


export class ItemModel {

    async findAll() {
        const products = await Product.find({})
        return products
    }

    async findById(product_id) {
        const product = await Product.findOne({ product_id: product_id })
        return product
    }

    async findByCategoty(category) {
        const products = await Product.findOne({ category: category })
        return products
    }

    async create(productInfo) {
        const product = await Product.create(productInfo);
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

const ProductModel = new Product();

export { ProductModel };
