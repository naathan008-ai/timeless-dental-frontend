import React from 'react';
import { Link } from 'react-router-dom';
import { FaTooth, FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/95 backdrop-blur-sm text-white mt-20 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <FaTooth className="text-red-400 text-2xl" />
              <span className="text-xl font-bold text-red-400">Timeless Dental</span>
            </Link>
            <p className="text-gray-400 text-sm">Professional dental care in Harare. Your smile is our priority.</p>
            <div className="flex space-x-4 mt-4">
              {/* Facebook – updated with your page */}
              <a
                href="https://www.facebook.com/TimelessDentalClinic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition"
                aria-label="Facebook"
              >
                <FaFacebook size={22} />
              </a>
              {/* Instagram – updated with your handle */}
              <a
                href="https://www.instagram.com/timeless_dental/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition"
                aria-label="Instagram"
              >
                <FaInstagram size={22} />
              </a>
              {/* Twitter – keep as placeholder, replace when needed */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition"
                aria-label="Twitter"
              >
                <FaTwitter size={22} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-red-400 transition">Home</Link></li>
              <li><Link to="/appointments/book" className="hover:text-red-400 transition">Book Appointment</Link></li>
              <li><Link to="/appointments/view" className="hover:text-red-400 transition">My Appointments</Link></li>
              <li><Link to="/ai-chat" className="hover:text-red-400 transition">AI Chat</Link></li>
              <li><Link to="/locations" className="hover:text-red-400 transition">Locations</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <FaPhone className="text-red-400 mt-1" />
                <span>(024)2333271</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaEnvelope className="text-red-400 mt-1" />
                <span>timelessdentalclinic@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-red-400 mt-1" />
                <span>Westgate Mall, Harare</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start space-x-3">
                <FaClock className="text-red-400 mt-1" />
                <div>
                  <p>Mon–Fri: 9:00–17:00</p>
                  <p className="text-sm text-gray-500">Last appointment: 16:00</p>
                  <p>Sat: 9:00–13:00</p>
                  <p className="text-sm text-gray-500">Sunday: Closed</p>
                </div>
              </li>
              <li className="text-sm text-red-400">Emergency: (024)2333271</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © {year} Timeless Dental Clinic. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;