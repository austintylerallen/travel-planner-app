// client/src/components/About.js
import React from 'react';

const About = () => {
  return (
    <section className="my-8">
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
  );
};

export default About;
