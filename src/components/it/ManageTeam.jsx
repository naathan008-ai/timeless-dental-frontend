import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaUserMd, FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaBriefcase, FaExclamationTriangle } from 'react-icons/fa';
import Modal from '../common/Modal';
import ImageUpload from '../common/ImageUpload';

const branchLabel = (b) =>
  b === 'westgate' ? 'Westgate Mall' : b === 'newlands' ? 'Newlands Shopping Centre' : b === 'all' ? 'All Branches' : '-';

const ManageTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [errorMsg, setErrorMsg] = useState(''); // 👈 Tracks save errors

  const emptyForm = {
    fullname: '',
    username: '',
    email: '',
    idNumber: '',
    role: '',
    branch: 'westgate',
    specialization: '',
    profilePicture: '',
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/users');
      
      // 👇 FIXED: Case-insensitive filter so custom roles like "Hygienist" show up
      const staff = res.data.filter(u => {
        const roleStr = u.role ? u.role.toLowerCase() : '';
        return roleStr !== 'client' && roleStr !== 'it';
      }).sort((a, b) => a.fullname.localeCompare(b.fullname));
      
      setTeam(staff);
    } catch (err) {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Reset error
    if (!form.role.trim()) return toast.error('Please enter a role');

    try {
      if (editing) {
        await api.put(`/api/users/${editing._id}`, form);
        toast.success('Team member updated');
      } else {
        await api.post('/api/users', form);
        toast.success('Team member added');
      }
      
      setShowModal(false);
      setEditing(null);
      setForm(emptyForm);
      fetchTeam();
    } catch (err) {
      console.error(err);
      // 👇 Show exact error on screen if it fails (e.g., "Email already exists")
      setErrorMsg(err.response?.data?.message || 'Server error. Please check console.');
      toast.error('Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this person from the team?')) return;
    try {
      await api.delete(`/api/users/${id}`);
      toast.success('Team member removed');
      fetchTeam();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const openEdit = (member) => {
    setEditing(member);
    setErrorMsg('');
    setForm({
      fullname: member.fullname || '',
      username: member.username || '',
      email: member.email || '',
      idNumber: member.idNumber || '',
      role: member.role || '',
      branch: member.branch || 'westgate',
      specialization: member.specialization || '',
      profilePicture: member.profilePicture || '',
    });
    setShowModal(true);
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="spinner"></div></div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-dental-red flex items-center">
            <FaUserMd className="mr-3" /> Manage PR Team
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add, edit, or remove staff displayed on the public "Our Team" page.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setForm(emptyForm);
            setErrorMsg('');
            setShowModal(true);
          }}
          className="btn-primary flex items-center"
        >
          <FaPlus className="mr-2" /> Add Team Member
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        {team.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No team members yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member._id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col items-center relative group bg-gray-50 dark:bg-gray-900">
                <div className="w-20 h-20 rounded-full mb-3 overflow-hidden shadow-md border-2 border-white dark:border-gray-700">
                  {member.profilePicture ? (
                    <img src={member.profilePicture} alt={member.fullname} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-red-100 dark:bg-gray-800 flex items-center justify-center">
                      <FaUserMd className="text-3xl text-dental-red" />
                    </div>
                  )}
                </div>
                
                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">{member.fullname}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-dental-red">
                  {member.role}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-1 text-dental-red" /> {branchLabel(member.branch)}
                </p>
                {member.specialization && (
                  <span className="text-xs bg-white dark:bg-gray-700 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                    {member.specialization}
                  </span>
                )}

                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(member)} className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg bg-white shadow-sm">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(member._id)} className="text-red-600 hover:bg-red-100 p-2 rounded-lg bg-white shadow-sm">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title={editing ? 'Edit Team Member' : 'Add Team Member'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 👇 SHOW ERROR MESSAGE IF SAVE FAILS */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
              <FaExclamationTriangle className="text-xl flex-shrink-0" />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            
            <div>
              <label className="block font-medium mb-1">Role / Title <span className="text-red-500">*</span></label>
              <div className="relative">
                <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={form.role} 
                  onChange={(e) => setForm({ ...form, role: e.target.value })} 
                  className="input-field pl-10" 
                  placeholder="e.g. Orthodontist, Manager" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Full Name <span className="text-red-500">*</span></label>
              <input type="text" value={form.fullname} onChange={(e) => setForm({ ...form, fullname: e.target.value })} className="input-field" required />
            </div>
            
            <div>
              <label className="block font-medium mb-1">Username <span className="text-red-500">*</span></label>
              <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="input-field" required disabled={!!editing} />
            </div>
            
            <div>
              <label className="block font-medium mb-1">Email <span className="text-red-500">*</span></label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" required />
            </div>
            
            <div>
              <label className="block font-medium mb-1">Branch <span className="text-red-500">*</span></label>
              <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className="input-field" required>
                <option value="westgate">Westgate Mall</option>
                <option value="newlands">Newlands Shopping Centre</option>
                <option value="all">All Branches</option>
              </select>
            </div>
            
            <div>
              <label className="block font-medium mb-1">Specialization (optional)</label>
              <input type="text" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className="input-field" placeholder="e.g. Braces & Aligners" />
            </div>

            <div className="md:col-span-2 pt-2">
              <ImageUpload 
                currentImage={form.profilePicture} 
                onImageChange={(base64) => setForm({ ...form, profilePicture: base64 })} 
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button type="submit" className="flex-1 btn-primary">{editing ? 'Save Changes' : 'Add Member'}</button>
            <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageTeam;