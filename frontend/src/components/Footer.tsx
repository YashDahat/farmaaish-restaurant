<footer className="bg-[#800020] text-white py-8 px-4">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-xl font-semibold mb-4">Farmaaish Restaurant</h3>
      <p className="text-center md:text-left">Kundan Garden, Baner Rd, Near Veritas Software,</p>
      <p className="text-center md:text-left">Baner, Pune, Maharashtra 411069</p>
      <p className="mt-2">Phone: 020 2729 1111</p>
    </div>

    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
      <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
      <p>Saturday - Sunday: 12:00 PM - 11:00 PM</p>
    </div>

    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
      <div className="flex space-x-4">
        {/* Placeholder social media icons */}
        <a href="#" className="text-white hover:text-[#D4AF37] transition-all duration-200" aria-label="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#" className="text-white hover:text-[#D4AF37] transition-all duration-200" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
        <a href="#" className="text-white hover:text-[#D4AF37] transition-all duration-200" aria-label="Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
        </a>
      </div>
    </div>
  </div>
  <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm">
    &copy; {new Date().getFullYear()} Farmaaish Restaurant. All rights reserved.
  </div>
</footer>