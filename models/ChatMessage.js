// backend/models/ChatMessage.js
const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  // null user = guest / unauthenticated
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  role:    { type: String, enum: ['user', 'ai'], required: true },
  content: { type: String, required: true },
  // Optional: group messages into sessions so history loads per-session
  sessionId: { type: String, required: true, index: true },
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
