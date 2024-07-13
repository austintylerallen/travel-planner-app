import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import TripForm from './components/TripForm';
import TripList from './components/TripList';
import FlightSearch from './components/FlightSearch';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import AuthPage from './components/AuthPage';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated, logout } = useAuth();
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const handleTripAdded = (newTrip) => {
    setTrips([...trips, newTrip]);
    navigate('/trips'); // Redirect to trip list page
  };

  const handleTripUpdated = (updatedTrip) => {
    setTrips(trips.map(trip => trip._id === updatedTrip._id ? updatedTrip : trip));
    navigate('/trips'); // Redirect to trip list page
  };

  return (
    <div className="min-h-screen bg-light font-inter">
      <header className="text-center py-6 bg-white shadow-md">
        <h1 className="text-5xl font-bold text-primary">PeakPursuit</h1>
        {isAuthenticated && (
          <nav className="mt-4">
            <Link to="/" className="mx-2 text-primary hover:underline">Home</Link>
            <Link to="/create" className="mx-2 text-primary hover:underline">Create Trip</Link>
            <Link to="/trips" className="mx-2 text-primary hover:underline">Trip List</Link>
            <Link to="/flights" className="mx-2 text-primary hover:underline">Search Flights</Link>
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
              <Route path="/create" element={<TripForm onTripAdded={handleTripAdded} />} />
              <Route path="/trips" element={<TripList trips={trips} setTrips={setTrips} />} />
              <Route path="/edit/:id" element={<TripForm onTripUpdated={handleTripUpdated} />} />
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
      </main>
      {isAuthenticated && (
        <footer className="footer text-center bg-dark text-white p-6">
          <p>&copy; 2024 PeakPursuit. All rights reserved.</p>
          <div className="mt-4">
            <Link to="/" className="mx-2 text-accent hover:underline">Home</Link>
            <Link to="/about" className="mx-2 text-accent hover:underline">About</Link>
            <Link to="/gallery" className="mx-2 text-accent hover:underline">Gallery</Link>
            <Link to="/contact" className="mx-2 text-accent hover:underline">Contact</Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
