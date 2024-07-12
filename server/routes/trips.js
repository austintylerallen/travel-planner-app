// server/routes/trips.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// Create a new trip
router.post('/', async (req, res) => {
  const { destination, startDate, endDate, notes } = req.body;
  try {
    const newTrip = new Trip({ destination, startDate, endDate, notes });
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get a specific trip
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findById(id);
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Update a trip
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { destination, startDate, endDate, notes } = req.body;
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(id, { destination, startDate, endDate, notes }, { new: true });
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Delete a trip
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Trip.findByIdAndDelete(id);
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
