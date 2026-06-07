// backend/routes/chat.js
const router      = require('express').Router();
const ChatMessage = require('../models/ChatMessage');

// ── GET /chat/:sessionId  — load history for a session
router.get('/:sessionId', async (req, res) => {
  try {
    const messages = await ChatMessage
      .find({ sessionId: req.params.sessionId })
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /chat  — save a message (user or ai)
router.post('/', async (req, res) => {
  try {
    const { role, content, sessionId, userId } = req.body;
    if (!role || !content || !sessionId)
      return res.status(400).json({ error: 'role, content, and sessionId are required' });

    const msg = await ChatMessage.create({
      role, content, sessionId,
      user: userId || null
    });
    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE /chat/:sessionId  — clear a chat session
router.delete('/:sessionId', async (req, res) => {
  try {
    await ChatMessage.deleteMany({ sessionId: req.params.sessionId });
    res.json({ message: 'Chat cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /chat/groq  — proxy Groq API (key stays on server)
router.post('/groq', async (req, res) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;