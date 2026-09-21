import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaCalendarPlus, FaTrash, FaUserMd, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Modal from '../common/Modal';

const ManageSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [form, setForm] = useState({
    doctor: '',
    branch: 'westgate',
    date: '',
    startTime: '09:00',
    endTime: '13:00',
    notes: '',
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [filterDate, filterBranch]);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/api/users?role=doctor');
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterDate) params.date = filterDate;
      if (filterBranch) params.branch = filterBranch;
      const res = await api.get('/api/schedule', { params });
      setSchedules(res.data);
    } catch (err) {
      toast.error('Failed to load schedules');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.doctor || !form.date || !form.startTime || !form.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      await api.post('/api/schedule', form);
      toast.success('Schedule added');
      setShowModal(false);
      setForm({
        doctor: '',
        branch: 'westgate',
        date: '',
        startTime: '09:00',
        endTime: '13:00',
        notes: '',
      });
      fetchSchedules();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add schedule');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this schedule entry?')) return;
    try {
      await api.delete(`/api/schedule/${id}`);
      toast.success('Deleted');
      fetchSchedules();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold flex items-center">
          <FaCalendarPlus className="mr-3 text-dental-red" /> Doctor Schedule
        </h2>
        <div className="flex gap-3 flex-wrap items-center">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="input-field w-44"
          />
          <select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="input-field w-44"
          >
            <option value="">All branches</option>
            <option value="westgate">Westgate Mall</option>
            <option value="newlands">Newlands</option>
          </select>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center">
            <FaCalendarPlus className="mr-2" /> Add Entry
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="spinner"></div>
        </div>
      ) : schedules.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No schedule entries found. Add one to get started.
        </p>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {schedules.map((s) => (
            <div
              key={s._id}
              className="border-2 border-gray-200 rounded-lg p-4 hover:border-dental-red transition flex flex-wrap justify-between items-start"
            >
              <div className="space-y-1">
                <p className="font-semibold flex items-center">
                  <FaUserMd className="text-dental-red mr-2" />
                  {s.doctor?.fullname || 'Unknown Doctor'}
                </p>
                <p className="text-sm text-gray-600">
                  <FaMapMarkerAlt className="inline mr-1 text-dental-red" />
                  {s.branch === 'westgate' ? 'Westgate Mall' : 'Newlands Shopping Centre'}
                </p>
                <p className="text-sm text-gray-600">
                  <FaClock className="inline mr-1 text-dental-red" />
                  {new Date(s.date).toLocaleDateString()} • {s.startTime} – {s.endTime}
                </p>
                {s.notes && <p className="text-xs text-gray-500 italic">Note: {s.notes}</p>}
              </div>
              <button
                onClick={() => handleDelete(s._id)}
                className="text-red-600 hover:bg-red-50 p-2 rounded"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add Schedule Entry"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Doctor *</label>
            <select
              value={form.doctor}
              onChange={(e) => setForm({ ...form, doctor: e.target.value })}
              className="input-field"
              required
            >
              <option value="">Select a doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.fullname} {d.specialization ? `– ${d.specialization}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Branch *</label>
            <select
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
              className="input-field"
            >
              <option value="westgate">Westgate Mall</option>
              <option value="newlands">Newlands Shopping Centre</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Date *</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block font-medium">Start Time *</label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium">End Time *</label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="input-field"
              rows="2"
            />
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="flex-1 btn-primary">
              Add Schedule
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageSchedule;