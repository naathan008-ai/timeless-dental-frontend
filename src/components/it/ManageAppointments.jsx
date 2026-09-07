import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaCalendar, FaClock, FaUser, FaCheck, FaTimes, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from '../common/Modal';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    client: '',
    clientName: '',
    date: '',
    time: '',
    branch: 'westgate',
    notes: ''
  });

  useEffect(() => {
    fetchAppointments();
    fetchClients();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/api/appointments/all');
      setAppointments(res.data);
    } catch (err) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await api.get('/api/users');
      setClients(res.data.filter(u => u.role === 'client'));
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Update status to ${status}?`)) return;
    try {
      await api.put(`/api/appointments/${id}/status`, { status });
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm('Permanently delete this appointment?')) return;
    try {
      await api.delete(`/api/appointments/${id}`);
      toast.success('Deleted');
      fetchAppointments();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    if (!form.clientName.trim()) {
      toast.error('Client Name is required');
      return;
    }
    try {
      await api.post('/api/appointments/book', {
        client: form.client || null,
        clientName: form.clientName.trim(),
        date: form.date,
        time: form.time,
        branch: form.branch,
        notes: form.notes
      });
      toast.success('Appointment created');
      setShowModal(false);
      setForm({ client: '', clientName: '', date: '', time: '', branch: 'westgate', notes: '' });
      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Creation failed');
    }
  };

  const handleClientSelect = (clientId) => {
    if (!clientId) {
      setForm({ ...form, client: '', clientName: '' });
      return;
    }
    const selected = clients.find(c => c._id === clientId);
    if (selected) {
      setForm({ ...form, client: clientId, clientName: selected.fullname });
    } else {
      setForm({ ...form, client: '', clientName: '' });
    }
  };

  const filtered = appointments.filter(a => {
    if (filter !== 'all' && a.status !== filter) return false;
    if (search) {
      const term = search.toLowerCase();
      const client = (a.clientName || a.client?.fullname || a.client?.username || '').toLowerCase();
      return client.includes(term);
    }
    return true;
  });

  if (loading) return <div className="flex justify-center items-center h-64"><div className="spinner"></div></div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Appointments</h2>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Add Appointment
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field w-40">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          type="text"
          placeholder="Search by client name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field w-64"
        />
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {filtered.map((apt) => (
          <div key={apt._id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-dental-red transition">
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <p className="font-semibold"><FaUser className="inline mr-2" /> {apt.clientName || apt.client?.fullname || apt.client?.username || 'Unknown'}</p>
                <p className="text-sm text-gray-600"><FaCalendar className="inline mr-1" /> {new Date(apt.date).toLocaleDateString()} <FaClock className="inline ml-2 mr-1" /> {apt.time}</p>
                <p className="text-sm text-gray-600">Branch: {apt.branch}</p>
                <span className={`badge ${apt.status === 'pending' ? 'badge-pending' : apt.status === 'approved' ? 'badge-approved' : apt.status === 'cancelled' ? 'badge-cancelled' : 'badge-completed'}`}>{apt.status}</span>
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                {apt.status === 'pending' && (
                  <>
                    <button onClick={() => updateStatus(apt._id, 'approved')} className="text-green-600 hover:bg-green-50 p-2 rounded"><FaCheck /></button>
                    <button onClick={() => updateStatus(apt._id, 'cancelled')} className="text-red-600 hover:bg-red-50 p-2 rounded"><FaTimes /></button>
                  </>
                )}
                {apt.status === 'approved' && (
                  <button onClick={() => updateStatus(apt._id, 'completed')} className="text-blue-600 hover:bg-blue-50 p-2 rounded">Complete</button>
                )}
                <button onClick={() => deleteAppointment(apt._id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add Appointment"
      >
        <form onSubmit={handleAddAppointment} className="space-y-4">
          <div>
            <label className="block font-medium">Existing Client (optional)</label>
            <select
              value={form.client}
              onChange={(e) => handleClientSelect(e.target.value)}
              className="input-field"
            >
              <option value="">Select existing client (optional)</option>
              {clients.map(c => (
                <option key={c._id} value={c._id}>{c.fullname} ({c.username})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Client Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.clientName}
              onChange={(e) => setForm({...form, clientName: e.target.value})}
              className="input-field"
              placeholder="Enter client's full name"
              required
            />
            <p className="text-xs text-gray-500 mt-1">If you select a client above, their name will auto-fill here.</p>
          </div>
          <div>
            <label className="block font-medium">Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({...form, date: e.target.value})}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Time <span className="text-red-500">*</span></label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({...form, time: e.target.value})}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Branch</label>
            <select
              value={form.branch}
              onChange={(e) => setForm({...form, branch: e.target.value})}
              className="input-field"
            >
              <option value="westgate">Westgate Mall</option>
              <option value="newlands">Newlands</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({...form, notes: e.target.value})}
              className="input-field"
              rows="2"
            />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="flex-1 btn-primary">Create</button>
            <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageAppointments;