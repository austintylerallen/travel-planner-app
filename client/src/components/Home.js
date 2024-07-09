// client/src/components/Home.js
import React from 'react';
import airplaneImage from '../../src/images/airplane.jpg';
import Map from './Map';
import surfboards from '../../src/images/surfboards.jpg';
import peru from '../../src/images/peru.jpg';
import ourhike from '../../src/images/ourhike.jpg';

const testimonials = [
  {
    quote: "The most incredible experience! The trails were well-maintained, and the guides were knowledgeable and friendly.",
    name: "Jane Doe"
  },
  {
    quote: "Breathtaking views and unforgettable moments. Highly recommend to all nature lovers!",
    name: "John Smith"
  },
  {
    quote: "An adventure of a lifetime. Everything was perfectly organized, and the staff was fantastic.",
    name: "Emily Johnson"
  },
  // Add more testimonials as needed
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center my-8">
        <div className="relative h-96 overflow-hidden rounded-lg shadow-lg group">
          <img
            src={airplaneImage}
            alt="Adventure awaits"
            className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
            style={{ clipPath: 'inset(20% 0 20% 0)' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100">
            <h2 className="text-5xl font-bold text-white">Embark on Your Next Adventure with PeakPursuit</h2>
          </div>
        </div>
        <p className="mt-4 text-lg text-gray-700">Discover the best trails, gear, and tips for your next trekking journey.</p>
        <button className="mt-6 bg-primary text-white px-6 py-3 rounded hover:bg-secondary">Start Your Journey</button>
      </section>

      {/* About Section */}
      <section id="about" className="my-8 py-8 bg-gray-100 px-4 md:px-8">
        <h2 className="main-title">About PeakPursuit</h2>
        <p className="mt-4 text-lg text-gray-700">We enhance your hiking experiences by making them more adventurous and exciting. To capture this spirit, we have designed a dynamic and engaging platform that reflects these qualities.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
            <p className="mt-2 text-gray-700">We envision a world where everyone can connect with nature and experience the beauty of the outdoors.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
            <p className="mt-2 text-gray-700">Our mission is to provide safe and enriching hiking experiences for all levels. We offer guided tours that highlight natural beauty and promote sustainable tourism.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="my-8 py-8 px-4 md:px-8">
        <h2 className="main-title">Gallery</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <img src={surfboards} alt="Surfboards" className="w-full h-auto rounded shadow-md" />
          <img src={peru} alt="Mountain View in Peru" className="w-full h-auto rounded shadow-md" />
          <img src={ourhike} alt="Our Hike" className="w-full h-auto rounded shadow-md" />
          {/* Add more images as needed */}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="my-8 py-8 bg-gray-100 px-4 md:px-8">
        <h2 className="main-title">What People Say</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4 border rounded bg-white shadow-md">
              <p className="text-lg text-gray-700">"{testimonial.quote}"</p>
              <p className="mt-2 text-gray-500">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="my-8 py-8 px-4 md:px-8">
        <Map />
      </section>

      {/* Contact Section */}
      <section id="contact" className="my-8 py-8 px-4 md:px-8">
        <h2 className="main-title">Contact Us</h2>
        <form className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input type="text" className="mt-1 p-2 w-full border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" className="mt-1 p-2 w-full border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea className="mt-1 p-2 w-full border rounded"></textarea>
          </div>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary">Send</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
