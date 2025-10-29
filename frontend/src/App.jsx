import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import { NotificationProvider } from './context/NotificationContext'
import Notification from './components/Notification'

export default function App(){
  return (
    <Router>
      <NotificationProvider>
        <CartProvider>
          <Notification />
          <div className="app-root">
            <header className="app-header">
              <h1>Nexora Mock E-Com</h1>
            </header>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
            <footer className="app-footer">Built for Vibe Commerce screening</footer>
          </div>
        </CartProvider>
      </NotificationProvider>
    </Router>
  )
}
