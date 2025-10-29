import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const api = (path, opts = {}) => {
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return fetch(`/api${path}`, { ...opts, headers }).then(async res => {
      const txt = await res.text();
      const data = txt ? JSON.parse(txt) : null;
      if (!res.ok) {
        const msg = data?.message || res.statusText || 'Error';
        const err = new Error(msg);
        err.response = data;
        throw err;
      }
      return data;
    });
  };

  async function register({ name, email, password }) {
    setLoading(true);
    try {
      const data = await api('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
      setUser(data.user);
      setToken(data.token);
      return data;
    } finally { setLoading(false); }
  }

  async function login({ email, password }) {
    setLoading(true);
    try {
      const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      setUser(data.user);
      setToken(data.token);
      return data;
    } finally { setLoading(false); }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
}
