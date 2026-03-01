require('dotenv').config(); // подключаем .env САМОЙ первой строкой

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();

// 1. Чтение JSON из тела запроса
app.use(express.json());

// 2. Настройка CORS – даём доступ React-приложению (порт 5173 для Vite)
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// 3. Тестовый маршрут
app.get('/', (req, res) => {
  res.send('API работает (SQLite)');
});

// 4. Маршруты авторизации
app.use('/api/auth', authRoutes);

// 5. Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
