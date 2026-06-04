// backend/routes/transactions.js
const router      = require('express').Router();
const Transaction = require('../models/Transaction');
const auth        = require('../middleware/auth');

// All transaction routes require login
router.use(auth);

// ── GET /transactions  — current user's transaction history
router.get('/', async (req, res) => {
  try {
    const txs = await Transaction
      .find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /transactions  — record a new transaction
router.post('/', async (req, res) => {
  try {
    const { type, token, amount, usdValue, toAddress, fromAddress, txHash, network, label } = req.body;
    const tx = await Transaction.create({
      user: req.userId,
      type, token, amount,
      usdValue: usdValue || 0,
      toAddress: toAddress || '',
      fromAddress: fromAddress || '',
      txHash: txHash || '',
      network: network || 'Ethereum',
      label: label || ''
    });
    res.status(201).json(tx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
