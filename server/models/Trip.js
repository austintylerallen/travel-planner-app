// server/models/Trip.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    activities: [{ type: String }],
    bookings: [{
        type: { type: String, required: true },
        details: { type: String, required: true },
    }],
});

module.exports = mongoose.model('Trip', TripSchema);
