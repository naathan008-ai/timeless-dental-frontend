import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import {
  FaTooth, FaCalendar, FaEnvelope, FaUser, FaClock,
  FaCheck, FaTimes, FaEye, FaTrash, FaPlus, FaFilter, FaSearch
} from 'react-icons/fa';
import Modal from '../common/Modal';

const ReceptionDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    client: '',
    date: '',
    time: '',
    branch: 'westgate',
    notes: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    completed: 0,
    cancelled: 0
  });
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchData();
    fetchClients();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [aptRes, msgRes] = await Promise.all([
        api.get('/api/appointments/all'),
        api.get('/api/messages')
      ]);
      setAppointments(aptRes.data);
      setMessages(msgRes.data);
      calculateStats(aptRes.data);
      const unread = msgRes.data.filter(m => !m.isRead && !m.isFromReceptionist).length;
      setUnreadCount(unread);
    } catch (err) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await api.get('/api/users');
      setClients(res.data.filter(u => u.role === 'client'));
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  };

  const calculateStats = (data) => {
    const s = {
      total: data.length,
      pending: data.filter(a => a.status === 'pending').length,
      approved: data.filter(a => a.status === 'approved').length,
      completed: data.filter(a => a.status === 'completed').length,
      cancelled: data.filter(a => a.status === 'cancelled').length,
    };
    setStats(s);
  };

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Mark as ${status}?`)) return;
    try {
      await api.put(`/api/appointments/${id}/status`, { status });
      toast.success(`Appointment ${status}`);
      fetchData();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm('Permanently delete this appointment?')) return;
    try {
      await api.delete(`/api/appointments/${id}`);
      toast.success('Appointment deleted');
      fetchData();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/appointments/book', {
        client: form.client,
        date: form.date,
        time: form.time,
        branch: form.branch,
        notes: form.notes
      });
      toast.success('Appointment created');
      setShowAddModal(false);
      setForm({ client: '', date: '', time: '', branch: 'westgate', notes: '' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Creation failed');
    }
  };

  const markRead = async (id) => {
    try {
      await api.put(`/api/messages/${id}/read`);
      fetchData();
    } catch (err) {
      toast.error('Failed to mark read');
    }
  };

  const filteredAppointments = appointments.filter(a => {
    if (filter !== 'all' && a.status !== filter) return false;
    if (search) {
      const term = search.toLowerCase();
      const client = a.client?.fullname?.toLowerCase() || '';
      const username = a.client?.username?.toLowerCase() || '';
      return client.includes(term) || username.includes(term);
    }
    return true;
  });

  const getStatusBadge = (status) => {
    const map = {
      pending: 'badge-pending',
      approved: 'badge-approved',
      cancelled: 'badge-cancelled',
      completed: 'badge-completed'
    };
    return `badge ${map[status] || ''}`;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="spinner"></div></div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-dental-red mb-6 flex items-center">
          <FaTooth className="mr-3" /> Receptionist Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 shadow text-center"><p className="text-xs text-gray-500">Total</p><p className="text-xl font-bold">{stats.total}</p></div>
          <div className="bg-yellow-50 rounded-xl p-3 shadow text-center"><p className="text-xs text-yellow-600">Pending</p><p className="text-xl font-bold text-yellow-700">{stats.pending}</p></div>
          <div className="bg-green-50 rounded-xl p-3 shadow text-center"><p className="text-xs text-green-600">Approved</p><p className="text-xl font-bold text-green-700">{stats.approved}</p></div>
          <div className="bg-blue-50 rounded-xl p-3 shadow text-center"><p className="text-xs text-blue-600">Completed</p><p className="text-xl font-bold text-blue-700">{stats.completed}</p></div>
          <div className="bg-red-50 rounded-xl p-3 shadow text-center"><p className="text-xs text-red-600">Cancelled</p><p className="text-xl font-bold text-red-700">{stats.cancelled}</p></div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-2 rounded-lg font-semibold ${activeTab === 'appointments' ? 'bg-dental-red text-white' : 'bg-white text-gray-700'}`}
          >
            <FaCalendar className="inline mr-2" /> Appointments
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-2 rounded-lg font-semibold ${activeTab === 'messages' ? 'bg-dental-red text-white' : 'bg-white text-gray-700'}`}
          >
            <FaEnvelope className="inline mr-2" /> Messages
            {unreadCount > 0 && <span className="ml-1 bg-red-500 text-white px-2 rounded-full text-xs">{unreadCount}</span>}
          </button>
        </div>

        {activeTab === 'appointments' ? (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <FaFilter className="text-gray-500" />
                  <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field w-40">
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <FaSearch className="text-gray-500" />
                  <input type="text" placeholder="Search client..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field w-48" />
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary flex items-center"
              >
                <FaPlus className="mr-2" /> Add Appointment
              </button>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredAppointments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No appointments found</p>
              ) : (
                filteredAppointments.map((apt) => (
                  <div key={apt._id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-dental-red transition">
                    <div className="flex flex-wrap justify-between items-start">
                      <div className="space-y-1">
                        <p className="font-semibold"><FaUser className="inline mr-2" /> {apt.client?.fullname || apt.client?.username}</p>
                        <p className="text-sm text-gray-600"><FaCalendar className="inline mr-1" /> {new Date(apt.date).toLocaleDateString()} <FaClock className="inline ml-2 mr-1" /> {apt.time}</p>
                        <p className="text-sm text-gray-600">Branch: {apt.branch}</p>
                        <span className={getStatusBadge(apt.status)}>{apt.status}</span>
                      </div>
                      <div className="flex space-x-2 mt-2 md:mt-0">
                        <button onClick={() => { setSelected(apt); setShowDetailsModal(true); }} className="text-blue-600 hover:bg-blue-50 p-2 rounded"><FaEye /></button>
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
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No messages</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className={`border rounded-lg p-4 ${!msg.isRead && !msg.isFromReceptionist ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{msg.client?.fullname || msg.client?.username}</p>
                        <p className="text-sm text-gray-600">{msg.content}</p>
                        <p className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</p>
                      </div>
                      {!msg.isRead && !msg.isFromReceptionist && (
                        <button onClick={() => markRead(msg._id)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">Mark Read</button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Details Modal */}
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title="Appointment Details"
        >
          {selected && (
            <div className="space-y-2">
              <p><strong>Client:</strong> {selected.client?.fullname}</p>
              <p><strong>Username:</strong> {selected.client?.username}</p>
              <p><strong>ID:</strong> {selected.client?.idNumber}</p>
              <p><strong>Email:</strong> {selected.client?.email}</p>
              <p><strong>Date:</strong> {new Date(selected.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selected.time}</p>
              <p><strong>Branch:</strong> {selected.branch}</p>
              <p><strong>Status:</strong> <span className={getStatusBadge(selected.status)}>{selected.status}</span></p>
              {selected.notes && <p><strong>Notes:</strong> {selected.notes}</p>}
            </div>
          )}
          <button onClick={() => setShowDetailsModal(false)} className="mt-4 btn-secondary w-full">Close</button>
        </Modal>

        {/* Add Appointment Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add Appointment"
        >
          <form onSubmit={handleAddAppointment} className="space-y-4">
            <div>
              <label className="block font-medium">Client</label>
              <select
                value={form.client}
                onChange={(e) => setForm({...form, client: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select Client</option>
                {clients.map(c => (
                  <option key={c._id} value={c._id}>{c.fullname} ({c.username})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({...form, date: e.target.value})}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Time</label>
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
              <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 btn-secondary">Cancel</button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ReceptionDashboard;