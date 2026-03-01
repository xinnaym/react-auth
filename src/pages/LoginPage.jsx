import React, { useState, useContext } from 'react';
import { apiLogin } from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const data = await apiLogin(form);

    if (data.message && !data.token) {
      setError(data.message);
    } else if (data.token) {
      login(data.token, data.user);
      navigate('/profile');
    } else {
      setError('Неизвестная ошибка');
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Вход</h1>
        <label>
          E-mail:
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Пароль:
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
