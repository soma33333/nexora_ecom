import React from 'react'


export default function ReceiptModal({ receipt, onClose }){
return (
<div className="receipt-overlay">
<div className="receipt-modal">
<h2>Receipt</h2>
<div><strong>Order ID:</strong> {receipt.orderId || receipt.id || 'N/A'}</div>
<div><strong>Name:</strong> {receipt.name}</div>
<div><strong>Email:</strong> {receipt.email}</div>
<div><strong>Date:</strong> {new Date(receipt.timestamp || Date.now()).toLocaleString()}</div>
<div className="receipt-items">
<h4>Items</h4>
<ul>
{receipt.items?.map((it, idx) => (
<li key={idx}>{it.product?.name || it.name} x {it.qty} — ₹{((it.product?.price || it.price) * it.qty).toFixed(2)}</li>
))}
</ul>
</div>
<div className="receipt-total">Total: ₹{(receipt.total||0).toFixed(2)}</div>
<div className="receipt-actions">
<button onClick={onClose}>Close</button>
</div>
</div>
</div>
)
}