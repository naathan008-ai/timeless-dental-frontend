import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaTooth } from 'react-icons/fa';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await api.post('/api/auth/reset-password', { token, newPassword });
      toast.success('Password reset! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white py-12 px-4">
      <div className="max-w-md w-full card animate-fadeIn">
        <div className="text-center mb-8">
          <FaTooth className="text-5xl text-dental-red mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Set New Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field" required minLength="6" />
          <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="input-field" required />
          <button type="submit" disabled={loading} className="w-full btn-primary">{loading ? 'Resetting...' : 'Reset Password'}</button>
        </form>
        <Link to="/login" className="block text-center mt-4 text-dental-red hover:underline">Back to Login</Link>
      </div>
    </div>
  );
};

export default ResetPassword;