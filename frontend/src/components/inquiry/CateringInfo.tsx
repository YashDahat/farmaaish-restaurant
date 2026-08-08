import type { JSX } from 'react';
import React from 'react';

export default function CateringInfo(): JSX.Element {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">
          Our Catering Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Exquisite Menu Selection</h3>
            <p className="text-gray-700 leading-relaxed">
              Farmaaish offers a diverse menu featuring authentic Mughlai cuisine,
              from rich curries and succulent kebabs to aromatic biryanis and decadent desserts.
              We cater to various dietary preferences and can customize our offerings to suit your event's theme.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Service</h3>
            <p className="text-gray-700 leading-relaxed">
              Our experienced catering team is dedicated to providing impeccable service,
              ensuring every detail is handled with precision. From setup to serving and cleanup,
              we guarantee a seamless and memorable experience for you and your guests.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Customizable Packages</h3>
            <p className="text-gray-700 leading-relaxed">
              Whether it's an intimate gathering or a grand celebration,
              we offer flexible catering packages tailored to your specific needs and budget.
              Choose from buffet style, plated dinners, or live cooking stations to create the perfect ambiance.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Perfect for Any Occasion</h3>
            <p className="text-gray-700 leading-relaxed">
              Farmaaish catering is ideal for weddings, corporate events, birthday parties,
              anniversaries, and any special occasion where exceptional food and service are paramount.
              Let us transform your event into an extraordinary culinary journey.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quality Ingredients</h3>
            <p className="text-gray-700 leading-relaxed">
              We pride ourselves on using only the freshest, highest quality ingredients,
              sourced from trusted local suppliers. Our chefs meticulously prepare each dish
              to ensure authentic flavors and an unforgettable dining experience.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Seamless Planning</h3>
            <p className="text-gray-700 leading-relaxed">
              Our dedicated event planners work closely with you from concept to execution,
              providing expert guidance and support every step of the way.
              We ensure a stress-free planning process, allowing you to relax and enjoy your event.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
