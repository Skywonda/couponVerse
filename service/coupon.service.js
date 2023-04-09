const { BadRequestError, NotFoundError } = require("../error/error");
const { Coupon, CouponDiscount, CouponRule } = require("../model");

class CouponService {
  static generateCouponCode() {
    const randomNum = Math.floor(Math.random() * 100000000);
    const couponCode = randomNum.toString().padStart(8, "0");
    return couponCode;
  }
  static async addCoupon({ discounts, rules, code }) {
    let couponCode = code;
    if (!couponCode) {
      couponCode = this.generateCouponCode();
    }
    const coupon = await Coupon.create({
      code: couponCode,
    });

    if (!coupon) throw new BadRequestError("Can not create product!");

    await Promise.all([
      rules.map(async (each) => {
        CouponRule.create({
          CouponId: coupon.id,
          rule_type: each.rule_type,
          rule_value: each.rule_value,
        });
      }),
      discounts.map(async (each) => {
        CouponDiscount.create({
          CouponId: coupon.id,
          discount_type: each.discount_type,
          discount_amount: each.discount_amount,
        });
      }),
    ]);

    return coupon;
  }

  static calculateDiscount(data = [], amount) {
    let totalAmount = amount;
    let discountAmount = 0;
    for (let each of data) {
      switch (each.discount_type) {
        case "FIXED":
          discountAmount += each.discount_amount;
          totalAmount -= each.discount_amount;
          break;

        case "PERCENT":
          const percentage = each.discount_amount / 100;
          const discount = percentage * amount;
          discountAmount += discount;
          totalAmount -= discount;
          break;

        case "MIXED":
          const fixed = totalAmount - each.discount_amount;
          const percent =
            totalAmount - (each.discount_amount / 100) * totalAmount;
          if (percent < fixed) {
            discountAmount += (each.discount_amount / 100) * totalAmount;
            totalAmount = percent;
          } else {
            discountAmount += each.discount_amount;
            totalAmount -= each.discount_amount;
          }
          break;
        default:
          throw new BadRequestError("Invalid discount type!");
      }
    }
    return {
      totalAmount: amount,
      discountPrice: totalAmount,
      discountAmount,
    };
  }

  static validateRules(rules, totalAmount, cartCount) {
    for (let each of rules) {
      if (each.rule_type === "ITEM") {
        if (cartCount < each.rule_value)
          throw new BadRequestError(
            `Total cart quanity must be up to ${each.rule_value}`
          );
      }
      if (each.rule_type === "PRICE") {
        if (totalAmount < each.rule_value)
          throw new BadRequestError(
            `Total cart amount must be up to $${each.rule_value}`
          );
      }
    }
    return true;
  }

  static async getCouponDiscount(couponCode, items = []) {
    let coupon = await Coupon.findOne({
      where: { code: couponCode },
      include: [
        { model: CouponRule, as: "rule" },
        {
          model: CouponDiscount,
          as: "discount",
        },
      ],
    });
    coupon = coupon.toJSON();
    if (!coupon) throw new NotFoundError("This coupon code does not exist!");

    if (!coupon.active) throw new BadRequestError("This coupon been used!");

    let totalAmount = 0;
    for (const each of items) {
      totalAmount += each.price * each.quantity;
    }

    this.validateRules(coupon.rule, totalAmount, items.length);
    const discount = this.calculateDiscount(coupon.discount, totalAmount);
    return discount;
  }

  static async getAllCoupon(where = null) {
    const coupons = await Coupon.findAll({
      where,
      include: ["discount", "rule"],
    });
    return coupons;
  }
}

module.exports = CouponService;
