// backend/server.js
require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const connectDB = require('./db');

const app = express();

// ── Middleware
app.use(cors());
app.use(express.json());

// ── Connect to MongoDB
connectDB();

// ── Routes
app.use('/auth',          require('./routes/auth'));
app.use('/players',       require('./routes/players'));
app.use('/registrations', require('./routes/registrations'));
app.use('/transactions',  require('./routes/transactions'));
app.use('/chat',          require('./routes/chat'));

// ── Health check
app.get('/', (req, res) => {
  res.json({ message: '🎮 APEX ARENA API running', version: '2.0.0' });
});

// ── Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅  Server running on http://localhost:${PORT}`);
  console.log('   POST /auth/signup');
  console.log('   POST /auth/login');
  console.log('   GET  /auth/me');
  console.log('   GET  /players');
  console.log('   POST /registrations');
  console.log('   GET  /registrations/mine');
  console.log('   GET  /transactions');
  console.log('   POST /transactions');
  console.log('   GET  /chat/:sessionId');
  console.log('   POST /chat');
});
