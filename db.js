// backend/db.js
// Connects to MongoDB Atlas using the URI from .env
// Called once at server startup — Mongoose handles connection pooling automatically.

const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅  MongoDB connected');
  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1); // Stop the server if DB can't be reached
  }
}

module.exports = connectDB;
