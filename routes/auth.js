// backend/routes/auth.js
const router  = require('express').Router();
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const Contact = require('../models/Contact');
const auth    = require('../middleware/auth');

function makeToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// ── POST /auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ error: 'Email already registered' });

    const user  = await User.create({ firstName, lastName, email, password });
    const token = makeToken(user._id);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: 'Invalid email or password' });

    const token = makeToken(user._id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /auth/me  (protected)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /auth/users  (admin — list all users)
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /auth/users/:id  (admin — update user)
router.put('/users/:id', auth, async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, role },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE /auth/users/:id  (admin)
router.delete('/users/:id', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /auth/contact  — save contact form to DB
router.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, dob, nationality, inquiryType, message } = req.body;
    if (!firstName || !lastName || !email || !message)
      return res.status(400).json({ error: 'Required fields missing' });

    const entry = await Contact.create({ firstName, lastName, email, phone, dob, nationality, inquiryType, message });
    res.status(201).json({ success: true, id: entry._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /auth/contact  (admin — view all contact submissions)
router.get('/contact', auth, async (req, res) => {
  try {
    const entries = await Contact.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;