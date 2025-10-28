const CartItem = require('../models/Cart')
const Product = require('../models/Product')
const mongoose = require('mongoose')

// GET /api/cart
async function getCart(req, res, next) {
  try {
    // populate product details
    const items = await CartItem.find({}).populate('product').lean()
    // compute subtotal per item and total
    const mapped = items.map(it => {
      const price = it.product?.price || 0
      const subtotal = price * (it.qty || 0)
      return {
        _id: it._id,
        product: it.product,
        qty: it.qty,
        subtotal
      }
    })
    const total = mapped.reduce((s, it) => s + it.subtotal, 0)
    res.json({ items: mapped, total })
  } catch (err) {
    next(err)
  }
}

// POST /api/cart { productId, qty }
async function addOrUpdateCartItem(req, res, next) {
  try {
    const { productId, qty } = req.body
    if (!productId) return res.status(400).json({ message: 'productId required' })
    const quantity = Math.max(1, parseInt(qty || 1, 10))

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid productId' })
    }

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    // Check if cart already has this product
    let item = await CartItem.findOne({ product: productId })
    if (item) {
      // update qty
      item.qty = quantity
      await item.save()
      item = await item.populate('product')
      return res.status(200).json({ item })
    } else {
      // create new cart item
      const newItem = new CartItem({ product: productId, qty: quantity })
      await newItem.save()
      await newItem.populate('product')
      return res.status(201).json({ item: newItem })
    }
  } catch (err) {
    next(err)
  }
}

// DELETE /api/cart/:id
async function removeCartItem(req, res, next) {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // Maybe client passed productId; try removing by product
      const byProduct = await CartItem.findOneAndDelete({ product: id })
      if (byProduct) return res.json({ success: true })
      return res.status(400).json({ message: 'Invalid id' })
    }
    const item = await CartItem.findByIdAndDelete(id)
    if (!item) return res.status(404).json({ message: 'Cart item not found' })
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}

module.exports = { getCart, addOrUpdateCartItem, removeCartItem }
