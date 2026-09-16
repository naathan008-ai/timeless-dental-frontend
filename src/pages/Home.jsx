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
                <FaTooth className="text-5xl md:text-6xl dental-icon" />
                <FaTooth className="text-6xl md:text-7xl dental-icon" />
                <FaTooth className="text-7xl md:text-8xl dental-icon" />
                <FaTooth className="text-6xl md:text-7xl dental-icon" />
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
              Our team of experienced professionals provides comprehensive dental care.
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

      {/* ---------- STATS SECTION ---------- */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-dental-red mb-2">2</div>
              <p className="text-gray-600">Branches</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-dental-red mb-2">1000+</div>
              <p className="text-gray-600">Happy Patients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-dental-red mb-2">10+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-dental-red mb-2">24/7</div>
              <p className="text-gray-600">AI Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- SERVICES SECTION ---------- */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-xl">
              A full spectrum of dental services under one roof, delivered by specialists who care.
            </p>
          </div>
          <Link
            to="/services"
            className="btn-secondary inline-flex items-center"
          >
            View All Services <FaArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-white shadow mb-4">
              <FaTooth className="text-xl" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">General Dentistry</h4>
            <p className="text-gray-600 text-sm">
              Check-ups, cleanings, and preventive care to keep your smile healthy.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-red-600 text-white shadow mb-4">
              <FaSmile className="text-xl" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">Cosmetic Dentistry</h4>
            <p className="text-gray-600 text-sm">
              Teeth whitening, veneers, and smile makeovers for a brighter smile.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white shadow mb-4">
              <FaHeart className="text-xl" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">Emergency Care</h4>
            <p className="text-gray-600 text-sm">
              Immediate relief and expert care for dental emergencies, day or night.
            </p>
          </div>
        </div>
      </div>

      {/* ---------- TESTIMONIALS / TRUST SECTION ---------- */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Trusted by Hundreds of Patients
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FaUsers className="text-dental-red" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Friendly Staff</p>
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The team is incredibly welcoming and professional. I've never felt more comfortable at a dentist."
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FaAward className="text-dental-red" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Modern Equipment</p>
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Their state-of-the-art technology made my treatment fast and painless."
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FaClock className="text-dental-red" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Quick Booking</p>
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Booking online was so easy and the AI assistant answered all my questions instantly."
              </p>
            </div>
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
            <Link
              to="/services"
              className="btn-secondary border-white text-white hover:bg-red-700 inline-flex items-center"
            >
              <RiServiceLine className="mr-2 text-xl" /> Explore Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;