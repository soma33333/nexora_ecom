const Product = require('../models/Product')

// GET /api/products
async function getProducts(req, res, next) {
  try {
    const products = await Product.find({}).lean()
    res.json(products)
  } catch (err) {
    next(err)
  }
}

module.exports = { getProducts }
