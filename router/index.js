const router = require('express').Router()

const cartRouter = require('./cart.router')
const couponRouter = require('./coupon.router')
const productRouter = require('./product.router')

router.use('/cart', cartRouter)
router.use('/coupon', couponRouter)
router.use('/product', productRouter)

module.exports = router;