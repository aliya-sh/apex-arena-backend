// backend/routes/players.js
const router = require('express').Router();
const Player = require('../models/Player');
const auth   = require('../middleware/auth');

// ── GET /players  (optional ?game= filter)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.game) filter.game = req.query.game;
    const players = await Player.find(filter).sort({ rank: 1 });
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /players/:id
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('user', 'firstName lastName email');
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /players  (admin — add new player)
router.post('/', auth, async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── PATCH /players/:id  (partial update)
router.patch('/:id', auth, async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── PUT /players/:id  (admin — full update)
router.put('/:id', auth, async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE /players/:id  (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;