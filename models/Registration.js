// backend/routes/registrations.js
const router       = require('express').Router();
const Registration = require('../models/Registration');
const auth         = require('../middleware/auth');

// ── POST /registrations  — register the logged-in user for a tournament
router.post('/', auth, async (req, res) => {
  try {
    const { tournamentName, tournamentId, game, teamName, inGameName, region, entryFee, txHash } = req.body;

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

// ── GET /registrations/all  (admin — all registrations) — MUST be before /:tournamentId
router.get('/all', auth, async (req, res) => {
  try {
    const regs = await Registration.find()
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /registrations/:id/status  (admin — approve/reject)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const reg = await Registration.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!reg) return res.status(404).json({ error: 'Not found' });
    res.json(reg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE /registrations/:id  (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /registrations/:tournamentId  — all registrants for a tournament
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

// ── GET /registrations/all-public — public list for tournament page
router.get('/all-public', async (req, res) => {
  try {
    const regs = await Registration.find({ status: { $ne: 'rejected' } })
      .select('inGameName teamName game status createdAt')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(regs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;