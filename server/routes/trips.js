// routes/trips.js
const express = require('express');
const Trip = require('../models/Trip');
const router = express.Router();
const authMiddleware = require('../routes/auth');

// Get all trips for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trips', error: err.message });
  }
});

// Create a new trip
router.post('/', authMiddleware, async (req, res) => {
  const { destination, startDate, endDate, notes } = req.body;
  try {
    const newTrip = new Trip({
      user: req.user._id,
      destination,
      startDate,
      endDate,
      notes,
    });
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(500).json({ message: 'Error creating trip', error: err.message });
  }
});

// Get a specific trip
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip || trip.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trip', error: err.message });
  }
});

// Update a trip
router.put('/:id', authMiddleware, async (req, res) => {
  const { destination, startDate, endDate, notes } = req.body;
  try {
    let trip = await Trip.findById(req.params.id);
    if (!trip || trip.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    trip.destination = destination;
    trip.startDate = startDate;
    trip.endDate = endDate;
    trip.notes = notes;
    await trip.save();
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error updating trip', error: err.message });
  }
});

// Delete a trip
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip || trip.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    await trip.remove();
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting trip', error: err.message });
  }
});

module.exports = router;
