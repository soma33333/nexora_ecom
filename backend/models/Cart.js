const mongoose = require('mongoose')

// CartItem schema: one collection of items (optionally extend with userId for multi-user)
const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, default: 1, min: 1 }
}, {
  timestamps: true
})

module.exports = mongoose.model('CartItem', CartItemSchema)
