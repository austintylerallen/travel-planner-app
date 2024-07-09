// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const tripsRouter = require('./routes/trips');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

const mongoURI = process.env.MONGOURI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

app.use(cors());
app.use(bodyParser.json());

app.use('/trips', tripsRouter);

app.get('/', (req, res) => {
    res.send('Server is running');
});

module.exports = app;
