// // client/src/components/Testimonials.js
// import React from 'react';

// const Testimonials = () => {
//   return (
//     <section className="my-8">
//       <h2 className="main-title">What People Say</h2>
//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <div className="p-4 border rounded bg-white shadow-md">
//           <p className="text-lg text-gray-700">"The most incredible experience! The trails were well-maintained, and the guides were knowledgeable and friendly."</p>
//           <p className="mt-2 text-gray-500">- Jane Doe</p>
//         </div>
//         <div className="p-4 border rounded bg-white shadow-md">
//           <p className="text-lg text-gray-700">"Breathtaking views and unforgettable moments. Highly recommend to all nature lovers!"</p>
//           <p className="mt-2 text-gray-500">- John Smith</p>
//         </div>
//         {/* Add more testimonials as needed */}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;


// client/src/components/Testimonials.js
import React from 'react';

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

const Testimonials = () => {
  return (
    <section className="my-8">
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
  );
};

export default Testimonials;
