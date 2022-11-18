import { Router } from "express";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { productService } from "../services";

const productRouter = Router();

// 현재 url 경로 : api/product/..

//모든 상품조회
productRouter.get("/allProducts", async (req, res, next) => {
    try {
        console.log("get all router 실행");
        const products = await productService.getProductsAll()
        res.status(200).json(products)
    }
    catch (error) {
        next(error)
    }
})

//신규 상품조회
productRouter.get("/newProducts", async (req, res, next) => {
    try {
        console.log("get newProduct router 실행")
        const products = await productService.getProductsNewArrival()
        res.status(200).json(products)
    }
    catch (error) {
        next(error)
    }
})

//카테고리별 상품 조회
productRouter.get("/category/:categoryId/all", async (req, res, next) => {
    try {
        const category = req.params.categoryId;
        const page = (req.query.page.split('/'))[0];
        console.log("router page", page)

        const { totalPage, products }
            = await productService.getProductsByCategory(category, page)
        res.status(200).json({ totalPage, products })
    }
    catch (error) {
        next(error)
    }
})

//탄생석별 조회
productRouter.get("/category/:categoryId/:stoneType", async (req, res, next) => {
    try {
        const category = req.params.categoryId;
        const stoneType = req.params.stoneType;
        const page = (req.query.page.split('/'))[0];
        const { totalPage, products }
            = await productService.getProductsByStonetype(stoneType, category, page)
        res.status(200).json({ totalPage, products })
    }
    catch (error) {
        next(error)
    }
})

//상품 상세조회
productRouter.get("/productDetail/:productId", async (req, res, next) => {
    try {
        const { productId } = req.params
        console.log(productId)
        const product = await productService.getProduct(productId)
        res.status(200).json(product);
    }
    catch (error) {
        next(error)
    }
})


//상품 등록
productRouter.post("/productDetail", async (req, res, next) => {
    try {
        console.log("router")
        const {
            image,
            productId,
            productName,
            productTitle,
            description,
            price,
            stoneType,
            category,
            availability,
            likes,
        } = req.body;
        const product = await productService.addProduct({
            image,
            productId,
            productName,
            productTitle,
            description,
            price,
            stoneType,
            category,
            availability,
            likes,
        });

        res.status(201).json(product)
    }
    catch (error) {
        next(error);
    }
})

//상품 수정
productRouter.put("/productDetail/:productId", async (req, res, next) => {
    try {
        const productId = req.params.productId

        const {
            image,
            editproductId,
            editproductName,
            productTitle,
            description,
            price,
            stoneType,
            category,
            availability,
            likes, } = req.body

        const toUpdate = {
            ...(image && { image }),
            ...(editproductId && { editproductId }),
            ...(editproductName && { editproductName }),
            ...(productTitle && { productTitle }),
            ...(description && { description }),
            ...(price && { price }),
            ...(stoneType && { stoneType }),
            ...(category && { category }),
            ...(availability && { availability }),
            ...(likes && { likes })
        }
        const product = await productService.editProduct(productId, toUpdate)
        res.status(200).json(product)
    }
    catch (error) {
        next(error);
    }
})
//상품 삭제
productRouter.delete("/productDetail/:productId", async (req, res, next) => {
    try {
        const productId = req.params.productId
        await productService.deleteProduct(productId)
        res.status(200).json(productId)
    }
    catch (error) {
        next(error);
    }
})




//장바구니로 상품정보 전달
productRouter.post("/", async (req, res, next) => {

})

export { productRouter }
