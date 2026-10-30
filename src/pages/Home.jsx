import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaTooth, FaCalendarCheck, FaCommentMedical, FaUserMd,
  FaClock, FaHeart, FaAward, FaUsers, FaArrowRight, FaSmile
} from 'react-icons/fa';
import { RiServiceLine } from 'react-icons/ri';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* ---------- HERO SECTION ---------- */}
      <div className="relative bg-gradient-to-br from-red-600 to-dental-dark-red text-white py-20 rounded-3xl overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-1 animate-float">
                <FaTooth className="text-6xl md:text-7xl dental-icon" />
                <FaTooth className="text-8xl md:text-8xl dental-icon" />
                <FaTooth className="text-6xl md:text-6xl dental-icon" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">
              Timeless Dental Clinic
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-2xl mx-auto">
              Your smile is our priority. Professional dental care with a personal touch.
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/appointments/book"
                    className="btn-primary bg-white text-dental-red hover:bg-red-50 inline-flex items-center"
                  >
                    Book Appointment <FaArrowRight className="ml-2" />
                  </Link>
                  <Link
                    to="/services"
                    className="btn-secondary border-white text-white hover:bg-red-700 inline-flex items-center"
                  >
                    <RiServiceLine className="mr-2 text-xl" /> Our Services
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-primary bg-white text-dental-red hover:bg-red-50 inline-flex items-center"
                  >
                    Get Started <FaArrowRight className="ml-2" />
                  </Link>
                  <Link
                    to="/services"
                    className="btn-secondary border-white text-white hover:bg-red-700 inline-flex items-center"
                  >
                    <RiServiceLine className="mr-2 text-xl" /> Our Services
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- FEATURES SECTION ---------- */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Why Choose Timeless Dental?
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We combine modern technology with a patient‑first approach to deliver dental care you can trust.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg mb-4">
              <FaCalendarCheck className="text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Easy Booking</h3>
            <p className="text-gray-600 mb-4">
              View real-time availability and book your appointment instantly online.
            </p>
            <Link
              to={isAuthenticated ? '/appointments/book' : '/register'}
              className="text-dental-red font-semibold hover:text-dental-dark-red inline-flex items-center"
            >
              Learn More <FaArrowRight className="ml-1" />
            </Link>
          </div>

          <div className="card text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg mb-4">
              <FaCommentMedical className="text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">AI Assistant</h3>
            <p className="text-gray-600 mb-4">
              Get instant dental advice from our AI assistant, available 24/7.
            </p>
            <Link
              to={isAuthenticated ? '/ai-chat' : '/register'}
              className="text-dental-red font-semibold hover:text-dental-dark-red inline-flex items-center"
            >
              Learn More <FaArrowRight className="ml-1" />
            </Link>
          </div>

          <div className="card text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg mb-4">
              <FaUserMd className="text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Expert Dentists</h3>
            <p className="text-gray-600 mb-4">
              Our team of experienced professionals provides comprehensive dental care.With the finest equipment and techniques, we ensure your comfort and safety.
            </p>
            <Link
              to="/services"
              className="text-dental-red font-semibold hover:text-dental-dark-red inline-flex items-center"
            >
              Learn More <FaArrowRight className="ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- CTA SECTION ---------- */}
      <div className="bg-gradient-to-br from-red-600 to-dental-dark-red text-white py-20 rounded-3xl mx-4 my-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Smile?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the Timeless Dental difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={isAuthenticated ? '/appointments/book' : '/register'}
              className="btn-primary bg-white text-dental-red hover:bg-red-50 inline-flex items-center"
            >
              Book Now <FaArrowRight className="ml-2" />
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;