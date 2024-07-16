import axios from 'axios';

const fetchPlaceDetails = async (input) => {
  try {
    console.log('Fetching place details for input:', input); // Log input
    const response = await axios.get('http://localhost:4000/api/google-places/place-details', {
      params: { input },
    });
    console.log('Place details response:', response.data); // Log response data
    return response.data;
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
};

export { fetchPlaceDetails };
