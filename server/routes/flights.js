const express = require('express');
const axios = require('axios');
const router = express.Router();

let amadeusAccessToken = '';

const getAmadeusAccessToken = async () => {
  try {
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET,
    }));
    amadeusAccessToken = response.data.access_token;
  } catch (error) {
    console.error('Error fetching Amadeus access token', error);
  }
};

// Middleware to ensure we have a valid access token
const ensureAccessToken = async (req, res, next) => {
  if (!amadeusAccessToken) {
    await getAmadeusAccessToken();
  }
  next();
};

router.get('/search', ensureAccessToken, async (req, res) => {
  const { origin, destination, date } = req.query;

  try {
    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      params: {
        originLocationCode: origin.toUpperCase(),
        destinationLocationCode: destination.toUpperCase(),
        departureDate: date,
        adults: 1, // Adjust as needed
      },
      headers: {
        'Authorization': `Bearer ${amadeusAccessToken}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching flight data from Amadeus', error.response.data);
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;
