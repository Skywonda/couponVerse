const productData = require('./config/seed/product')
const { Product } = require('./model')

async function createProducts() {
  const product = await Product.bulkCreate(productData)
  return product
}

function command() {
  createProducts()
}

module.exports = command;