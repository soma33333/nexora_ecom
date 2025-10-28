const express = require('express')
const router = express.Router()
const {
  getCart,
  addOrUpdateCartItem,
  removeCartItem
} = require('../controllers/cartController')

// Get cart (items + total)
router.get('/', getCart)

// Add or update item - body: { productId, qty }
router.post('/', addOrUpdateCartItem)

// Remove by cartItem id (or support productId)
router.delete('/:id', removeCartItem)

module.exports = router
