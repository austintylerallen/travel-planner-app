// server/models/Trip.js
const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  notes: { type: String },
});

module.exports = mongoose.model('Trip', tripSchema);
