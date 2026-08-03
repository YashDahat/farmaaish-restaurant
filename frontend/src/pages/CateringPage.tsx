'use client';

import React from 'react';
import Image from 'next/image';
import CateringInquiryForm from '@/components/inquiry/CateringInquiryForm';

export default function CateringPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/images/catering-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="catering-hero-title">
            Exceptional Catering for Every Occasion
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" data-testid="catering-hero-description">
            Farmaaish Restaurant brings its culinary excellence to your special events. From intimate gatherings to grand celebrations, we craft unforgettable dining experiences tailored to your taste.
          </p>
        </div>
      </section>

      {/* Our Offerings Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800" data-testid="catering-offerings-title">
            Our Catering Offerings
          </h2>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            Whether it's a corporate event, a wedding, a birthday party, or any other special occasion, Farmaaish Restaurant offers a diverse range of catering options to suit your needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center">
              <Image src="/images/catering-corporate.jpg" alt="Corporate Events" width={300} height={200} className="rounded-lg mb-4 object-cover h-48 w-full" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Corporate Events</h3>
              <p className="text-gray-700 leading-relaxed">
                Impress your clients and colleagues with our sophisticated menus, perfect for business lunches, conferences, and office parties.
              </p>
            </div>
            <div className="card bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center">
              <Image src="/images/catering-weddings.jpg" alt="Weddings" width={300} height={200} className="rounded-lg mb-4 object-cover h-48 w-full" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Weddings & Receptions</h3>
              <p className="text-gray-700 leading-relaxed">
                Make your special day even more memorable with our exquisite wedding catering, designed to delight every guest.
              </p>
            </div>
            <div className="card bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center">
              <Image src="/images/catering-parties.jpg" alt="Private Parties" width={300} height={200} className="rounded-lg mb-4 object-cover h-48 w-full" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Private Parties</h3>
              <p className="text-gray-700 leading-relaxed">
                Celebrate birthdays, anniversaries, and family gatherings with a custom menu that reflects your personal style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800" data-testid="catering-inquiry-title">
            Inquire About Our Catering Services
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
            Please fill out the form below with details about your event, and our catering team will get back to you shortly.
          </p>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
            <CateringInquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}