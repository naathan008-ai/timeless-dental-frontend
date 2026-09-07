import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const BookAppointment = () => {
  const [date, setDate] = useState('');
  const [branch, setBranch] = useState('westgate');
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (date) fetchSlots();
  }, [date, branch]);

  const fetchSlots = async () => {
    try {
      const res = await api.get('/api/appointments/available', { params: { date, branch } });
      setSlots(res.data.availableSlots);
    } catch (err) {
      toast.error('Failed to load slots');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTime) return toast.error('Select a time slot');
    setLoading(true);
    try {
      await api.post('/api/appointments/book', { date, time: selectedTime, branch });
      toast.success('Appointment booked!');
      setSelectedTime('');
      fetchSlots();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto card animate-fadeIn">
        <h2 className="text-3xl font-bold text-dental-red mb-6">Book Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-2"><FaCalendar className="inline mr-2 text-dental-red" /> Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="input-field" required />
          </div>
          <div>
            <label className="block font-medium mb-2"><FaMapMarkerAlt className="inline mr-2 text-dental-red" /> Branch</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)} className="input-field">
              <option value="westgate">Westgate Mall</option>
              <option value="newlands">Newlands Shopping Centre</option>
            </select>
          </div>
          {date && (
            <div>
              <label className="block font-medium mb-2"><FaClock className="inline mr-2 text-dental-red" /> Available Times</label>
              <div className="grid grid-cols-4 gap-2">
                {slots.map((slot) => (
                  <button key={slot} type="button" onClick={() => setSelectedTime(slot)} className={`py-2 px-3 rounded-lg border-2 transition ${selectedTime === slot ? 'bg-dental-red text-white border-dental-red' : 'border-gray-200 hover:border-dental-red'}`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button type="submit" disabled={loading || !selectedTime} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;