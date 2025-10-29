import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

export default function Login(){
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-buttons">
          <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
          <Link to="/register"><button type="button">Create new account</button></Link>
        </div>
      </form>
    </div>
  );
}
