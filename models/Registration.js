// backend/models/Registration.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tournamentName: { type: String, required: true },
  tournamentId:   { type: String, required: true },
  game:           { type: String, required: true },
  teamName:       { type: String, default: '' },
  inGameName:     { type: String, required: true },
  region:         { type: String, required: true },
  entryFee:       { type: String, default: '0.05 ETH' },
  paymentStatus:  { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
  txHash:         { type: String, default: '' },
  status:         { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);