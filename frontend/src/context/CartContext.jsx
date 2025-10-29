import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNotification } from './NotificationContext'; // ✅ NEW IMPORT

const CartContext = createContext();

// Custom hook
export function useCart() {
  return useContext(CartContext);
}

// CartProvider
export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showNotification } = useNotification(); // ✅ get notifier

  // Fetch cart from backend
  async function fetchCart() {
    try {
      setLoading(true);
      const res = await fetch('/api/cart');
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Add item to cart
  async function addToCart(productId, qty = 1) {
    try {
      setLoading(true);
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, qty }),
      });
      if (!res.ok) throw new Error('Add to cart failed');
      await fetchCart();
      showNotification('✅ Item added to cart'); // ✅ show success msg
    } catch (err) {
      setError(err.message);
      showNotification('❌ Failed to add item');
    } finally {
      setLoading(false);
    }
  }

  // Remove item from cart
  async function removeFromCart(cartItemId) {
    try {
      setLoading(true);
      const res = await fetch(`/api/cart/${cartItemId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Remove failed');
      await fetchCart();
      showNotification('🗑️ Item removed from cart'); // ✅
    } catch (err) {
      setError(err.message);
      showNotification('❌ Failed to remove item');
    } finally {
      setLoading(false);
    }
  }

  // Update quantity
  async function updateQty(cartItemId, qty) {
    try {
      setLoading(true);
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: cartItemId, qty }),
      });
      if (!res.ok) throw new Error('Update qty failed');
      await fetchCart();
      showNotification('🔄 Cart updated'); // ✅
    } catch (err) {
      setError(err.message);
      showNotification('❌ Failed to update quantity');
    } finally {
      setLoading(false);
    }
  }

  // Checkout
  async function checkout({ name, email }) {
    try {
      setLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, cartItems: cart.items }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || 'Checkout failed');
      }
      const receipt = await res.json();
      await fetchCart(); // clear cart
      showNotification('✅ Checkout successful');
      return receipt;
    } catch (err) {
      setError(err.message);
      showNotification('❌ Checkout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQty,
    checkout,
    refresh: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
