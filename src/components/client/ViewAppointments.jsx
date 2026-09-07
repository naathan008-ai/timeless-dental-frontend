import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/api/appointments/my-appointments');
      setAppointments(res.data);
    } catch (err) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const cancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await api.delete(`/api/appointments/${id}`);
      toast.success('Cancelled');
      fetchAppointments();
    } catch (err) {
      toast.error('Failed to cancel');
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      pending: 'badge-pending',
      approved: 'badge-approved',
      cancelled: 'badge-cancelled',
      completed: 'badge-completed'
    };
    return `badge ${map[status] || ''}`;
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="spinner"></div></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto card animate-fadeIn">
        <h2 className="text-3xl font-bold text-dental-red mb-6">My Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No appointments yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div key={apt._id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-dental-red transition">
                <div className="flex flex-wrap justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-semibold">{new Date(apt.date).toLocaleDateString()}</p>
                    <p className="text-gray-600"><FaClock className="inline mr-1" /> {apt.time}</p>
                    <p className="text-gray-600"><FaMapMarkerAlt className="inline mr-1" /> {apt.branch === 'westgate' ? 'Westgate' : 'Newlands'}</p>
                    <span className={getStatusBadge(apt.status)}>{apt.status}</span>
                  </div>
                  {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                    <button onClick={() => cancel(apt._id)} className="text-red-600 hover:text-red-800 flex items-center">
                      <FaTrash className="mr-1" /> Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAppointments;