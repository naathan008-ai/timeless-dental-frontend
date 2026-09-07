import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaUserMd, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    email: '',
    specialization: '',
    workingHours: { start: '09:00', end: '16:00' },
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/users?role=doctor');
      setDoctors(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load doctors. Please refresh.');
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/api/users/${editing._id}`, form);
        toast.success('Doctor updated');
      } else {
        await api.post('/api/users', { ...form, role: 'doctor' });
        toast.success('Doctor added');
      }
      setShowModal(false);
      setEditing(null);
      setForm({
        fullname: '',
        username: '',
        email: '',
        specialization: '',
        workingHours: { start: '09:00', end: '16:00' },
        daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      });
      fetchDoctors();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this doctor?')) return;
    try {
      await api.delete(`/api/users/${id}`);
      toast.success('Deleted');
      fetchDoctors();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleEdit = (doctor) => {
    // Safely populate form, providing defaults for missing fields
    setEditing(doctor);
    setForm({
      fullname: doctor.fullname || '',
      username: doctor.username || '',
      email: doctor.email || '',
      specialization: doctor.specialization || '',
      workingHours: doctor.workingHours || { start: '09:00', end: '16:00' },
      daysAvailable: doctor.daysAvailable || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    });
    setShowModal(true);
  };

  const toggleDay = (day) => {
    setForm(prev => ({
      ...prev,
      daysAvailable: prev.daysAvailable.includes(day)
        ? prev.daysAvailable.filter(d => d !== day)
        : [...prev.daysAvailable, day]
    }));
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="spinner"></div></div>;

  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <FaUserMd className="mr-3 text-dental-red" /> Manage Doctors
        </h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({
              fullname: '',
              username: '',
              email: '',
              specialization: '',
              workingHours: { start: '09:00', end: '16:00' },
              daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            });
            setShowModal(true);
          }}
          className="btn-primary flex items-center"
        >
          <FaPlus className="mr-2" /> Add Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-dental-red transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold flex items-center">
                  <FaUserMd className="text-dental-red mr-2" /> {doctor.fullname}
                </h3>
                <p className="text-sm text-gray-600">@{doctor.username}</p>
                <p className="text-sm text-gray-600">{doctor.email}</p>
                {doctor.specialization && (
                  <p className="text-sm text-gray-600">Specialization: {doctor.specialization}</p>
                )}
                {doctor.workingHours && (
                  <p className="text-sm text-gray-600">
                    Hours: {doctor.workingHours.start} - {doctor.workingHours.end}
                  </p>
                )}
                {doctor.daysAvailable && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {doctor.daysAvailable.map(day => (
                      <span key={day} className="text-xs bg-gray-100 px-2 py-1 rounded">{day.slice(0,3)}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(doctor)} className="text-blue-600 hover:bg-blue-50 p-2 rounded">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(doctor._id)} className="text-red-600 hover:bg-red-50 p-2 rounded">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">{editing ? 'Edit Doctor' : 'Add Doctor'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={form.fullname}
                onChange={(e) => setForm({...form, fullname: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({...form, username: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Specialization"
                value={form.specialization}
                onChange={(e) => setForm({...form, specialization: e.target.value})}
                className="input-field"
              />
              <div className="flex space-x-4">
                <input
                  type="time"
                  value={form.workingHours.start}
                  onChange={(e) => setForm({
                    ...form,
                    workingHours: { ...form.workingHours, start: e.target.value }
                  })}
                  className="input-field"
                />
                <input
                  type="time"
                  value={form.workingHours.end}
                  onChange={(e) => setForm({
                    ...form,
                    workingHours: { ...form.workingHours, end: e.target.value }
                  })}
                  className="input-field"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      form.daysAvailable.includes(day)
                        ? 'bg-dental-red text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="flex-1 btn-primary">{editing ? 'Update' : 'Add'}</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;