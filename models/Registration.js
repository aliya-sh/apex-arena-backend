// backend/models/Registration.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  // Who registered
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Which tournament
  tournamentName: { type: String, required: true },
  tournamentId:   { type: String, required: true },
  // Entry details
  game:           { type: String, required: true },
  teamName:       { type: String, default: '' },
  inGameName:     { type: String, required: true },
  region:         { type: String, required: true },
  // Payment / entry fee
  entryFee:       { type: String, default: '0.05 ETH' },
  paymentStatus:  { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
  txHash:         { type: String, default: '' },    // Ethereum transaction hash
  // Status
  status:         { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
}, { timestamps: true });

// A user can only register once per tournament
registrationSchema.index({ user: 1, tournamentId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
