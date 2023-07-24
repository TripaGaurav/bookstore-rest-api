const jwt = require('jsonwebtoken');

// Middleware to authenticate users using JWT token
exports.authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not provided' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to check if user is an Admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admin role required' });
  }
  next();
};
