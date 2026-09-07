import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FaCalendar, FaClock, FaTooth, FaCommentMedical, FaMapMarkerAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, upcoming: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/api/appointments/my-appointments');
      const apts = res.data;
      setAppointments(apts.slice(0, 5));
      const now = new Date();
      setStats({
        total: apts.length,
        upcoming: apts.filter(a => new Date(a.date) >= now && a.status !== 'cancelled' && a.status !== 'completed').length,
        completed: apts.filter(a => a.status === 'completed').length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="spinner"></div></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-dental-red to-dental-dark-red text-white rounded-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.fullname || user?.username}!</h1>
          <p className="text-red-100">Here's a snapshot of your dental care.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-4 shadow flex justify-between items-center">
            <div><p className="text-gray-500 text-sm">Total</p><p className="text-2xl font-bold">{stats.total}</p></div>
            <FaCalendar className="text-3xl text-dental-red" />
          </div>
          <div className="bg-white rounded-xl p-4 shadow flex justify-between items-center">
            <div><p className="text-gray-500 text-sm">Upcoming</p><p className="text-2xl font-bold text-green-600">{stats.upcoming}</p></div>
            <FaClock className="text-3xl text-green-600" />
          </div>
          <div className="bg-white rounded-xl p-4 shadow flex justify-between items-center">
            <div><p className="text-gray-500 text-sm">Completed</p><p className="text-2xl font-bold text-blue-600">{stats.completed}</p></div>
            <FaTooth className="text-3xl text-blue-600" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/appointments/book" className="p-4 bg-red-50 rounded-xl hover:bg-red-100 text-center"><FaCalendar className="text-2xl text-dental-red mx-auto mb-2" />Book</Link>
              <Link to="/appointments/view" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 text-center"><FaClock className="text-2xl text-blue-600 mx-auto mb-2" />View</Link>
              <Link to="/ai-chat" className="p-4 bg-green-50 rounded-xl hover:bg-green-100 text-center"><FaCommentMedical className="text-2xl text-green-600 mx-auto mb-2" />AI Chat</Link>
              <Link to="/locations" className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 text-center"><FaMapMarkerAlt className="text-2xl text-purple-600 mx-auto mb-2" />Locations</Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Appointments</h2>
            {appointments.length === 0 ? <p className="text-gray-500">No appointments</p> : appointments.map((a) => (
              <div key={a._id} className="border-l-4 border-dental-red pl-3 mb-2">
                <p className="font-semibold text-sm">{new Date(a.date).toLocaleDateString()}</p>
                <p className="text-xs text-gray-600">{a.time}</p>
                <span className={`badge ${a.status === 'pending' ? 'badge-pending' : a.status === 'approved' ? 'badge-approved' : 'badge-completed'}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;