import type { JSX } from 'react';
import React from 'react';

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold text-white mb-4">Farmaaish Restaurant</h3>
          <p className="text-gray-400 leading-relaxed">
            Experience the rich flavors of authentic Indian cuisine, crafted with passion and tradition.
            Farmaaish brings you a culinary journey like no other.
          </p>
        </div>
    
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Contact Us</h4>
          <p className="text-gray-400">123 Spice Route, Culinary City, CA 90210</p>
          <p className="text-gray-400">Phone: (123) 456-7890</p>
          <p className="text-gray-400">Email: info@farmaaish.com</p>
        </div>
    
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Opening Hours</h4>
          <p className="text-gray-400">Monday - Friday: 11:00 AM - 10:00 PM</p>
          <p className="text-gray-400">Saturday - Sunday: 12:00 PM - 11:00 PM</p>
        </div>
      </div>
    
      <div className="max-w-7xl mx-auto border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Farmaaish Restaurant. All rights reserved.
      </div>
    </footer>
  );
}
