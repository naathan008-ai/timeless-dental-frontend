import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTooth, FaCalendarCheck, FaCommentMedical, FaUserMd, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <div className="bg-gradient-to-br from-dental-red to-dental-dark-red text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <FaTooth className="text-7xl mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Timeless Dental Clinic</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto mb-8">Your smile is our priority. Professional care with a personal touch.</p>
          {isAuthenticated ? (
            <Link to="/appointments/book" className="btn-primary bg-white text-dental-red hover:bg-red-50 inline-flex items-center">Book Now <FaArrowRight className="ml-2" /></Link>
          ) : (
            <div className="flex justify-center space-x-4">
              <Link to="/register" className="btn-primary bg-white text-dental-red hover:bg-red-50">Get Started</Link>
              <Link to="/login" className="btn-secondary border-white text-white hover:bg-red-700">Login</Link>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center hover:scale-105 transition">
            <FaCalendarCheck className="text-5xl text-dental-red mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
            <p className="text-gray-600">View real-time availability and book instantly.</p>
          </div>
          <div className="card text-center hover:scale-105 transition">
            <FaCommentMedical className="text-5xl text-dental-red mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">AI Assistant</h3>
            <p className="text-gray-600">Get dental advice 24/7 when staff is unavailable.</p>
          </div>
          <div className="card text-center hover:scale-105 transition">
            <FaUserMd className="text-5xl text-dental-red mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Expert Dentists</h3>
            <p className="text-gray-600">Experienced professionals in two Harare locations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;