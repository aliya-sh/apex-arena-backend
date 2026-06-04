// backend/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:        { type: String, enum: ['send', 'receive', 'swap', 'buy', 'sell'], required: true },
  token:       { type: String, required: true },   // e.g. 'ETH', 'MATIC', 'USDC'
  amount:      { type: Number, required: true },
  usdValue:    { type: Number, default: 0 },
  toAddress:   { type: String, default: '' },
  fromAddress: { type: String, default: '' },
  txHash:      { type: String, default: '' },
  network:     { type: String, default: 'Ethereum' },
  status:      { type: String, enum: ['pending', 'confirmed', 'failed'], default: 'confirmed' },
  label:       { type: String, default: '' },      // Human-readable note
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
