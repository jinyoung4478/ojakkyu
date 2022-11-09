import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("Product", ProductSchema);


export class ProductModel {

    async findAll() {
        const products = await Product.find({})
        console.log("findAll를 사용했습니다.")
        return products;
    }

    async findById(productId) {
        const product = await Product.findOne({ productId: productId })
        console.log("findById를 사용했습니다.")
        return product;
    }

    async findByExistedId(productId) {
        const product = await Product.find({ productId: productId })
        const existed = false;
        if (product.length > 1) {
            existed = true;
        }
        console.log("findById를 사용했습니다.")
        return existed;
    }

    async findByExistedName(productName) {
        const product = await Product.find({ productName: productName })
        let existed = false;
        if (product.length > 1) {
            existed = true;
        }
        console.log("findById를 사용했습니다.")
        return existed;
    }

    async findByName(productName) {
        const product = await Product.findOne({ productName: productName })
        return product;
    }

    async findByCategoty(category) {
        const products = await Product.find({ category: category })
        return products;
    }

    async create(productInfo) {
        const product = await Product.create(productInfo);
        console.log("model")
        return product;
    }

    async update({ productId, updateContent }) {
        const findProduct = { productId: productId };
        const option = { returnOriginal: false };
        const updatedProduct = await Product.findOneAndUpdate(findProduct, updateContent, option)
        return updatedProduct
    }

    async delete(productId) {
        return Product.findOneAndDelete(productId)

    }
}

const productModel = new ProductModel();

export { productModel };
