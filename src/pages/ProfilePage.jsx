import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import '../App.css';

export default function ProfilePage() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-container">
      <h1>Личный кабинет</h1>
      <p>Имя: {user.name}</p>
      <p>E-mail: {user.email}</p>
      <p>ID: {user.id}</p>
      <p>Создан: {user.created_at}</p>
    </div>
  );
}
