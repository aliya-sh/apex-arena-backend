// backend/routes/registrations.js
const router       = require('express').Router();
const Registration = require('../models/Registration');
const auth         = require('../middleware/auth');

// ── POST /registrations  — register the logged-in user for a tournament
router.post('/', auth, async (req, res) => {
  try {
    const { tournamentName, tournamentId, game, teamName, inGameName, region, entryFee, txHash } = req.body;

    // Check duplicate
    const exists = await Registration.findOne({ user: req.userId, tournamentId });
    if (exists) return res.status(409).json({ error: 'Already registered for this tournament' });

    const reg = await Registration.create({
      user: req.userId,
      tournamentName, tournamentId, game,
      teamName, inGameName, region,
      entryFee: entryFee || '0.05 ETH',
      txHash: txHash || '',
      paymentStatus: txHash ? 'paid' : 'pending',
      status: 'pending'
    });
    res.status(201).json(reg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── GET /registrations/mine  — current user's registrations
router.get('/mine', auth, async (req, res) => {
  try {
    const regs = await Registration.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /registrations/:tournamentId  — all registrants for a tournament (admin)
router.get('/:tournamentId', auth, async (req, res) => {
  try {
    const regs = await Registration
      .find({ tournamentId: req.params.tournamentId })
      .populate('user', 'firstName lastName email');
    res.json(regs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
