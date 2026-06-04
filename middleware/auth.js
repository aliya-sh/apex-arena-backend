// backend/middleware/auth.js
// Protects routes that require a logged-in user.
// Usage:  router.get('/profile', auth, (req, res) => { ... })
// The decoded user id is available as req.userId inside protected routes.

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // Expect: Authorization: Bearer <token>
  const header = req.headers['authorization'] || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'No token — please log in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = auth;
