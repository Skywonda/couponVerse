const productData = require("./config/seed/product");
const couponData = require("./config/seed/coupon");
const { Product } = require("./model");
const CouponService = require("./service/coupon.service");

async function createProducts() {
  const product = await Product.bulkCreate(productData);
  return product;
}

async function createCoupon() {
  return couponData.map(async (each) => {
    await CouponService.addCoupon({
      discounts: each.discounts,
      rules: each.rules,
      code: each.code,
    });
  });
}

function command() {
  createProducts();
  createCoupon();
}

module.exports = command;
