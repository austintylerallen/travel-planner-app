const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config(); // Ensure dotenv is required to load environment variables

router.get('/place-details', async (req, res) => {
  const { input } = req.query;
  const googlePlacesApiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

  console.log('Using Google Places API Key:', googlePlacesApiKey); // Log API key for debugging

  try {
    console.log('Fetching place details for input:', input); // Log input
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
      params: {
        input,
        inputtype: 'textquery',
        fields: 'photos,name,rating,formatted_address',
        key: googlePlacesApiKey,
      },
    });
    console.log('Place details response:', response.data); // Log response data
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching place details:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching place details', error: error.response ? error.response.data : error.message });
  }
});

module.exports = router;
