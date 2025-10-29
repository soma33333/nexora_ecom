import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import ReceiptModal from '../pages/ReceiptModal'


export default function Checkout({ onClose }) {
    const { cart, checkout } = useCart()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [receipt, setReceipt] = useState(null)


    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        if (!name || !email) { setError('Please fill name and email'); return }
        try {
            setLoading(true)
            const r = await checkout({ name, email })
            setReceipt(r)
        } catch (err) { setError(err.message) } finally { setLoading(false) }
    }


    if (receipt) return <ReceiptModal receipt={receipt} onClose={() => { setReceipt(null); onClose() }} />


    return (
        <div className="checkout-panel">
            <h3>Checkout</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Email
                    <input value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <div className="checkout-summary">
                    <div>Items: {cart.items.length}</div>
                    <div>Total: ₹{(cart.total || 0).toFixed(2)}</div>
                </div>
                {error && <div className="error">{error}</div>}
                <div className="checkout-actions">
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Pay (Mock)'}</button>
                </div>
            </form>
        </div>
    )
}