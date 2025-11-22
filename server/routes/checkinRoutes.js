const express = require('express');
const Attendee = require('../models/Attendee');
const router = express.Router();

// Check-in by QR code value
router.post('/', async (req, res) => {
  const { qrCodeValue } = req.body;

  if (!qrCodeValue) {
    return res.status(400).json({ error: 'qrCodeValue is required' });
  }

  try {
    const attendee = await Attendee.findOne({ qrCodeValue });

    if (!attendee) {
      return res.status(404).json({ error: 'Attendee not found' });
    }

    if (attendee.checkedIn) {
      return res.json({
        status: 'already',
        attendee,
        checkedInAt: attendee.checkedInAt,
      });
    }

    attendee.checkedIn = true;
    attendee.checkedInAt = new Date();
    await attendee.save();

    res.json({
      status: 'success',
      attendee,
      checkedInAt: attendee.checkedInAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
