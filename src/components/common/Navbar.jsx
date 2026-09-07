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
    <nav className="bg-white/80 backdrop-blur-md shadow-glass sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={() => setMenuOpen(false)}>
            <div className="flex items-center space-x-0.5">
              <FaTooth className="text-dental-red transition-transform duration-300 group-hover:scale-110" style={{ fontSize: '18px' }} />
              <FaTooth className="text-dental-red transition-transform duration-300 group-hover:scale-110" style={{ fontSize: '22px' }} />
              <FaTooth className="text-dental-red transition-transform duration-300 group-hover:scale-110" style={{ fontSize: '28px' }} />
              <FaTooth className="text-dental-red transition-transform duration-300 group-hover:scale-110" style={{ fontSize: '22px' }} />
            </div>
            <span className="text-2xl font-bold text-dental-red tracking-wide">
              TIMELESS DENTAL
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                {isClient && (
                  <>
                    <Link to="/appointments/book" className="text-gray-700 hover:text-dental-red transition flex items-center">
                      <RiCalendarCheckLine className="mr-2 text-lg" /> Book
                    </Link>
                    <Link to="/appointments/view" className="text-gray-700 hover:text-dental-red transition">
                      My Appointments
                    </Link>
                    <Link to="/ai-chat" className="text-gray-700 hover:text-dental-red transition flex items-center">
                      <RiRobotLine className="mr-2 text-lg" /> AI Assistant
                    </Link>
                  </>
                )}
                {(isReceptionist || isIT) && (
                  <Link to={isIT ? "/it/dashboard" : "/reception/dashboard"} className="text-gray-700 hover:text-dental-red transition">
                    Dashboard
                  </Link>
                )}
                <Link to="/locations" className="text-gray-700 hover:text-dental-red transition">Locations</Link>
                <Link to="/contact" className="text-gray-700 hover:text-dental-red transition flex items-center">
                  <RiMessage2Line className="mr-2 text-lg" /> Contact
                </Link>
                <div className="flex items-center space-x-3 border-l-2 border-gray-200/50 pl-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center shadow-inner">
                    <FaUser className="text-dental-red text-sm" />
                  </div>
                  <span className="text-gray-700 font-medium">{user?.username}</span>
                  <span className="text-xs bg-gray-200/80 backdrop-blur-sm text-gray-600 px-2 py-1 rounded-full capitalize">{user?.role}</span>
                </div>
                <button onClick={handleLogout} className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition font-medium">
                  <FaSignOutAlt /><span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-dental-red transition"><FaHome className="inline mr-1" /> Home</Link>
                <Link to="/locations" className="text-gray-700 hover:text-dental-red transition">Locations</Link>
                <Link to="/contact" className="text-gray-700 hover:text-dental-red transition flex items-center">
                  <RiMessage2Line className="mr-2 text-lg" /> Contact
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-dental-red transition">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Register</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl text-gray-700 hover:text-dental-red transition">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200/50 animate-fade-in">
            {isAuthenticated ? (
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50/50 backdrop-blur-sm rounded-2xl">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-dental-red" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user?.username}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                {isClient && (
                  <>
                    <Link to="/appointments/book" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition" onClick={() => setMenuOpen(false)}>
                      <RiCalendarCheckLine className="inline mr-2" /> Book Appointment
                    </Link>
                    <Link to="/appointments/view" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition" onClick={() => setMenuOpen(false)}>
                      My Appointments
                    </Link>
                    <Link to="/ai-chat" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition" onClick={() => setMenuOpen(false)}>
                      <RiRobotLine className="inline mr-2" /> AI Assistant
                    </Link>
                  </>
                )}
                {(isReceptionist || isIT) && (
                  <Link to={isIT ? "/it/dashboard" : "/reception/dashboard"} className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                )}
                <Link to="/locations" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition" onClick={() => setMenuOpen(false)}>Locations</Link>
                <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition" onClick={() => setMenuOpen(false)}>
                  <RiMessage2Line className="inline mr-2" /> Contact
                </Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-2xl transition font-semibold">
                  <FaSignOutAlt className="inline mr-2" /> Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-4">
                <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/locations" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition" onClick={() => setMenuOpen(false)}>Locations</Link>
                <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition" onClick={() => setMenuOpen(false)}>
                  <RiMessage2Line className="inline mr-2" /> Contact
                </Link>
                <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-dental-red rounded-2xl transition" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block px-4 py-2 bg-dental-red text-white rounded-2xl hover:bg-dental-dark-red transition text-center shadow-glow" onClick={() => setMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;