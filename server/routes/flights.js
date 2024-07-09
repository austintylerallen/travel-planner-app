// server/routes/flights.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
    const { origin, destination, departureDate } = req.query;
    try {
        const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
            headers: {
                'Authorization': `Bearer YOUR_AMADEUS_API_KEY`
            },
            params: {
                originLocationCode: origin,
                destinationLocationCode: destination,
                departureDate: departureDate,
                adults: 1
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
