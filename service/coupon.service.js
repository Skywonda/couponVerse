const { BadRequestError, NotFoundError } = require("../error/error");
const { Coupon } = require("../model");

class CouponService {
  static generateCouponCode() {
    const randomNum = Math.floor(Math.random() * 100000000);
    const couponCode = randomNum.toString().padStart(8, "0");
    return couponCode;
  }
  static async addCoupon({
    discount_amount,
    discount_type,
    rule_type,
    rule_value,
  }) {
    const couponCode = this.generateCouponCode();
    const product = await Coupon.create({
      code: couponCode,
      discount_amount,
      discount_type,
      rule_type,
      rule_value,
    });
    if (!product) throw new BadRequestError("Can not create product!");
    return product;
  }

  static calculateDiscount(discount_type, value, amount) {
    switch (discount_type) {
      case "FIXED":
        return amount - value;

      case "PERCENT":
        const percentage = value / 100;
        const discount = percentage * amount;
        return amount - discount;

      case "MIXED":
        const fixed = amount - value;
        const percent = amount - (value / 100) * amount;
        return percent < fixed ? percent : fixed;
      default:
        throw new BadRequestError("invalid discount type!");
    }
  }

  static async getCouponDiscount(couponCode, items = []) {
    const coupon = await Coupon.findOne({ where: { code: couponCode } });
    if (!coupon) throw new NotFoundError("This coupon code does not exist!");

    if (!coupon.active) throw new BadRequestError("This coupon been used!");

    let totalAmount = 0;
    for (const each of items) {
      totalAmount += each.price * each.quantity;
    }
    console.log(totalAmount);

    if (coupon.rule_type === "ITEM") {
      if (items.length < coupon.rule_value)
        throw new BadRequestError(
          `Total cart quanity must be up to ${coupon.rule_value}`
        );
      const discountPrice = this.calculateDiscount(
        coupon.discount_type,
        coupon.discount_amount,
        totalAmount
      );
      return {
        cartTotalPrice: totalAmount,
        discountPrice,
        discountAmount: totalAmount - discountPrice,
        discount_type: coupon.discount_type,
        value: coupon.discount_amount,
      };
    }
    if (coupon.rule_type === "PRICE") {
      if (totalAmount < coupon.rule_value)
        throw new BadRequestError(
          `Total cart amount must be up to ${coupon.discount_amount}`
        );
      const discountPrice = this.calculateDiscount(
        coupon.discount_type,
        coupon.discount_amount,
        totalAmount
      );
      return {
        cartTotalPrice: totalAmount,
        discountPrice,
        discountAmount: totalAmount - discountPrice,
        discount_type: coupon.discount_type,
        value: coupon.discount_amount,
      };
    }
  }

  static async getAllCoupon(where = null) {
    return await Coupon.findAll({ where });
  }
}

module.exports = CouponService;
