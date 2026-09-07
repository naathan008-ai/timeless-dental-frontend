import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaUserPlus, FaEdit, FaTrash, FaShieldAlt, FaUserMinus } from 'react-icons/fa';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ fullname: '', username: '', idNumber: '', email: '', role: 'client', isActive: true });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/api/users/${editing._id}`, form);
        toast.success('User updated');
      } else {
        await api.post('/api/users', form);
        toast.success('User created');
      }
      setShowModal(false);
      setEditing(null);
      setForm({ fullname: '', username: '', idNumber: '', email: '', role: 'client', isActive: true });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/api/users/${id}`);
      toast.success('Deleted');
      fetchUsers();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleGrantIT = async (id) => {
    if (!window.confirm('Grant IT privileges?')) return;
    try {
      await api.post(`/api/users/${id}/grant-it`);
      toast.success('IT privileges granted');
      fetchUsers();
    } catch (err) {
      toast.error('Failed');
    }
  };

  const handleRemoveIT = async (id) => {
    if (!window.confirm('Remove IT privileges?')) return;
    try {
      await api.post(`/api/users/${id}/remove-it`);
      toast.success('IT privileges removed');
      fetchUsers();
    } catch (err) {
      toast.error('Failed');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="spinner"></div></div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <button onClick={() => { setEditing(null); setForm({ fullname: '', username: '', idNumber: '', email: '', role: 'client', isActive: true }); setShowModal(true); }} className="btn-primary flex items-center"><FaUserPlus className="mr-2" /> Add User</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Username</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Receptionist ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-4 py-3"><p className="font-semibold">{u.fullname}</p><p className="text-xs text-gray-500">{u.email}</p></td>
                <td className="px-4 py-3">{u.username}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.role === 'it' ? 'bg-red-100 text-red-700' : u.role === 'receptionist' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{u.role}</span></td>
                <td className="px-4 py-3 font-mono text-sm">{u.receptionistId || '-'}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{u.isActive ? 'Active' : 'Inactive'}</span></td>
                <td className="px-4 py-3 flex space-x-2">
                  <button onClick={() => { setEditing(u); setForm(u); setShowModal(true); }} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><FaEdit /></button>
                  {u.role !== 'it' && <button onClick={() => handleGrantIT(u._id)} className="text-purple-600 hover:bg-purple-50 p-1 rounded"><FaShieldAlt /></button>}
                  {u.role === 'it' && <button onClick={() => handleRemoveIT(u._id)} className="text-orange-600 hover:bg-orange-50 p-1 rounded"><FaUserMinus /></button>}
                  <button onClick={() => handleDelete(u._id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">{editing ? 'Edit User' : 'New User'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" value={form.fullname} onChange={(e) => setForm({...form, fullname: e.target.value})} className="input-field" required />
              <input type="text" placeholder="Username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} className="input-field" required />
              <input type="text" placeholder="ID (00-0000000A00)" value={form.idNumber} onChange={(e) => setForm({...form, idNumber: e.target.value})} className="input-field" required />
              <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="input-field" required />
              <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className="input-field">
                <option value="client">Client</option>
                <option value="receptionist">Receptionist</option>
                <option value="doctor">Doctor</option>
                <option value="it">IT</option>
              </select>
              <div className="flex space-x-4">
                <label><input type="radio" checked={form.isActive} onChange={() => setForm({...form, isActive: true})} /> Active</label>
                <label><input type="radio" checked={!form.isActive} onChange={() => setForm({...form, isActive: false})} /> Inactive</label>
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="flex-1 btn-primary">{editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;