import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import {
  FaUserMd,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarPlus,
  FaMapMarkerAlt,
  FaClock,
  FaCalendar,
  FaUserCog,
} from 'react-icons/fa';
import Modal from '../common/Modal';
import { useAuth } from '../../context/AuthContext';

const branchLabel = (b) =>
  b === 'westgate' ? 'Westgate Mall' : b === 'newlands' ? 'Newlands Shopping Centre' : '-';

const ManageDoctors = () => {
  const { isIT } = useAuth();
  const [activeTab, setActiveTab] = useState('doctors');

  // ==============================
  // DOCTORS STATE
  // ==============================
  const [doctors, setDoctors] = useState([]);
  const [doctorLoading, setDoctorLoading] = useState(true);
  const [doctorError, setDoctorError] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const emptyDoctorForm = {
    fullname: '',
    username: '',
    email: '',
    idNumber: '',
    specialization: '',
    branch: 'westgate',
    workingHours: { start: '09:00', end: '16:00' },
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  };
  const [doctorForm, setDoctorForm] = useState(emptyDoctorForm);

  // ==============================
  // SCHEDULES STATE
  // ==============================
  const [schedules, setSchedules] = useState([]);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');

  const emptyScheduleForm = {
    doctor: '',
    branch: 'westgate',
    date: '',
    startTime: '09:00',
    endTime: '13:00',
    notes: '',
  };
  const [scheduleForm, setScheduleForm] = useState(emptyScheduleForm);

  // ==============================
  // EFFECTS
  // ==============================
  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [filterDate, filterBranch, filterDoctor]);

  // ==============================
  // FETCHES
  // ==============================
  const fetchDoctors = async () => {
    try {
      setDoctorLoading(true);
      const res = await api.get('/api/users?role=doctor');
      setDoctors(res.data);
      setDoctorError(null);
    } catch (err) {
      setDoctorError('Failed to load doctors. Please refresh.');
      toast.error('Failed to load doctors');
    } finally {
      setDoctorLoading(false);
    }
  };

  const fetchSchedules = async () => {
    try {
      setScheduleLoading(true);
      const params = {};
      if (filterDate) params.date = filterDate;
      if (filterBranch) params.branch = filterBranch;
      if (filterDoctor) params.doctor = filterDoctor;
      const res = await api.get('/api/schedule', { params });
      setSchedules(res.data);
    } catch (err) {
      toast.error('Failed to load schedules');
    } finally {
      setScheduleLoading(false);
    }
  };

  // ==============================
  // DOCTOR HANDLERS
  // ==============================
  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDoctor) {
        await api.put(`/api/users/${editingDoctor._id}`, doctorForm);
        toast.success('Doctor updated');
      } else {
        await api.post('/api/users', { ...doctorForm, role: 'doctor' });
        toast.success('Doctor added');
      }
      setShowDoctorModal(false);
      setEditingDoctor(null);
      setDoctorForm(emptyDoctorForm);
      fetchDoctors();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDoctorDelete = async (id) => {
    if (!window.confirm('Delete this doctor?')) return;
    try {
      await api.delete(`/api/users/${id}`);
      toast.success('Doctor deleted');
      fetchDoctors();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const openDoctorEdit = (doctor) => {
    setEditingDoctor(doctor);
    setDoctorForm({
      fullname: doctor.fullname || '',
      username: doctor.username || '',
      email: doctor.email || '',
      idNumber: doctor.idNumber || '',
      specialization: doctor.specialization || '',
      branch: doctor.branch || 'westgate',
      workingHours: doctor.workingHours || { start: '09:00', end: '16:00' },
      daysAvailable:
        doctor.daysAvailable || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    });
    setShowDoctorModal(true);
  };

  const toggleDay = (day) => {
    setDoctorForm((prev) => ({
      ...prev,
      daysAvailable: prev.daysAvailable.includes(day)
        ? prev.daysAvailable.filter((d) => d !== day)
        : [...prev.daysAvailable, day],
    }));
  };

  // ==============================
  // SCHEDULE HANDLERS
  // ==============================
  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!scheduleForm.doctor || !scheduleForm.date || !scheduleForm.startTime || !scheduleForm.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      await api.post('/api/schedule', scheduleForm);
      toast.success('Schedule added');
      setShowScheduleModal(false);
      setScheduleForm(emptyScheduleForm);
      fetchSchedules();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add schedule');
    }
  };

  const handleScheduleDelete = async (id) => {
    if (!window.confirm('Delete this schedule entry?')) return;
    try {
      await api.delete(`/api/schedule/${id}`);
      toast.success('Schedule deleted');
      fetchSchedules();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const viewDoctorSchedule = (doctorId) => {
    setFilterDoctor(doctorId);
    setFilterDate('');
    setFilterBranch('');
    setActiveTab('schedules');
  };

  const clearScheduleFilters = () => {
    setFilterDate('');
    setFilterBranch('');
    setFilterDoctor('');
  };

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-dental-red flex items-center">
            <FaUserMd className="mr-3" /> Doctors & Schedules
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage doctors and assign their daily branch schedules
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 mb-6 flex-wrap">
        <button
          onClick={() => setActiveTab('doctors')}
          className={`px-6 py-2.5 rounded-lg font-semibold transition ${
            activeTab === 'doctors'
              ? 'bg-dental-red text-white shadow'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FaUserMd className="inline mr-2" /> Doctors ({doctors.length})
        </button>
        <button
          onClick={() => setActiveTab('schedules')}
          className={`px-6 py-2.5 rounded-lg font-semibold transition ${
            activeTab === 'schedules'
              ? 'bg-dental-red text-white shadow'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FaCalendarPlus className="inline mr-2" /> Schedules ({schedules.length})
        </button>
      </div>

      {/* ============================ DOCTORS TAB ============================ */}
      {activeTab === 'doctors' && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <h2 className="text-xl font-bold flex items-center">
              <FaUserMd className="mr-2 text-dental-red" /> All Doctors
            </h2>
            {isIT && (
              <button
                onClick={() => {
                  setEditingDoctor(null);
                  setDoctorForm(emptyDoctorForm);
                  setShowDoctorModal(true);
                }}
                className="btn-primary flex items-center"
              >
                <FaPlus className="mr-2" /> Add Doctor
              </button>
            )}
          </div>

          {doctorLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="spinner"></div>
            </div>
          ) : doctorError ? (
            <p className="text-center text-red-600 py-8">{doctorError}</p>
          ) : doctors.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No doctors yet. {isIT ? 'Click "Add Doctor" to create one.' : ''}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="border-2 border-gray-200 rounded-xl p-4 hover:border-dental-red transition group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center text-lg">
                        <FaUserMd className="text-dental-red mr-2" /> {doctor.fullname}
                      </h3>
                      <p className="text-sm text-gray-600">@{doctor.username}</p>
                      <p className="text-sm text-gray-600">{doctor.email}</p>
                      {doctor.idNumber && (
                        <p className="text-xs text-gray-500 mt-1">
                          ID: {doctor.idNumber}
                        </p>
                      )}
                      {doctor.specialization && (
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Specialization:</strong> {doctor.specialization}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">
                        <FaMapMarkerAlt className="inline mr-1 text-dental-red" />
                        {branchLabel(doctor.branch)}
                      </p>
                      {doctor.workingHours && (
                        <p className="text-sm text-gray-600">
                          <FaClock className="inline mr-1 text-dental-red" />
                          {doctor.workingHours.start} – {doctor.workingHours.end}
                        </p>
                      )}
                      {doctor.daysAvailable && doctor.daysAvailable.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {doctor.daysAvailable.map((d) => (
                            <span
                              key={d}
                              className="text-xs bg-gray-100 px-2 py-1 rounded"
                            >
                              {d.slice(0, 3)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 ml-2">
                      {isIT && (
                        <>
                          <button
                            onClick={() => openDoctorEdit(doctor)}
                            className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                            title="Edit doctor"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDoctorDelete(doctor._id)}
                            className="text-red-600 hover:bg-red-50 p-2 rounded"
                            title="Delete doctor"
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => viewDoctorSchedule(doctor._id)}
                    className="mt-3 w-full flex items-center justify-center gap-2 text-sm font-semibold text-dental-red border-2 border-dental-red rounded-lg py-2 hover:bg-dental-red hover:text-white transition"
                  >
                    <FaCalendarPlus /> View Schedule
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================ SCHEDULES TAB ============================ */}
      {activeTab === 'schedules' && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Header + filters */}
          <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
            <h2 className="text-xl font-bold flex items-center">
              <FaCalendarPlus className="mr-2 text-dental-red" /> Doctor Schedules
            </h2>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="btn-primary flex items-center"
            >
              <FaCalendarPlus className="mr-2" /> Add Schedule
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-5 items-center bg-gray-50 rounded-xl p-3">
            <div>
              <label className="text-xs text-gray-500 mr-2">Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="input-field w-44"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mr-2">Branch</label>
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="input-field w-48"
              >
                <option value="">All branches</option>
                <option value="westgate">Westgate Mall</option>
                <option value="newlands">Newlands Shopping Centre</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mr-2">Doctor</label>
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className="input-field w-56"
              >
                <option value="">All doctors</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.fullname}
                  </option>
                ))}
              </select>
            </div>
            {(filterDate || filterBranch || filterDoctor) && (
              <button
                onClick={clearScheduleFilters}
                className="text-red-600 hover:text-red-800 text-sm font-semibold ml-auto"
              >
                Clear filters
              </button>
            )}
          </div>

          {scheduleLoading ? (
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
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-dental-red transition flex flex-wrap justify-between items-start gap-3"
                >
                  <div className="space-y-1">
                    <p className="font-semibold flex items-center text-lg">
                      <FaUserMd className="text-dental-red mr-2" />
                      {s.doctor?.fullname || 'Unknown Doctor'}
                      {s.doctor?.specialization && (
                        <span className="ml-2 text-xs bg-red-50 text-dental-red px-2 py-0.5 rounded-full">
                          {s.doctor.specialization}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      <FaMapMarkerAlt className="inline mr-1 text-dental-red" />
                      {branchLabel(s.branch)}
                    </p>
                    <p className="text-sm text-gray-600">
                      <FaCalendar className="inline mr-1 text-dental-red" />
                      {new Date(s.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      <FaClock className="inline mr-1 text-dental-red" />
                      {s.startTime} – {s.endTime}
                    </p>
                    {s.notes && (
                      <p className="text-xs text-gray-500 italic mt-1">
                        Note: {s.notes}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleScheduleDelete(s._id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded"
                    title="Delete schedule"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================ DOCTOR MODAL ============================ */}
      <Modal
        isOpen={showDoctorModal}
        onClose={() => setShowDoctorModal(false)}
        title={editingDoctor ? 'Edit Doctor' : 'Add Doctor'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleDoctorSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Full Name *</label>
              <input
                type="text"
                value={doctorForm.fullname}
                onChange={(e) =>
                  setDoctorForm({ ...doctorForm, fullname: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Username *</label>
              <input
                type="text"
                value={doctorForm.username}
                onChange={(e) =>
                  setDoctorForm({ ...doctorForm, username: e.target.value })
                }
                className="input-field"
                required
                disabled={!!editingDoctor}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email *</label>
              <input
                type="email"
                value={doctorForm.email}
                onChange={(e) =>
                  setDoctorForm({ ...doctorForm, email: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                ID Number (optional)
              </label>
              <input
                type="text"
                value={doctorForm.idNumber}
                onChange={(e) =>
                  setDoctorForm({ ...doctorForm, idNumber: e.target.value })
                }
                className="input-field"
                placeholder="Auto-generated if empty"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Specialization</label>
              <input
                type="text"
                value={doctorForm.specialization}
                onChange={(e) =>
                  setDoctorForm({ ...doctorForm, specialization: e.target.value })
                }
                className="input-field"
                placeholder="e.g. Orthodontist"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Home Branch</label>
              <select
                value={doctorForm.branch}
                onChange={(e) =>
                  setDoctorForm({ ...doctorForm, branch: e.target.value })
                }
                className="input-field"
              >
                <option value="westgate">Westgate Mall</option>
                <option value="newlands">Newlands Shopping Centre</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Default Working Hours</label>
            <div className="flex space-x-4">
              <input
                type="time"
                value={doctorForm.workingHours.start}
                onChange={(e) =>
                  setDoctorForm({
                    ...doctorForm,
                    workingHours: {
                      ...doctorForm.workingHours,
                      start: e.target.value,
                    },
                  })
                }
                className="input-field"
              />
              <input
                type="time"
                value={doctorForm.workingHours.end}
                onChange={(e) =>
                  setDoctorForm({
                    ...doctorForm,
                    workingHours: {
                      ...doctorForm.workingHours,
                      end: e.target.value,
                    },
                  })
                }
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Days Available</label>
            <div className="flex flex-wrap gap-2">
              {[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    doctorForm.daysAvailable.includes(day)
                      ? 'bg-dental-red text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="flex-1 btn-primary">
              {editingDoctor ? 'Update' : 'Add Doctor'}
            </button>
            <button
              type="button"
              onClick={() => setShowDoctorModal(false)}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* ============================ SCHEDULE MODAL ============================ */}
      <Modal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Add Schedule Entry"
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">
              Doctor <span className="text-red-500">*</span>
            </label>
            <select
              value={scheduleForm.doctor}
              onChange={(e) =>
                setScheduleForm({ ...scheduleForm, doctor: e.target.value })
              }
              className="input-field"
              required
            >
              <option value="">Select a doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.fullname}
                  {d.specialization ? ` – ${d.specialization}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Branch <span className="text-red-500">*</span>
            </label>
            <select
              value={scheduleForm.branch}
              onChange={(e) =>
                setScheduleForm({ ...scheduleForm, branch: e.target.value })
              }
              className="input-field"
            >
              <option value="westgate">Westgate Mall</option>
              <option value="newlands">Newlands Shopping Centre</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={scheduleForm.date}
              onChange={(e) =>
                setScheduleForm({ ...scheduleForm, date: e.target.value })
              }
              className="input-field"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={scheduleForm.startTime}
                onChange={(e) =>
                  setScheduleForm({ ...scheduleForm, startTime: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={scheduleForm.endTime}
                onChange={(e) =>
                  setScheduleForm({ ...scheduleForm, endTime: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Notes (optional)</label>
            <textarea
              value={scheduleForm.notes}
              onChange={(e) =>
                setScheduleForm({ ...scheduleForm, notes: e.target.value })
              }
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
              onClick={() => setShowScheduleModal(false)}
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

export default ManageDoctors;