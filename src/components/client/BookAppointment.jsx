import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaUserMd,
  FaCheckCircle,
} from 'react-icons/fa';

const BookAppointment = () => {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [branch, setBranch] = useState('westgate');
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  const branchLabel = (b) =>
    b === 'westgate' ? 'Westgate Mall' : 'Newlands Shopping Centre';

  useEffect(() => {
    if (date) fetchSlots();
    fetchAppointments();
  }, [date, branch]);

  useEffect(() => {
    if (date && branch && selectedTime) {
      fetchAvailableDoctors();
    } else {
      setAvailableDoctors([]);
    }
  }, [date, branch, selectedTime]);

  const fetchSlots = async () => {
    try {
      const res = await api.get('/api/appointments/available', { params: { date, branch } });
      setSlots(res.data.availableSlots);
    } catch (err) {
      toast.error('Failed to load slots');
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/api/appointments/my-appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAvailableDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const res = await api.get('/api/schedule/available-doctors', {
        params: { date, time: selectedTime, branch },
      });
      setAvailableDoctors(res.data.availableDoctors);
    } catch (err) {
      toast.error('Failed to fetch available doctors');
      setAvailableDoctors([]);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTime) return toast.error('Select a time slot');
    setLoading(true);
    try {
      await api.post('/api/appointments/book', {
        date,
        time: selectedTime,
        branch,
        clientName: user?.fullname,
        notes: '',
      });
      toast.success(`Appointment booked at ${branchLabel(branch)}!`);
      setSelectedTime('');
      fetchSlots();
      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await api.delete(`/api/appointments/${id}/cancel`);
      toast.success('Cancelled');
      fetchAppointments();
    } catch (err) {
      toast.error('Failed to cancel');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Booking Form */}
        <div className="card animate-fade-in">
          <h2 className="text-3xl font-bold text-dental-red mb-6 flex items-center">
            <FaCalendar className="mr-3" /> Book Appointment
          </h2>

          <div className="bg-gradient-to-r from-dental-red to-dental-dark-red text-white rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-xl" />
              <div>
                <p className="text-xs opacity-90">Booking at</p>
                <p className="font-bold text-lg">{branchLabel(branch)}</p>
              </div>
            </div>
            <select
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
                setSelectedTime('');
              }}
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none"
            >
              <option value="westgate" className="text-gray-800">
                Westgate Mall
              </option>
              <option value="newlands" className="text-gray-800">
                Newlands Shopping Centre
              </option>
            </select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-2">
                <FaUser className="inline mr-2 text-dental-red" /> Client
              </label>
              <input
                type="text"
                value={user?.fullname || user?.username || ''}
                className="input-field bg-gray-100"
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                <FaCalendar className="inline mr-2 text-dental-red" /> Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="input-field"
                required
              />
            </div>

            {date && (
              <div>
                <label className="block font-medium mb-2">
                  <FaClock className="inline mr-2 text-dental-red" /> Available Times at{' '}
                  {branchLabel(branch)}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-3 rounded-lg border-2 transition ${
                        selectedTime === slot
                          ? 'bg-dental-red text-white border-dental-red transform scale-105'
                          : 'border-gray-200 hover:border-dental-red'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {slots.length === 0 && (
                  <p className="text-gray-500 mt-2">
                    No doctors scheduled at this branch on this date.
                  </p>
                )}
              </div>
            )}

            {date && branch && selectedTime && (
              <div className="mt-4">
                <label className="block font-medium mb-2 flex items-center">
                  <FaUserMd className="mr-2 text-dental-red" /> Available Doctors
                </label>
                {loadingDoctors ? (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="spinner w-4 h-4"></div>
                    <span>Loading doctors...</span>
                  </div>
                ) : availableDoctors.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      {availableDoctors.map((doc) => (
                        <div
                          key={doc.id}
                          className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                        >
                          <p className="font-semibold">{doc.fullname}</p>
                          <p className="text-sm text-gray-600">{doc.specialization}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-green-700 bg-green-50 rounded p-2 mt-2 flex items-center">
                      <FaCheckCircle className="mr-2" />
                      {availableDoctors.length} doctor
                      {availableDoctors.length > 1 ? 's' : ''} available — you'll be assigned
                      automatically.
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">No doctors available at this time.</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedTime}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Booking...' : `Confirm Appointment at ${branchLabel(branch)}`}
            </button>
          </form>
        </div>

        {/* My Appointments */}
        <div className="card animate-fadeIn">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h3>
          {appointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No appointments booked yet</p>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {appointments.map((apt) => (
                <div
                  key={apt._id}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-dental-red transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {apt.clientName || apt.client?.fullname || apt.client?.username}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {new Date(apt.date).toLocaleDateString()} at {apt.time}
                      </p>
                      <p className="text-gray-600 text-sm flex items-center">
                        <FaMapMarkerAlt className="inline mr-1 text-dental-red" />
                        {branchLabel(apt.branch)}
                      </p>
                      {apt.doctor && (
                        <p className="text-gray-600 text-sm">
                          Doctor: {apt.doctor.fullname || apt.doctor.username}
                        </p>
                      )}
                      <span
                        className={`badge ${
                          apt.status === 'pending'
                            ? 'badge-pending'
                            : apt.status === 'approved'
                            ? 'badge-approved'
                            : apt.status === 'cancelled'
                            ? 'badge-cancelled'
                            : 'badge-completed'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                    {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                      <button
                        onClick={() => cancelAppointment(apt._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;