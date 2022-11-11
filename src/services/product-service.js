import { ProductModel, productModel } from '../db';

class ProductService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(productModel) {
    this.productModel = productModel;
  }

  // 상품등록
  async addProduct(productInfo) {
    // 객체 destructuring
    const { productId, productName } = productInfo;
    console.log('service');

    //제품 명 중복 확인
    const existedId = await this.productModel.findById(productId);
    const existedName = await this.productModel.findByName(productName);
    if (existedId) {
      throw new Error(' 입력한 상품 ID 가 이미 존재합니다.');
    }
    if (existedName) {
      throw new Error('입력한 상품 이름이 이미 존재합니다.');
    }
    //아닐 경우 db에 저장
    const createdNewProduct = await this.productModel.create(productInfo);
    return createdNewProduct;
  }

  async getProductsAll() {
    const products = await this.productModel.findAll();
    if (!products) {
      throw new Error('전체 상품리스트를 불러올 수 없습니다.');
    }
    return products;
  }

  async getProductsByStonetype(stoneType, category, page) {
    console.log('eeeee', stoneType);
    const products = await this.productModel.findByStonetype(
      stoneType,
      category,
      page,
    );
    if (!products) {
      throw new Error('전체 상품리스트를 불러올 수 없습니다.');
    }
    return products;
  }

  async getProductsNewArrival() {
    const products = await this.productModel.findByNewArrival();
    if (!products) {
      throw new Error('신규 상품리스트를 불러올 수 없습니다.');
    }
    return products;
  }

  async getProduct(productInfo) {
    const product = await this.productModel.findById(productInfo);
    if (!product) {
      throw new Error(
        '등록된 상품과 일치하는 제품이 없습니다. 관리자에게 문의하세요.',
      );
    }
    return product;
  }

  // 값이 없을 때  걸러내는 로직  필요함
  async editProduct(productId, productInfo) {
    const { editproductId, editproductName } = productInfo;
    if (productId !== editproductId) {
      const existedId = await this.productModel.findByExistedId(editproductId)
      if (existedId) {
        throw new Error(' 입력한 상품 ID 가 이미 존재합니다.');
      }
    }
    if ((await this.productModel.findById(productId)).productName !== editproductName) {
      const existedName = await this.productModel.findByExistedName(editproductName);
      if (existedName) {
        throw new Error('입력한 상품 명이 이미 존재합니다.');
      }
    }

    // 중복된 거 없으면 수정
    const product = await this.productModel.update({
      productId,
      updateContent: {
        productId: editproductId,
        productName: editproductName,
        ...productInfo,
      },
    });
    return product;
  }

  async deleteProduct(productInfo) {
    const deletedPrdocut = await this.productModel.delete(productInfo);
    if (!deletedPrdocut) {
      throw new Error('상품 삭제에 실패했습니다');
    }
    return deletedPrdocut;
  }

  async getProductsByCategory(category, page) {
    const products = await this.productModel.findByCategory(category, page);
    if (!products) {
      throw new Error(
        '카테고리별 상품을 불러올 수 없습니다. 관리자에게 문의하세요.',
      );
    }
    return products;
  }
}

const productService = new ProductService(productModel);

export { productService };
