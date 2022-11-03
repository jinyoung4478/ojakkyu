import { ProductModel } from "../db";


class ProductService {
    // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
    constructor(productModel) {
        this.productModel = productModel;
    }

    // 상품등록
    async addProduct(productInfo) {
        // 객체 destructuring
        const { product_id, product_name } = productInfo;

        // 제품 명 중복 확인
        const existedId = await this.productModel.findById(product_id)
        const existedName = await this.productModel.findByName(product_name)
        if (existedId) {
            throw new Error(" 입력한 상품 ID 가 이미 존재합니다.")
        }
        if (existedName) {
            throw new Error("입력한 상품 명이 이미 존재합니다.")
        }
        // 아닐 경우 db에 저장
        const createdNewProduct = await this.productModel.create(productInfo);
        return createdNewProduct;
    }

    async getProductsAll() {
        const products = await this.productModel.findAll();
        if (!products) {
            throw new Error("전체 상품리스트를 불러올 수 없습니다.")
        }
        return products;
    }

    async getProduct(productInfo) {
        const product = await this.productModel.findById(productInfo)
        if (!product) {
            throw new Error("등록된 상품과 일치하는 제품이 없습니다. 관리자에게 문의하세요.")
        }
        return product
    }

    async editProduct(productId, productInfo) {
        const product = await this.productModel.update(productId, productInfo)
        return product
    }

    async deleteProduct(productInfo) {
        await this.productModel.delete(productInfo)
    }

    async getProductsByCategory(category) {
        const products = await this.productModel.findByCategoty(category)
        if (!products) {
            throw new Error("카테고리별 상품을 불러올 수 없습니다. 관리자에게 문의하세요.")
        }
        return products
    }

}

const productService = new ProductService(ProductModel);

export { productService };
