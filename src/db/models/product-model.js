import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema.js";

const Product = model("users", ProductSchema);


export class ItemModel {
    async findAll() {
        const products = await Product.find({});
        return products;
    }

    async findById(product_id) {
        const product = await Product.findOne({ product_id });
        return product;
    }

    async findByName(product_name) {
        const product = await Product.findOne({ product_name: product_name });
        return product;
    }

    async create(productInfo) {
        const createdNewProduct = await Product.create(productInfo);
        return createdNewProduct;
    }

    async update({ product_id, update }) {
        const filter = { product_id: product_id };
        const option = { returnOriginal: false };

        const updatedProduct = await Product.findOneAndUpdate(filter, update, option);
        return updatedProduct;
    }

}

const ProductModel = new Product();

export { ProductModel };
