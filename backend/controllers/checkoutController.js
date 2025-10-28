const CartItem = require('../models/Cart')
const Product = require('../models/Product')
const mongoose = require('mongoose')

// POST /api/checkout { name, email, cartItems(optional) }
// If client doesn't send cartItems, derive from DB cart
async function checkout(req, res, next) {
  try {
    const { name, email, cartItems } = req.body
    if (!name || !email) return res.status(400).json({ message: 'name and email required' })

    // If cartItems provided by client, trust it minimally; else fetch from DB
    let items = []
    if (Array.isArray(cartItems) && cartItems.length) {
      // attempt to normalize items (client may send simplified objects)
      // We'll accept product id or nested product objects
      for (const it of cartItems) {
        if (it.product && it.product._id) {
          items.push({ product: it.product, qty: it.qty || 1 })
        } else if (it.product) {
          // product is id
          const prod = await Product.findById(it.product).lean()
          if (prod) items.push({ product: prod, qty: it.qty || 1 })
        } else if (it._id) {
          // maybe full cart item shape
          const prod = await Product.findById(it._id).lean()
          if (prod) items.push({ product: prod, qty: it.qty || 1 })
        }
      }
    } else {
      // Load from DB
      const cart = await CartItem.find({}).populate('product').lean()
      items = cart.map(ci => ({ product: ci.product, qty: ci.qty }))
    }

    // compute totals
    const itemsWithSub = items.map(it => {
      const price = it.product?.price || 0
      const qty = it.qty || 1
      return { product: it.product, qty, subtotal: price * qty }
    })
    const total = itemsWithSub.reduce((s, it) => s + it.subtotal, 0)

    // create mock receipt
    const receipt = {
      orderId: `NEX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      email,
      items: itemsWithSub,
      total,
      timestamp: new Date().toISOString()
    }

    // Clear cart after checkout (simple behavior)
    await CartItem.deleteMany({})

    return res.json(receipt)
  } catch (err) {
    next(err)
  }
}

module.exports = { checkout }
