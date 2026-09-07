import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTooth, FaUser, FaEnvelope, FaIdCard, FaLock } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ fullname: '', username: '', idNumber: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');
    if (!/^\d{2}-\d{7}[A-Z]\d{2}$/.test(form.idNumber)) return toast.error('ID format: XX-XXXXXXXAXX');
    setLoading(true);
    const res = await register(form);
    setLoading(false);
    if (res.success) navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white py-12 px-4">
      <div className="max-w-md w-full card animate-fadeIn">
        <div className="text-center mb-8">
          <FaTooth className="text-5xl text-dental-red mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Join Timeless Dental Clinic</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="fullname" placeholder="Full Name" value={form.fullname} onChange={handleChange} className="input-field" required />
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} className="input-field" required />
          <input type="text" name="idNumber" placeholder="ID (00-0000000A00)" value={form.idNumber} onChange={handleChange} className="input-field" required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input-field" required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="input-field" required minLength="6" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="input-field" required />
          <button type="submit" disabled={loading} className="w-full btn-primary">{loading ? 'Creating...' : 'Create Account'}</button>
        </form>
        <p className="text-center mt-6 text-gray-600">Already have an account? <Link to="/login" className="text-dental-red font-semibold">Sign in</Link></p>
      </div>
    </div>
  );
};

export default Register;