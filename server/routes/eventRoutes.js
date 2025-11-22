const express = require('express');
const Event = require('../models/Event');
const Attendee = require('../models/Attendee');
const router = express.Router();

// Create event
router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single event with stats
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const total = await Attendee.countDocuments({ eventId: event._id });
    const checkedIn = await Attendee.countDocuments({
      eventId: event._id,
      checkedIn: true,
    });

    res.json({ event, stats: { total, checkedIn } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
