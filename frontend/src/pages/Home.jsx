import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'


export default function Home(){
const [showCart, setShowCart] = useState(false)


return (
<div className="page-container">
<div className="top-row">
<button className="open-cart-btn" onClick={() => setShowCart(true)}>Open Cart</button>
</div>
<div className="content-grid">
<ProductList />
{showCart && <Cart onClose={() => setShowCart(false)} />}
</div>
</div>
)
}