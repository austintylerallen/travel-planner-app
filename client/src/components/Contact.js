// client/src/components/Contact.js
import React from 'react';

const Contact = () => {
  return (
    <section className="my-8">
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
  );
};

export default Contact;
