// ═══════════════════════════════════════════════════════════
//  APEX ARENA — server.js  (serves frontend + API from Render)
// ═══════════════════════════════════════════════════════════
'use strict';

const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const connectDB  = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Connect to MongoDB ──────────────────────────────────────
connectDB();

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── API Routes (must come BEFORE static / catch-all) ───────
const authRoutes          = require('./routes/auth');
const playerRoutes        = require('./routes/players');
const registrationRoutes  = require('./routes/registrations');
const transactionRoutes   = require('./routes/transactions');
const chatRoutes          = require('./routes/chat');

app.use('/auth',          authRoutes);
app.use('/players',       playerRoutes);
app.use('/registrations', registrationRoutes);
app.use('/transactions',  transactionRoutes);
app.use('/chat',          chatRoutes);

// ── Health-check (optional, keep for Render uptime checks) ──
app.get('/api/health', (_req, res) => {
  res.json({ message: '🎮 APEX ARENA API running', version: '2.0.0' });
});

// ── Serve Frontend Static Files ─────────────────────────────
// Place all your HTML / JS / CSS / JSON files in a folder
// called  "public"  inside the backend directory.
app.use(express.static(path.join(__dirname, 'public')));

// ── Catch-all: send index.html for any unknown route ────────
// This makes direct links like /players.html, /login.html etc. work.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🎮 Apex Arena running on port ${PORT}`);
});