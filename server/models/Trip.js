const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flightNumber: String,
  airline: String,
  departureAirport: String,
  departureTime: String,
  arrivalAirport: String,
  arrivalTime: String
}, { _id: false });

const tripSchema = new Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  flights: [flightSchema]
});

module.exports = mongoose.model('Trip', tripSchema);
