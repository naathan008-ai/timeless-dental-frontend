import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import {
  FaUsers,
  FaSearch,
  FaUserPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import Modal from '../common/Modal';

const ManageClients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const emptyForm = {
    fullname: '',
    username: '',
    idNumber: '',
    email: '',
    phoneNumber: '',
    homeAddress: '',
    dateOfBirth: '',
    gender: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalHistory: '',
    allergies: '',
    insuranceProvider: '',
    insuranceNumber: '',
    clientNotes: '',
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchClients();
  }, [search]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/clients', { params: { search } });
      setClients(res.data);
    } catch (err) {
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/api/clients/${editing._id}`, form);
        toast.success('Client updated');
      } else {
        await api.post('/api/clients', form);
        toast.success('Client created');
      }
      setShowModal(false);
      setEditing(null);
      setForm(emptyForm);
      fetchClients();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id, fullname) => {
    if (!window.confirm(`Delete client "${fullname}"?`)) return;
    try {
      const res = await api.delete(`/api/clients/${id}`);
      toast.success(res.data.message || 'Deleted');
      fetchClients();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const openEdit = (client) => {
    setEditing(client);
    setForm({
      fullname: client.fullname || '',
      username: client.username || '',
      idNumber: client.idNumber || '',
      email: client.email || '',
      phoneNumber: client.phoneNumber || '',
      homeAddress: client.homeAddress || '',
      dateOfBirth: client.dateOfBirth
        ? new Date(client.dateOfBirth).toISOString().split('T')[0]
        : '',
      gender: client.gender || '',
      emergencyContactName: client.emergencyContactName || '',
      emergencyContactPhone: client.emergencyContactPhone || '',
      medicalHistory: client.medicalHistory || '',
      allergies: client.allergies || '',
      insuranceProvider: client.insuranceProvider || '',
      insuranceNumber: client.insuranceNumber || '',
      clientNotes: client.clientNotes || '',
    });
    setShowModal(true);
  };

  if (loading && clients.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold flex items-center">
          <FaUsers className="mr-3 text-dental-red" /> Client Database
        </h2>
        <div className="flex gap-3 items-center flex-wrap">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, ID, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-64"
            />
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setForm(emptyForm);
              setShowModal(true);
            }}
            className="btn-primary flex items-center"
          >
            <FaUserPlus className="mr-2" /> Add Client
          </button>
        </div>
      </div>

      {clients.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          {search ? 'No clients match your search.' : 'No clients in the database yet.'}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  ID Number
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-800">{c.fullname}</p>
                    <p className="text-xs text-gray-500">@{c.username}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{c.idNumber}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs flex items-center gap-1 text-gray-600">
                      <FaEnvelope className="text-dental-red" /> {c.email}
                    </p>
                    {c.phoneNumber && (
                      <p className="text-xs flex items-center gap-1 text-gray-600">
                        <FaPhone className="text-dental-red" /> {c.phoneNumber}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        c.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {c.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => navigate(`/clients/${c._id}`)}
                        className="text-dental-red hover:bg-red-50 p-2 rounded"
                        title="View details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => openEdit(c)}
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(c._id, c.fullname)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Client Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? 'Edit Client' : 'Add New Client'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Full Name *</label>
              <input
                type="text"
                value={form.fullname}
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Username *</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="input-field"
                required
                disabled={!!editing}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">ID Number *</label>
              <input
                type="text"
                value={form.idNumber}
                onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
                className="input-field"
                placeholder="00-0000000A00"
                required
                disabled={!!editing}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="text"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Gender</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Home Address</label>
              <input
                type="text"
                value={form.homeAddress}
                onChange={(e) => setForm({ ...form, homeAddress: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Emergency Contact Name</label>
              <input
                type="text"
                value={form.emergencyContactName}
                onChange={(e) => setForm({ ...form, emergencyContactName: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Emergency Contact Phone</label>
              <input
                type="text"
                value={form.emergencyContactPhone}
                onChange={(e) => setForm({ ...form, emergencyContactPhone: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Insurance Provider</label>
              <input
                type="text"
                value={form.insuranceProvider}
                onChange={(e) => setForm({ ...form, insuranceProvider: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Insurance Number</label>
              <input
                type="text"
                value={form.insuranceNumber}
                onChange={(e) => setForm({ ...form, insuranceNumber: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Allergies</label>
            <textarea
              value={form.allergies}
              onChange={(e) => setForm({ ...form, allergies: e.target.value })}
              className="input-field"
              rows="2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Medical History</label>
            <textarea
              value={form.medicalHistory}
              onChange={(e) => setForm({ ...form, medicalHistory: e.target.value })}
              className="input-field"
              rows="2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Notes</label>
            <textarea
              value={form.clientNotes}
              onChange={(e) => setForm({ ...form, clientNotes: e.target.value })}
              className="input-field"
              rows="2"
            />
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="flex-1 btn-primary">
              {editing ? 'Update Client' : 'Create Client'}
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

export default ManageClients;