const { BadRequestError, NotFoundError } = require("../error/error");
const { Cart, Product } = require("../model");

class CartService {
  static async addToCart({ product, quantity }) {
    const dbProduct = await Product.findByPk(product);
    if (!dbProduct) throw new NotFoundError("Product with this id not found!");

    const cartExist = await Cart.findOne({ where: { product: dbProduct.id } })
    if (cartExist) throw new BadRequestError('Item already exist in cart!')

    return await Cart.create({ product, quantity, price: dbProduct.price });
  }

  static async getCarts(where = null) {
    return await Cart.findAll({ where });
  }

  static async removeItemFromCart(cartId) {
    const cart = Cart.findOne({ id: cartId });
    if (!cart)
      throw new NotFoundError(`Item with id ${cartId} not found in cart!`);
  }
}

module.exports = CartService;
