import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaSignOutAlt, FaHome, FaBars, FaTimes, FaTooth } from 'react-icons/fa';
import { RiCalendarCheckLine, RiRobotLine, RiMessage2Line, RiServiceLine } from 'react-icons/ri';

const Navbar = () => {
  const { user, logout, isAuthenticated, isClient, isReceptionist, isIT } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-glass sticky top-0 z-50 border-b border-white/20 rounded-b-3xl transition-all duration-500 hover:shadow-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo with 3 teeth – bigger one in the middle */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={() => setMenuOpen(false)}>
            <div className="flex items-center space-x-0.5 group-hover:scale-105 transition-transform duration-300">
              <FaTooth className="text-dental-red transition-transform duration-300 group-hover:rotate-12" style={{ fontSize: '20px' }} />
              <FaTooth className="text-dental-red transition-transform duration-300 group-hover:rotate-12" style={{ fontSize: '28px' }} />
              <FaTooth className="text-dental-red transition-transform duration-300 group-hover:rotate-12" style={{ fontSize: '20px' }} />
            </div>
            <span className="text-xl md:text-2xl font-bold text-dental-red tracking-wide group-hover:tracking-wider transition-all duration-300 whitespace-nowrap">
              TIMELESS DENTAL
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-5 text-sm">
            {isAuthenticated ? (
              <>
                {isClient && (
                  <>
                    <Link to="/appointments/book" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium whitespace-nowrap">
                      <RiCalendarCheckLine className="mr-1 text-base" /> Book
                    </Link>
                    <Link to="/appointments/view" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 font-medium whitespace-nowrap">
                      My Appointments
                    </Link>
                  </>
                )}
                {(isReceptionist || isIT) && (
                  <Link to={isIT ? "/it/dashboard" : "/reception/dashboard"} className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 font-medium whitespace-nowrap">
                    Dashboard
                  </Link>
                )}
                <Link to="/ai-chat" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium whitespace-nowrap">
                  <RiRobotLine className="mr-1 text-base" /> AI Assistant
                </Link>
                <Link to="/services" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium whitespace-nowrap">
                  <RiServiceLine className="mr-1 text-base" /> Services
                </Link>
                <Link to="/locations" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 font-medium whitespace-nowrap">
                  Locations
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium whitespace-nowrap">
                  <RiMessage2Line className="mr-1 text-base" /> Contact
                </Link>
                <div className="flex items-center space-x-2 border-l-2 border-gray-200/50 pl-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center shadow-inner">
                    <FaUser className="text-dental-red text-sm" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm whitespace-nowrap">{user?.username}</span>
                  <span className="text-xs bg-gray-200/80 backdrop-blur-sm text-gray-600 px-2 py-1 rounded-full capitalize font-medium whitespace-nowrap">{user?.role}</span>
                </div>
                <button onClick={handleLogout} className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-all duration-300 hover:scale-105 font-medium text-sm whitespace-nowrap">
                  <FaSignOutAlt /><span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium whitespace-nowrap">
                  <FaHome className="mr-1" /> Home
                </Link>
                <Link to="/ai-chat" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium whitespace-nowrap">
                  <RiRobotLine className="mr-1 text-base" /> AI Assistant
                </Link>
                <Link to="/services" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium whitespace-nowrap">
                  <RiServiceLine className="mr-1 text-base" /> Services
                </Link>
                <Link to="/locations" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 font-medium whitespace-nowrap">
                  Locations
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium whitespace-nowrap">
                  <RiMessage2Line className="mr-1 text-base" /> Contact
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 font-medium whitespace-nowrap">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4 rounded-xl hover:shadow-glow transition-all duration-300 hover:scale-105 whitespace-nowrap">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-2xl text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-110">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pt-4 pb-6 border-t border-gray-200/50 animate-fade-in">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-3 py-3 bg-gray-50/50 backdrop-blur-sm rounded-xl">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-dental-red text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user?.username}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                {isClient && (
                  <>
                    <Link to="/appointments/book" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>
                      <RiCalendarCheckLine className="inline mr-2 text-base" /> Book Appointment
                    </Link>
                    <Link to="/appointments/view" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>
                      My Appointments
                    </Link>
                  </>
                )}
                {(isReceptionist || isIT) && (
                  <Link to={isIT ? "/it/dashboard" : "/reception/dashboard"} className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                )}
                <Link to="/ai-chat" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>
                  <RiRobotLine className="inline mr-2 text-base" /> AI Assistant
                </Link>
                <Link to="/services" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>
                  <RiServiceLine className="inline mr-2 text-base" /> Services
                </Link>
                <Link to="/locations" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>Locations</Link>
                <Link to="/contact" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>
                  <RiMessage2Line className="inline mr-2 text-base" /> Contact
                </Link>
                <button onClick={handleLogout} className="w-full text-left px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-105 font-semibold">
                  <FaSignOutAlt className="inline mr-2" /> Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/ai-chat" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>
                  <RiRobotLine className="inline mr-2 text-base" /> AI Assistant
                </Link>
                <Link to="/services" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>
                  <RiServiceLine className="inline mr-2 text-base" /> Services
                </Link>
                <Link to="/locations" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>Locations</Link>
                <Link to="/contact" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>
                  <RiMessage2Line className="inline mr-2 text-base" /> Contact
                </Link>
                <Link to="/login" className="block px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-xl transition-all duration-300 hover:scale-105" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block px-3 py-3 bg-dental-red text-white rounded-xl hover:bg-dental-dark-red transition-all duration-300 hover:scale-105 text-center shadow-glow" onClick={() => setMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;