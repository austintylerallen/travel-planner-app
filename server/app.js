const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const tripRouter = require('./routes/trips');
const flightRouter = require('./routes/flights');
const googlePlacesRouter = require('./utils'); // Add this line

require('dotenv').config();

const app = express();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3001', // Replace with your frontend URL
  credentials: true, // This allows cookies to be sent with the requests
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(bodyParser.json());

app.use('/api/auth', authRouter); // Use the authentication routes
app.use('/api/trips', tripRouter); // Use the trip routes
app.use('/api/flights', flightRouter); // Use the flight routes
app.use('/api/google-places', googlePlacesRouter); // Use the Google Places routes

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
