// backend/models/Player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  country:  { type: String, required: true },
  rank:     { type: Number, required: true },
  wins:     { type: Number, default: 0 },
  losses:   { type: Number, default: 0 },
  winRate:  { type: String },
  game:     { type: String, required: true, enum: ['Valorant', 'CS2', 'League of Legends', 'Apex Legends'] },
  team:     { type: String },
  photo:    { type: String, default: '' },
  // Link to a User account (optional — admins can create players without a user account)
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

// Auto-calculate winRate before saving
playerSchema.pre('save', function (next) {
  const total = this.wins + this.losses;
  this.winRate = total > 0 ? Math.round((this.wins / total) * 100) + '%' : '0%';
  next();
});

module.exports = mongoose.model('Player', playerSchema);
