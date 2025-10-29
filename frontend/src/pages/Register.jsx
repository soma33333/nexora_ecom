import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css'

export default function Register(){
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    setError(null);
    if (!email || !password) { setError('Email and password required'); return; }
    try {
      setLoading(true);
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
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
          <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
          <Link to="/login"><button type="button">Already have an account?</button></Link>
        </div>
      </form>
    </div>
  );
}
