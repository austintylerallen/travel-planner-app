import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import TripForm from './components/TripForm';
import FlightSearch from './components/FlightSearch';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import AuthPage from './components/AuthPage';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import { useAuth } from './context/AuthContext';
import Modal from 'react-modal';
import axios from './utils/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatDate, formatTime } from './utils/format';
import { getAirlineInfo } from './utils/airlines';

Modal.setAppElement('#root');

const App = () => {
  const { isAuthenticated, logout } = useAuth();
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('/trips');
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips', error);
      }
    };

    fetchTrips();
  }, []);

  const handleEditTrip = (trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTrip(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/trips/${id}`);
      alert('Trip deleted successfully');
      setTrips((prevTrips) => prevTrips.filter(trip => trip._id !== id));
    } catch (err) {
      alert('Error deleting trip');
    }
  };

  return (
    <div className="min-h-screen bg-light font-inter">
      <header className="text-center py-6 bg-white shadow-md">
        <h1 className="text-5xl font-bold text-primary">PeakPursuit</h1>
        {isAuthenticated && (
          <nav className="mt-4">
            <Link to="/" className="mx-2 text-primary hover:underline">Home</Link>
            <Link to="/create" className="mx-2 text-primary hover:underline">Create Trip</Link>
            <Link to="/about" className="mx-2 text-primary hover:underline">About</Link>
            <Link to="/gallery" className="mx-2 text-primary hover:underline">Gallery</Link>
            <Link to="/contact" className="mx-2 text-primary hover:underline">Contact</Link>
            <Link to="/profile" className="mx-2 text-primary hover:underline">Profile</Link>
            <button onClick={logout} className="mx-2 text-primary hover:underline">Logout</button>
          </nav>
        )}
      </header>
      <main className="container mx-auto p-6">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<TripForm onTripAdded={(trip) => setTrips((prev) => [...prev, trip])} />} />
              <Route path="/flights" element={<FlightSearch />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
            </>
          ) : (
            <Route path="/" element={<AuthPage />} />
          )}
        </Routes>
        {isAuthenticated && trips.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Trip List</h2>
            <ul className="space-y-4">
              {trips.map((trip) => (
                <li key={trip._id} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold">{trip.title}</h3>
                  <p>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                  <p>Destination: {trip.destination}</p>
                  {trip.placeDetails && (
                    <>
                      <p><strong>Address:</strong> {trip.placeDetails.formatted_address}</p>
                      {trip.placeDetails.photos && trip.placeDetails.photos.length > 0 && (
                        <img
                          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${trip.placeDetails.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
                          alt={trip.placeDetails.name}
                          className="mt-2 rounded-lg shadow-md"
                        />
                      )}
                    </>
                  )}
                  {trip.flights && trip.flights.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-bold">Flights:</h4>
                      <ul className="space-y-2">
                        {trip.flights.map((flight, index) => (
                          <li key={index} className="bg-gray-200 p-4 rounded-lg">
                            <p>Flight Number: {flight.flightNumber}</p>
                            <p>Airline: {getAirlineInfo(flight.airline).name}</p>
                            <img src={getAirlineInfo(flight.airline).logo} alt={getAirlineInfo(flight.airline).name} className="mt-2 w-16 h-16"/>
                            <p>Departure: {flight.departureAirport} at {formatTime(flight.departureTime)}</p>
                            <p>Arrival: {flight.arrivalAirport} at {formatTime(flight.arrivalTime)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button
                    onClick={() => handleEditTrip(trip)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-red-700 transition-colors ml-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="Edit Trip">
          {selectedTrip && (
            <TripForm
              trip={selectedTrip}
              onTripUpdated={(updatedTrip) => {
                setTrips((prevTrips) => prevTrips.map(t => t._id === updatedTrip._id ? updatedTrip : t));
                handleCloseModal();
              }}
              onClose={handleCloseModal}
            />
          )}
        </Modal>
      </main>
      <ToastContainer />
    </div>
  );
};

export default App;
