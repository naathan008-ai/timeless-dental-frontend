import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaSignOutAlt, FaHome, FaBars, FaTimes, FaTooth } from 'react-icons/fa';
import { RiCalendarCheckLine, RiRobotLine, RiMessage2Line } from 'react-icons/ri';

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
    <nav className="bg-white/80 backdrop-blur-md shadow-glass sticky top-0 z-50 border-b border-white/20 rounded-b-4xl transition-all duration-500 hover:shadow-2xl">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          {/* Logo - bigger teeth and text */}
          <Link to="/" className="flex items-center space-x-5 group" onClick={() => setMenuOpen(false)}>
            <div className="flex items-center space-x-1 group-hover:scale-105 transition-transform duration-300">
              <FaTooth className="text-dental-red transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" style={{ fontSize: '28px' }} />
              <FaTooth className="text-dental-red transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" style={{ fontSize: '34px' }} />
              <FaTooth className="text-dental-red transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" style={{ fontSize: '40px' }} />
              <FaTooth className="text-dental-red transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" style={{ fontSize: '34px' }} />
            </div>
            <span className="text-3xl md:text-4xl font-bold text-dental-red tracking-wider group-hover:tracking-widest transition-all duration-300">
              TIMELESS DENTAL CLINIC
            </span>
          </Link>

          {/* Desktop Menu - bigger spacing and font */}
          <div className="hidden md:flex items-center space-x-10 text-lg">
            {isAuthenticated ? (
              <>
                {isClient && (
                  <>
                    <Link to="/appointments/book" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium">
                      <RiCalendarCheckLine className="mr-2 text-xl" /> Book
                    </Link>
                    <Link to="/appointments/view" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 font-medium">
                      My Appointments
                    </Link>
                    <Link to="/ai-chat" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium">
                      <RiRobotLine className="mr-2 text-xl" /> AI Assistant
                    </Link>
                  </>
                )}
                {(isReceptionist || isIT) && (
                  <Link to={isIT ? "/it/dashboard" : "/reception/dashboard"} className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 font-medium">
                    Dashboard
                  </Link>
                )}
                <Link to="/locations" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 font-medium">Locations</Link>
                <Link to="/contact" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium">
                  <RiMessage2Line className="mr-2 text-xl" /> Contact
                </Link>
                <div className="flex items-center space-x-5 border-l-2 border-gray-200/50 pl-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center shadow-inner hover:shadow-glow transition-all duration-300">
                    <FaUser className="text-dental-red text-2xl" />
                  </div>
                  <span className="text-gray-700 font-medium text-lg">{user?.username}</span>
                  <span className="text-sm bg-gray-200/80 backdrop-blur-sm text-gray-600 px-4 py-1.5 rounded-full capitalize font-medium">{user?.role}</span>
                </div>
                <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-all duration-300 hover:scale-105 font-medium text-lg">
                  <FaSignOutAlt /><span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium"><FaHome className="mr-2" /> Home</Link>
                <Link to="/locations" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 font-medium">Locations</Link>
                <Link to="/contact" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 flex items-center font-medium">
                  <RiMessage2Line className="mr-2 text-xl" /> Contact
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-105 font-medium">Login</Link>
                <Link to="/register" className="btn-primary text-base py-3 px-8 rounded-2xl hover:shadow-glow-lg transition-all duration-300 hover:scale-105">Register</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl text-gray-700 hover:text-dental-red transition-all duration-300 hover:scale-110">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pt-6 pb-8 border-t border-gray-200/50 animate-fade-in">
            {isAuthenticated ? (
              <div className="space-y-5">
                <div className="flex items-center space-x-4 px-4 py-4 bg-gray-50/50 backdrop-blur-sm rounded-2xl">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-dental-red text-2xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">{user?.username}</p>
                    <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                {isClient && (
                  <>
                    <Link to="/appointments/book" className="block px-4 py-4 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition-all duration-300 hover:scale-105 text-lg" onClick={() => setMenuOpen(false)}>
                      <RiCalendarCheckLine className="inline mr-3 text-xl" /> Book Appointment
                    </Link>
                    <Link to="/appointments/view" className="block px-4 py-4 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition-all duration-300 hover:scale-105 text-lg" onClick={() => setMenuOpen(false)}>
                      My Appointments
                    </Link>
                    <Link to="/ai-chat" className="block px-4 py-4 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition-all duration-300 hover:scale-105 text-lg" onClick={() => setMenuOpen(false)}>
                      <RiRobotLine className="inline mr-3 text-xl" /> AI CHAT
                    </Link>
                  </>
                )}
                {(isReceptionist || isIT) && (
                  <Link to={isIT ? "/it/dashboard" : "/reception/dashboard"} className="block px-4 py-4 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition-all duration-300 hover:scale-105 text-lg" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                )}
                <Link to="/locations" className="block px-4 py-4 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition-all duration-300 hover:scale-105 text-lg" onClick={() => setMenuOpen(false)}>Locations</Link>
                <Link to="/contact" className="block px-4 py-4 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition-all duration-300 hover:scale-105 text-lg" onClick={() => setMenuOpen(false)}>
                  <RiMessage2Line className="inline mr-3 text-xl" /> Contact
                </Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 hover:scale-105 font-semibold text-lg">
                  <FaSignOutAlt className="inline mr-3" /> Logout
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <Link to="/" className="block px-4 py-4 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition-all duration-300 hover:scale-105 text-lg" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/locations" className="block px-4 py-4 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition-all duration-300 hover:scale-105 text-lg" onClick={() => setMenuOpen(false)}>Locations</Link>
                <Link to="/contact" className="block px-4 py-4 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition-all duration-300 hover:scale-105 text-lg" onClick={() => setMenuOpen(false)}>
                  <RiMessage2Line className="inline mr-3 text-xl" /> Contact
                </Link>
                <Link to="/login" className="block px-4 py-4 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition-all duration-300 hover:scale-105 text-lg" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block px-4 py-4 bg-dental-red text-white rounded-2xl hover:bg-dental-dark-red transition-all duration-300 hover:scale-105 text-center shadow-glow text-lg" onClick={() => setMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;