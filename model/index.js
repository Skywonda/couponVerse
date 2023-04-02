const Product = require('./product');
const Cart = require('./cart')
const Coupon = require('./coupon')

// Products belongsTo Category
Product.belongsTo(Cart, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL'
});

Cart.hasMany(Product, {
  as: 'product'
})

module.exports = {
  Product,
  Cart,
  Coupon
};