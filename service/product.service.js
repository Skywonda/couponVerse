const { BadRequestError } = require("../error/error");
const { Product } = require("../model");

class ProductService {
  static async createProduct({ name, price }) {
    const product = await Product.create({ productName: name, price });
    if (!product) throw new BadRequestError("Can not create product!");
    return product;
  }

  static async getProducts(where = null) {
    const products = await Product.findAll({ where });
    return products;
  }
}

module.exports = ProductService;
