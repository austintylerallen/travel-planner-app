const express = require('express');
const axios = require('axios');
const router = express.Router();

let amadeusAccessToken = '';
let tokenExpiryTime = null;

const getAmadeusAccessToken = async () => {
  try {
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    amadeusAccessToken = response.data.access_token;
    tokenExpiryTime = Date.now() + (response.data.expires_in * 1000); // Store the token expiry time
    console.log('Amadeus access token retrieved:', amadeusAccessToken); // Log the token for debugging
  } catch (error) {
    console.error('Error fetching Amadeus access token', error);
  }
};

// Middleware to ensure we have a valid access token
const ensureAccessToken = async (req, res, next) => {
  if (!amadeusAccessToken || Date.now() >= tokenExpiryTime) {
    console.log('Access token expired or not found, retrieving new token');
    await getAmadeusAccessToken();
  } else {
    console.log('Using existing access token:', amadeusAccessToken);
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
        adults: 1,
      },
      headers: {
        'Authorization': `Bearer ${amadeusAccessToken}`,
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    // If the token is expired, get a new token and retry the request
    if (error.response && error.response.status === 401 && error.response.data.title === 'Access token expired') {
      console.log('Access token expired, retrieving new token');
      await getAmadeusAccessToken();
      // Retry the request
      try {
        const retryResponse = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
          params: {
            originLocationCode: origin.toUpperCase(),
            destinationLocationCode: destination.toUpperCase(),
            departureDate: date,
            adults: 1,
          },
          headers: {
            'Authorization': `Bearer ${amadeusAccessToken}`,
            'Content-Type': 'application/json',
          }
        });
        return res.status(200).json(retryResponse.data);
      } catch (retryError) {
        console.error('Error fetching flight data from Amadeus after token refresh', retryError.response?.data || retryError);
        return res.status(retryError.response?.status || 500).json(retryError.response?.data || { message: 'Internal Server Error' });
      }
    } else {
      console.error('Error fetching flight data from Amadeus', error.response?.data || error);
      res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
    }
  }
});

module.exports = router;
