import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'


export default function ProductList(){
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const { addToCart } = useCart()


useEffect(() => {
let mounted = true
fetch('/api/products')
.then(res => {
if(!res.ok) throw new Error('Unable to load products')
return res.json()
})
.then(data => { if(mounted){ setProducts(data); setLoading(false) } })
.catch(err => { if(mounted){ setError(err.message); setLoading(false) } })
return () => mounted = false
}, [])


if(loading) return <div className="loader">Loading products...</div>
if(error) return <div className="error">{error}</div>


return (
<div className="product-list">
{products.map(p => (
<div className="product-card" key={p._id || p.id}>
<div className="product-image">
<img src={p.image || `https://via.placeholder.com/200x150?text=${encodeURIComponent(p.name)}`} alt={p.name} />
</div>
<div className="product-body">
<h3>{p.name}</h3>
<p className="price">₹{p.price.toFixed(2)}</p>
<button onClick={() => addToCart(p._id || p.id, 1)}>Add to Cart</button>
</div>
</div>
))}
</div>
)
}