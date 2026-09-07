import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, roles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center h-screen"><div className="spinner"></div></div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (roles.length && !roles.includes(user?.role)) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;