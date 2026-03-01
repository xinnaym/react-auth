const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization; // Ожидаем "Bearer TOKEN"

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Нет токена' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded: { userId, email, iat, exp }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Неверный или просроченный токен' });
  }
};
