const cartRouter = require("express").Router();

const CartService = require("../service/cart.service");

cartRouter.post("/", async (req, res) => {
  console.log(req.body)
  const { productId, quantity } = req.body;
  const cart = await CartService.addToCart({ product: productId, quantity });
  res
    .status(201)
    .json({ status: "success", message: "product added to cart", data: cart });
});

cartRouter.get("/", async (req, res) => {
  const cart = await CartService.getCarts()
  res.json({ cart })
})

cartRouter.delete("/", async (req, res) => {
  const cartId = req.params.id;
  const cart = await CartService.removeItemFromCart(cartId);
  res.json({ status: "success", message: "product added to cart", data: cart });
});


module.exports = cartRouter;