import { Router } from "express";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { productService } from "../services";

const productRouter = Router();

// 현재 url 경로 : api/product/..

//모든 상품조회

//카테고리별 상품 조회
productRouter.get("/category/:category_id", async (req, res, next) => {
    try {
        const category = req.params.category_id;

        const products = await productService.getProductsByCategory(category)
        res.status(200).json(products)
    }
    catch (error) {
        next(error)
    }
})
//상품 상세조회
productRouter.get("/:product_id", async (req, res, next) => {
    try {
        const { product_id } = req.params
        console.log(product_id)
        const product = await productService.getProduct(product_id)
        res.status(200).json(product);
    }
    catch (error) {

    }
})

productRouter.get("/", async (req, res, next) => {
    try {
        const products = await productService.getProductsAll()
        res.status(200).json(products)
    }
    catch (error) {
        next(error)
    }
})

//상품 등록
productRouter.post("/", async (req, res, next) => {
    try {
        console.log("router")
        const { product_id, product_name, product_title, description, price, stone_type, accessory_type, availability, likes } = req.body
        const product = await productService.addProduct({ product_id, product_name, product_title, description, price, stone_type, accessory_type, availability, likes })

        res.status(201).json(product)
    }
    catch (error) {
        next(error);
    }
})

//상품 수정
productRouter.put("/:product_id", async (req, res, next) => {
    try {
        const product_id = req.params.product_id
        const { product_name, product_title, description, price, stone_type, accessory_type, availability, likes } = req.body
        const toUpdate = {
            ...(product_name && { product_name }),
            ...(product_title && { product_title }),
            ...(description && { description }),
            ...(price && { price }),
            ...(stone_type && { stone_type }),
            ...(accessory_type && { accessory_type }),
            ...(availability && { availability }),
            ...(likes && { likes })
        }
        const product = await productService.editProduct(product_id, toUpdate)
        res.status(200).json(product)
    }
    catch (error) {
        next(error);
    }
})
//상품 삭제
productRouter.delete("/:product_id", async (req, res, next) => {
    try {
        const productId = req.params.product_id
        await productService.deleteProduct(productId)
    }
    catch (error) {
        next(error);
    }
})




//장바구니로 상품정보 전달
productRouter.post("/", async (req, res, next) => {

})

export { productRouter }
