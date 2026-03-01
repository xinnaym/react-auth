import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Главная</Link>
      {user ? (
        <>
          <Link to="/profile">Профиль</Link>
          <button onClick={logout}>Выйти</button>
        </>
      ) : (
        <>
          <Link to="/login">Вход</Link>
          <Link to="/register">Регистрация</Link>
        </>
      )}
    </nav>
  );
}
