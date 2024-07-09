// client/src/components/Gallery.js
import React from 'react';
import surfboards from '../images/surfboards.jpg';
import peru from '../images/peru.jpg';
import ourhike from '../images/ourhike.jpg';

const Gallery = () => {
  return (
    <section className="my-8">
      <h2 className="main-title">Gallery</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <img src={surfboards} alt="Surfboards" className="w-full h-auto rounded shadow-md" />
        <img src={peru} alt="Mountain View in Peru" className="w-full h-auto rounded shadow-md" />
        <img src={ourhike} alt="Our Hike" className="w-full h-auto rounded shadow-md" />
        {/* Add more images as needed */}
      </div>
    </section>
  );
};

export default Gallery;
