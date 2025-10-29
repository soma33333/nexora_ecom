import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import Notification from './components/Notification';

//  Header Component
function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // clears token + user from localStorage
    navigate('/login');
  };

  return (
    <header className="app-header">
      <h1 className="app-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        Nexora Mock E-Com
      </h1>
      <div className="header-buttons">
        {user ? (
          <>
            <span className="user-name">Hi, {user.name}</span>
            <button className="auth-btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="auth-btn" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="auth-btn secondary" onClick={() => navigate('/register')}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}

//  Main App Component
export default function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <Notification />
            <div className="app-root">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
            </div>
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}
