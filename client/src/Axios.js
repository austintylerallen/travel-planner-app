// axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000', // Adjust to your backend URL
  withCredentials: true, // Send cookies with requests if using sessions or tokens
});

export default instance;
