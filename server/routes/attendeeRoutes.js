const express = require('express');
const Attendee = require('../models/Attendee');
const router = express.Router();

// Create one attendee
router.post('/', async (req, res) => {
  try {
    const attendee = await Attendee.create(req.body);
    res.json(attendee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Bulk create attendees (e.g. from CSV on frontend)
router.post('/bulk', async (req, res) => {
  try {
    const attendees = await Attendee.insertMany(req.body.attendees);
    res.json(attendees);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get attendees for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const attendees = await Attendee.find({ eventId: req.params.eventId }).sort({
      tableNumber: 1,
      seatNumber: 1,
    });
    res.json(attendees);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update seating (table + seat)
router.patch('/:id/seat', async (req, res) => {
  try {
    const attendee = await Attendee.findByIdAndUpdate(
      req.params.id,
      {
        tableNumber: req.body.tableNumber,
        seatNumber: req.body.seatNumber,
      },
        { new: true }
    );
    res.json(attendee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
