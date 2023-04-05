const Product = require('./product');
const Cart = require('./cart')
const Coupon = require('./coupon')

// Products belongsTo Category
Product.belongsTo(Cart, {
  foreignKey: 'product',
  onDelete: 'SET NULL'
});

Cart.hasMany(Product, {
  as: '_id'
})

module.exports = {
  Product,
  Cart,
  Coupon
};