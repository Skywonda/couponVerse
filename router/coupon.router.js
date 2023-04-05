const { NotFoundError } = require("../error/error");
const CartService = require("../service/cart.service");
const CouponService = require("../service/coupon.service");

const couponRouter = require("express").Router();

couponRouter.post("/", async (req, res) => {
  const { discount_amount, discount_type, rule_value, rule_type } = req.body;
  const coupon = await CouponService.addCoupon({
    discount_amount,
    discount_type,
    rule_type,
    rule_value,
  });
  res.status(201).json({
    status: "success",
    message: "coupon created succesfuly!",
    data: coupon,
  });
});

couponRouter.get("/display", async (req, res) => {
  const coupon = await CouponService.getAllCoupon({ active: true });
  if (!coupon.length) throw new NotFoundError("coupon is empty!");
  res.json({
    status: "success",
    message: "all coupon!",
    data: coupon,
  });
});

couponRouter.get("/", async (req, res) => {
  const { coupon } = req.query;
  const cartItem = await CartService.getCarts();
  const data = await CouponService.getCouponDiscount(coupon, cartItem);
  console.log(data)
  res.json({ status: "success", message: "coupon applied!", data });
});

couponRouter.delete("/", async (req, res) => {
  const cartId = req.params.id;
  const cart = await CartService.removeItemFromCart(cartId);
  res.json({ status: "success", message: "product added to cart", data: cart });
});

module.exports = couponRouter;
