import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTooth, FaUser, FaLock, FaIdCard } from 'react-icons/fa';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(identifier, password, role);
    setLoading(false);
    if (result.success) {
      navigate('/');
    }
  };

  // Determine label and placeholder based on role
  const getIdentifierLabel = () => {
    if (role === 'receptionist') return 'Username';
    return 'Username';
  };

  const getIdentifierPlaceholder = () => {
    return 'Enter your username';
  };

  const getPasswordLabel = () => {
    if (role === 'receptionist') return 'Receptionist ID';
    return 'Password';
  };

  const getPasswordPlaceholder = () => {
    if (role === 'receptionist') return 'Enter your Receptionist ID';
    return 'Enter your password';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white py-12 px-4">
      <div className="max-w-md w-full card animate-fadeIn">
        <div className="text-center mb-8">
          <FaTooth className="text-5xl text-dental-red mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
          <p className="text-gray-600 mt-2">Choose your role to login</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Login as</label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setIdentifier('');
                setPassword('');
              }}
              className="input-field"
            >
              <option value="client">Client</option>
              <option value="receptionist">Receptionist</option>
              <option value="it">IT Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <FaUser className="inline mr-2 text-dental-red" /> {getIdentifierLabel()}
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="input-field"
              placeholder={getIdentifierPlaceholder()}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              {role === 'receptionist' ? (
                <><FaIdCard className="inline mr-2 text-dental-red" /> Receptionist ID</>
              ) : (
                <><FaLock className="inline mr-2 text-dental-red" /> Password</>
              )}
            </label>
            <input
              type={role === 'receptionist' ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder={getPasswordPlaceholder()}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            {role !== 'receptionist' && (
              <Link to="/forgot-password" className="text-dental-red hover:underline text-sm">Forgot password?</Link>
            )}
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">Don't have an account? <Link to="/register" className="text-dental-red font-semibold">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;