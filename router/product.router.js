const ProductService = require("../service/product.service");

const productRouter = require("express").Router();

productRouter.get("/", async (req, res) => {
  const products = await ProductService.getProducts()
  return res.json({ products })
});


module.exports = productRouter;
