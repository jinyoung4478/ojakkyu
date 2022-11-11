import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('Product', ProductSchema);

export class ProductModel {
  async findAll() {
    const products = await Product.find({});
    console.log('findAll를 사용했습니다.');
    return products;
  }

  // async findByNewArrival() {
  //     const products = await Product.aggregate([
  //         { $sort: { createdAt: -1 } },
  //         { $limit: 8 }
  //     ])
  //     return products
  // }

  async findByStonetype(stoneType, category, page) {
    const product = await Product.find({ category });
    const filteredProducts = product.filter((a) => a.stoneType == stoneType);

    const [total, products] = await Promise.all([
      filteredProducts.length,
      Product.find({ category, stoneType })
        .sort({ createdAt: -1 })
        .skip(12 * (page - 1))
        .limit(12),
    ]);

    const totalPage = Math.ceil(total / 12);
    return { totalPage, products };
  }

  async findByNewArrival() {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(8);
    return products;
  }

  async findById(productId) {
    const product = await Product.findOne({ productId: productId });
    console.log('findById를 사용했습니다.');
    return product;
  }

  async findByExistedId(productId) {
    const product = await Product.find({ productId: productId });
    let existed = false;
    console.log(product.length)
    if (product.length > 0) {
      existed = true;
    }
    console.log('findById를 사용했습니다.');
    return existed;
  }

  async findByExistedName(productName) {
    const product = await Product.find({ productName: productName });
    let existed = false;
    if (product.length > 0) {
      existed = true;
    }
    console.log('findById를 사용했습니다.');
    return existed;
  }

  async findByName(productName) {
    const product = await Product.findOne({ productName: productName });
    return product;
  }

  async findByCategory(category, page) {
    const [total, products] = await Promise.all([
      Product.countDocuments({ category }),
      Product.find({ category })
        .sort({ createdAt: -1 })
        .skip(12 * (page - 1))
        .limit(12),
    ]);
    console.log('model page', page);
    const totalPage = Math.ceil(total / 12);
    // const products = await Product.find({ category: category })
    //     .sort({ productId: 1 })
    return { totalPage, products };
  }

  async create(productInfo) {
    const product = await Product.create(productInfo);
    console.log('model');
    return product;
  }

  async update({ productId, updateContent }) {
    console.log(`${productId}를 업데이트 합니다.`);
    console.dir(updateContent);
    const findProduct = { productId: productId };
    const option = { returnOriginal: false };
    const updatedProduct = await Product.findOneAndUpdate(
      findProduct,
      updateContent,
      option,
    );
    return updatedProduct;
  }

  async delete(productId) {
    return Product.findOneAndDelete({ productId });
  }
}

const productModel = new ProductModel();

export { productModel };
