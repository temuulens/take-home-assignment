// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Adjust the path as needed

// Get recent messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ timestamp: -1 }) // Sort by timestamp descending
      .limit(100); // Limit to 100 messages
    res.json(messages);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get older messages
router.get('/messages/older', async (req, res) => {
  const { before } = req.query; // Timestamp to fetch messages older than this
  try {
    const messages = await Message.find({ timestamp: { $lt: new Date(before) } })
      .sort({ timestamp: -1 }) // Sort by timestamp descending
      .limit(100);
    res.json(messages);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
