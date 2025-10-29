import React from 'react'
import ProductList from '../components/ProductList'
import { useNavigate } from 'react-router-dom'

export default function Home(){
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <div className="top-row">
        <button className="open-cart-btn" onClick={() => navigate('/cart')}>Open Cart</button>
      </div>
      <div className="content-grid">
        <ProductList />
      </div>
    </div>
  )
}
