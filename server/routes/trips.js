const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// Route to create a new trip
router.post('/', async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error('Error creating trip:', error); // Log the error details
    res.status(500).json({ message: 'Error creating trip', error });
  }
});

// Route to get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error });
  }
});

// Route to delete a trip
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Trip.findByIdAndDelete(id);
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error });
  }
});

// Route to update a trip
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip', error });
  }
});

// Route to add a flight to a trip
router.post('/:id/add-flight', async (req, res) => {
  try {
    const { id } = req.params;
    const flight = req.body;
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.flights = trip.flights || [];
    trip.flights.push(flight);
    const updatedTrip = await trip.save();
    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error('Error adding flight to trip:', error);
    res.status(500).json({ message: 'Error adding flight to trip', error });
  }
});

// Route to edit a flight in a trip
router.put('/:tripId/edit-flight/:flightId', async (req, res) => {
  try {
    const { tripId, flightId } = req.params;
    const updatedFlight = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const flightIndex = trip.flights.findIndex(flight => flight._id.toString() === flightId);
    if (flightIndex === -1) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    trip.flights[flightIndex] = { ...trip.flights[flightIndex], ...updatedFlight };
    const updatedTrip = await trip.save();
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error editing flight', error });
  }
});

// Route to delete a flight from a trip
router.delete('/:tripId/delete-flight/:flightId', async (req, res) => {
  try {
    const { tripId, flightId } = req.params;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    trip.flights = trip.flights.filter(flight => flight._id.toString() !== flightId);
    const updatedTrip = await trip.save();
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flight', error });
  }
});

module.exports = router;
