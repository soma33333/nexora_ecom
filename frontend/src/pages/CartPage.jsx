import React from 'react'
import Cart from '../components/Cart'
import { useNavigate } from 'react-router-dom'

export default function CartPage(){
  const navigate = useNavigate()
  return (
    <div className="cart-page">
      <button onClick={() => navigate('/')}>← Back to Home</button>
      <Cart onClose={() => navigate('/')} />
    </div>
  )
}
