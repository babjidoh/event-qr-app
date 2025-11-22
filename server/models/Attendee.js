const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  fullName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },

  // QR value encoded into the QR image
  qrCodeValue: { type: String, required: true, unique: true },

  // seating
  tableNumber: { type: String },
  seatNumber: { type: String },

  // check-in info
  checkedIn: { type: Boolean, default: false },
  checkedInAt: { type: Date },
});

module.exports = mongoose.model('Attendee', attendeeSchema);
