import React, { createContext, useState, useEffect } from 'react';
import { apiGetMe } from '../api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const me = await apiGetMe(savedToken);
        if (me && me.id) {
          setUser(me);
          setToken(savedToken);
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Ошибка при восстановлении сессии', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function login(newToken, userData) {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  }

  const value = { user, token, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
