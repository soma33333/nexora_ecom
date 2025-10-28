import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import Checkout from './Checkout'


export default function Cart({ onClose }){
const { cart, removeFromCart, updateQty } = useCart()
const [isCheckingOut, setIsCheckingOut] = useState(false)


return (
<aside className="cart-panel">
<div className="cart-header">
<h2>Your Cart</h2>
<button onClick={onClose}>Close</button>
</div>


<div className="cart-items">
{cart.items.length === 0 && <div>Your cart is empty</div>}
{cart.items.map(item => (
<div key={item._id || item.product._id} className="cart-item">
<div className="cart-item-info">
<div className="cart-item-name">{item.product?.name || item.name}</div>
<div className="cart-item-price">₹{(item.product?.price || item.price).toFixed(2)}</div>
</div>
<div className="cart-item-controls">
<button onClick={() => updateQty(item.product?._id || item.product, Math.max(1, item.qty - 1))}>-</button>
<span>{item.qty}</span>
<button onClick={() => updateQty(item.product?._id || item.product, item.qty + 1)}>+</button>
<button className="remove" onClick={() => removeFromCart(item._id || item.product)}>Remove</button>
</div>
</div>
))}
</div>


<div className="cart-footer">
<div className="cart-total">Total: ₹{(cart.total || 0).toFixed(2)}</div>
<div>
<button disabled={cart.items.length===0} onClick={() => setIsCheckingOut(true)}>Checkout</button>
</div>
</div>


{isCheckingOut && <Checkout onClose={() => setIsCheckingOut(false)} />}
</aside>
)
}