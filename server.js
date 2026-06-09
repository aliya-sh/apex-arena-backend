'use strict';

const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const connectDB  = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

const tournamentRoutes = require("./routes/tournaments");
const leaderboardRoutes = require("./routes/leaderboard");
const contactRoutes = require("./routes/contacts");
const authRoutes         = require('./routes/auth');
const playerRoutes       = require('./routes/players');
const registrationRoutes = require('./routes/registrations');
const transactionRoutes  = require('./routes/transactions');
const chatRoutes         = require('./routes/chat');

app.use('/auth',          authRoutes);
app.use('/players',       playerRoutes);
app.use('/registrations', registrationRoutes);
app.use('/transactions',  transactionRoutes);
app.use('/chat',          chatRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/contacts", contactRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Apex Arena running on port ' + PORT);
});