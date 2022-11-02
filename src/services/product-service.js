import { ProductModel } from "../db";


class ProductService {
    // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
    constructor(productModel) {
        this.productModel = productModel;
    }

    // 상품등록
    async addProduct(productInfo) {
        // 객체 destructuring
        const { } = productInfo;

        // 제품 명 중복 확인

        // 제품중복은 이제 아니므로, 회원가입을 진행함

        // db에 저장
        const createdNewProduct = await this.productModel.create(productInfo);

        return createdNewProduct;
    }

    async getProductsAll(productInfo) { }

    async getProduct(productInfo) { }

    async editProduct(productInfo) { }

    async deleteProduct(productInfo) { }

    async getProductsByCategory(productInfo) { }

}

const productService = new ProductService(ProductModel);

export { productService };
