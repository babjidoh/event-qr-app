const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const eventRoutes = require('./routes/eventRoutes');
const attendeeRoutes = require('./routes/attendeeRoutes');
const checkinRoutes = require('./routes/checkinRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/attendees', attendeeRoutes);
app.use('/api/checkin', checkinRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
