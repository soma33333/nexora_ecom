import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ReceiptModal from '../pages/ReceiptModal';

export default function Checkout({ onClose }) {
  const { cart, checkout } = useCart();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  // Autofill user info when logged in
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Prevent checkout if not logged in
    if (!user) {
      setError('Please login to complete checkout.');
      return;
    }

    if (!name || !email) {
      setError('Please fill name and email');
      return;
    }

    try {
      setLoading(true);
      const r = await checkout({ name, email });
      setReceipt(r);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (receipt)
    return <ReceiptModal receipt={receipt} onClose={() => { setReceipt(null); onClose(); }} />;

  return (
    <div className="checkout-panel">
      <h3>Checkout</h3>

      {!user ? (
        <div className="login-warning">
          <p>Please login to continue checkout.</p>
          <button onClick={() => (window.location.href = '/login')}>Go to Login</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} readOnly />
          </label>
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
          </label>

          <div className="checkout-summary">
            <div>Items: {cart.items.length}</div>
            <div>Total: ₹{(cart.total || 0).toFixed(2)}</div>
          </div>

          {error && <div className="error">{error}</div>}

          <div className="checkout-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Pay (Mock)'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
