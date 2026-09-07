import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUsers, FaCalendar, FaChartLine, FaUserMd, FaTooth } from 'react-icons/fa';

const ITDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/api/users/stats/dashboard');
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="spinner"></div></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-dental-red mb-6 flex items-center">
          <FaShieldAlt className="mr-3" /> IT Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow"><p className="text-gray-500 text-sm">Total Users</p><p className="text-2xl font-bold">{stats.totalUsers || 0}</p></div>
          <div className="bg-white rounded-xl p-4 shadow"><p className="text-gray-500 text-sm">Total Appointments</p><p className="text-2xl font-bold">{stats.totalAppointments || 0}</p></div>
          <div className="bg-yellow-50 rounded-xl p-4 shadow"><p className="text-yellow-600 text-sm">Pending</p><p className="text-2xl font-bold text-yellow-700">{stats.pendingAppointments || 0}</p></div>
          <div className="bg-blue-50 rounded-xl p-4 shadow"><p className="text-blue-600 text-sm">Today</p><p className="text-2xl font-bold text-blue-700">{stats.todayAppointments || 0}</p></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/it/users" className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition text-center">
            <FaUsers className="text-4xl text-dental-red mx-auto mb-2" />
            <h3 className="font-bold">Manage Users</h3>
          </Link>
          <Link to="/it/doctors" className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition text-center">
            <FaUserMd className="text-4xl text-dental-red mx-auto mb-2" />
            <h3 className="font-bold">Manage Doctors</h3>
          </Link>
          <Link to="/it/appointments" className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition text-center">
            <FaCalendar className="text-4xl text-dental-red mx-auto mb-2" />
            <h3 className="font-bold">All Appointments</h3>
          </Link>
          <Link to="/it/activity" className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition text-center">
            <FaChartLine className="text-4xl text-dental-red mx-auto mb-2" />
            <h3 className="font-bold">Activity Monitor</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ITDashboard;