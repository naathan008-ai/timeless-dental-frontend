import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import {
  FaArrowLeft,
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaNotesMedical,
  FaAllergies,
  FaShieldAlt,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaPlus,
  FaTrash,
  FaEdit,
  FaUserMd,
  FaHospital,
  FaCheckCircle,
  FaClock,
} from 'react-icons/fa';
import Modal from '../common/Modal';

const branchLabel = (b) =>
  b === 'westgate' ? 'Westgate Mall' : b === 'newlands' ? 'Newlands Shopping Centre' : '-';

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  // Visit modal
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [editingVisit, setEditingVisit] = useState(null);
  const emptyVisit = {
    doctor: '',
    branch: 'westgate',
    visitDate: new Date().toISOString().split('T')[0],
    visitType: 'checkup',
    treatment: '',
    diagnosis: '',
    notes: '',
    nextVisitDate: '',
    status: 'completed',
  };
  const [visitForm, setVisitForm] = useState(emptyVisit);

  // Payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const emptyPayment = {
    totalAmount: '',
    amountPaid: '',
    method: 'cash',
    branch: 'westgate',
    description: '',
    notes: '',
    paymentDate: new Date().toISOString().split('T')[0],
  };
  const [paymentForm, setPaymentForm] = useState(emptyPayment);

  // Doctors list for visit form
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchClient();
    fetchDoctors();
  }, [id]);

  const fetchClient = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/clients/${id}`);
      setData(res.data);
    } catch (err) {
      toast.error('Failed to load client');
      navigate('/clients');
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/api/users?role=doctor');
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- VISITS ----------
  const handleVisitSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVisit) {
        await api.put(`/api/clients/${id}/visits/${editingVisit._id}`, visitForm);
        toast.success('Visit updated');
      } else {
        await api.post(`/api/clients/${id}/visits`, visitForm);
        toast.success('Visit added');
      }
      setShowVisitModal(false);
      setEditingVisit(null);
      setVisitForm(emptyVisit);
      fetchClient();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save visit');
    }
  };

  const deleteVisit = async (visitId) => {
    if (!window.confirm('Delete this visit record?')) return;
    try {
      await api.delete(`/api/clients/${id}/visits/${visitId}`);
      toast.success('Visit deleted');
      fetchClient();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const openEditVisit = (v) => {
    setEditingVisit(v);
    setVisitForm({
      doctor: v.doctor?._id || '',
      branch: v.branch || 'westgate',
      visitDate: v.visitDate ? new Date(v.visitDate).toISOString().split('T')[0] : '',
      visitType: v.visitType || 'checkup',
      treatment: v.treatment || '',
      diagnosis: v.diagnosis || '',
      notes: v.notes || '',
      nextVisitDate: v.nextVisitDate
        ? new Date(v.nextVisitDate).toISOString().split('T')[0]
        : '',
      status: v.status || 'completed',
    });
    setShowVisitModal(true);
  };

  // ---------- PAYMENTS ----------
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPayment) {
        await api.put(`/api/clients/${id}/payments/${editingPayment._id}`, paymentForm);
        toast.success('Payment updated');
      } else {
        await api.post(`/api/clients/${id}/payments`, paymentForm);
        toast.success('Payment added');
      }
      setShowPaymentModal(false);
      setEditingPayment(null);
      setPaymentForm(emptyPayment);
      fetchClient();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save payment');
    }
  };

  const deletePayment = async (paymentId) => {
    if (!window.confirm('Delete this payment record?')) return;
    try {
      await api.delete(`/api/clients/${id}/payments/${paymentId}`);
      toast.success('Payment deleted');
      fetchClient();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const openEditPayment = (p) => {
    setEditingPayment(p);
    setPaymentForm({
      totalAmount: p.totalAmount || '',
      amountPaid: p.amountPaid || '',
      method: p.method || 'cash',
      branch: p.branch || 'westgate',
      description: p.description || '',
      notes: p.notes || '',
      paymentDate: p.paymentDate
        ? new Date(p.paymentDate).toISOString().split('T')[0]
        : '',
    });
    setShowPaymentModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!data) return null;

  const { client, visits, payments, appointments, stats } = data;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <button
        onClick={() => navigate('/clients')}
        className="flex items-center text-dental-red hover:underline mb-4 font-medium"
      >
        <FaArrowLeft className="mr-2" /> Back to Client Database
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-dental-red to-dental-dark-red text-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <FaUser className="text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{client.fullname}</h1>
              <p className="text-sm opacity-90">@{client.username}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              client.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {client.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-xs text-gray-500">Total Visits</p>
          <p className="text-2xl font-bold text-dental-red">{stats.totalVisits}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-xs text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold text-green-600">${stats.totalPaid.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-xs text-gray-500">Outstanding</p>
          <p className="text-2xl font-bold text-red-600">${stats.totalDue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-xs text-gray-500">Last Visit</p>
          <p className="text-sm font-bold text-gray-800">
            {stats.lastVisit ? new Date(stats.lastVisit).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { key: 'profile', label: 'Profile', icon: <FaUser /> },
          { key: 'visits', label: 'Visits', icon: <FaCalendarCheck /> },
          { key: 'payments', label: 'Payments', icon: <FaMoneyBillWave /> },
          { key: 'appointments', label: 'Appointments', icon: <FaClock /> },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-5 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${
              activeTab === t.key
                ? 'bg-dental-red text-white shadow'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-dental-red flex items-center gap-2">
                <FaIdCard /> Personal Information
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Full Name:</strong> {client.fullname}</p>
                <p><strong>Username:</strong> {client.username}</p>
                <p><strong>ID Number:</strong> {client.idNumber}</p>
                <p><strong>Gender:</strong> {client.gender || 'Not specified'}</p>
                <p>
                  <strong>Date of Birth:</strong>{' '}
                  {client.dateOfBirth
                    ? new Date(client.dateOfBirth).toLocaleDateString()
                    : 'Not specified'}
                </p>
              </div>

              <h3 className="font-bold text-lg text-dental-red flex items-center gap-2 mt-6">
                <FaEnvelope /> Contact Information
              </h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-dental-red" /> {client.email}
                </p>
                {client.phoneNumber && (
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-dental-red" /> {client.phoneNumber}
                  </p>
                )}
                {client.homeAddress && (
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-dental-red" /> {client.homeAddress}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-dental-red flex items-center gap-2">
                <FaShieldAlt /> Emergency Contact
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {client.emergencyContactName || 'Not specified'}
                </p>
                <p>
                  <strong>Phone:</strong> {client.emergencyContactPhone || 'Not specified'}
                </p>
              </div>

              <h3 className="font-bold text-lg text-dental-red flex items-center gap-2 mt-6">
                <FaNotesMedical /> Medical Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Allergies:</strong> {client.allergies || 'None recorded'}
                </p>
                <p>
                  <strong>Medical History:</strong> {client.medicalHistory || 'None recorded'}
                </p>
                <p>
                  <strong>Insurance:</strong>{' '}
                  {client.insuranceProvider
                    ? `${client.insuranceProvider} (${client.insuranceNumber || 'N/A'})`
                    : 'None'}
                </p>
              </div>

              {client.clientNotes && (
                <>
                  <h3 className="font-bold text-lg text-dental-red flex items-center gap-2 mt-6">
                    <FaNotesMedical /> Notes
                  </h3>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded p-3">
                    {client.clientNotes}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* VISITS */}
        {activeTab === 'visits' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-dental-red flex items-center gap-2">
                <FaCalendarCheck /> Visit History ({visits.length})
              </h3>
              <button
                onClick={() => {
                  setEditingVisit(null);
                  setVisitForm(emptyVisit);
                  setShowVisitModal(true);
                }}
                className="btn-primary flex items-center"
              >
                <FaPlus className="mr-2" /> Add Visit
              </button>
            </div>

            {visits.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No visit records yet.</p>
            ) : (
              <div className="space-y-3">
                {visits.map((v) => (
                  <div
                    key={v._id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-dental-red transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-1 bg-dental-red/10 text-dental-red rounded text-xs font-semibold uppercase">
                            {v.visitType}
                          </span>
                          <span className="text-sm font-semibold">
                            {new Date(v.visitDate).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-500">
                            • {branchLabel(v.branch)}
                          </span>
                          {v.doctor && (
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <FaUserMd className="text-dental-red" />
                              {v.doctor.fullname}
                            </span>
                          )}
                        </div>
                        {v.treatment && (
                          <p className="text-sm mt-2">
                            <strong>Treatment:</strong> {v.treatment}
                          </p>
                        )}
                        {v.diagnosis && (
                          <p className="text-sm">
                            <strong>Diagnosis:</strong> {v.diagnosis}
                          </p>
                        )}
                        {v.notes && (
                          <p className="text-sm text-gray-600 italic mt-1">{v.notes}</p>
                        )}
                        {v.nextVisitDate && (
                          <p className="text-xs text-amber-700 mt-2">
                            <FaClock className="inline mr-1" /> Next visit scheduled:{' '}
                            {new Date(v.nextVisitDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => openEditVisit(v)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteVisit(v._id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PAYMENTS */}
        {activeTab === 'payments' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-dental-red flex items-center gap-2">
                <FaMoneyBillWave /> Payment Records ({payments.length})
              </h3>
              <button
                onClick={() => {
                  setEditingPayment(null);
                  setPaymentForm(emptyPayment);
                  setShowPaymentModal(true);
                }}
                className="btn-primary flex items-center"
              >
                <FaPlus className="mr-2" /> Record Payment
              </button>
            </div>

            {payments.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No payment records yet.</p>
            ) : (
              <div className="space-y-3">
                {payments.map((p) => (
                  <div
                    key={p._id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-dental-red transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-sm font-semibold">
                            {new Date(p.paymentDate).toLocaleDateString()}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs uppercase font-semibold">
                            {p.method}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              p.status === 'paid'
                                ? 'bg-green-100 text-green-700'
                                : p.status === 'partial'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                        <p className="text-sm mt-1">
                          <strong>Total:</strong> ${p.totalAmount.toFixed(2)} •{' '}
                          <strong>Paid:</strong> ${p.amountPaid.toFixed(2)} •{' '}
                          <strong className="text-red-600">
                            Due: ${p.amountDue.toFixed(2)}
                          </strong>
                        </p>
                        {p.description && (
                          <p className="text-sm text-gray-600">{p.description}</p>
                        )}
                        {p.notes && (
                          <p className="text-xs text-gray-500 italic">{p.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => openEditPayment(p)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deletePayment(p._id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div>
            <h3 className="font-bold text-lg text-dental-red flex items-center gap-2 mb-4">
              <FaClock /> Appointment History ({appointments.length})
            </h3>
            {appointments.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No appointments yet.</p>
            ) : (
              <div className="space-y-3">
                {appointments.map((a) => (
                  <div
                    key={a._id}
                    className="border border-gray-200 rounded-lg p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">
                        {new Date(a.date).toLocaleDateString()} at {a.time}
                      </p>
                      <p className="text-xs text-gray-500">
                        {branchLabel(a.branch)} • {a.status}
                      </p>
                      {a.doctor && (
                        <p className="text-xs text-gray-600">
                          Doctor: {a.doctor.fullname}
                        </p>
                      )}
                    </div>
                    <span
                      className={`badge badge-${a.status}`}
                    >
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---------- VISIT MODAL ---------- */}
      <Modal
        isOpen={showVisitModal}
        onClose={() => setShowVisitModal(false)}
        title={editingVisit ? 'Edit Visit' : 'Add Visit Record'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleVisitSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Visit Date *</label>
              <input
                type="date"
                value={visitForm.visitDate}
                onChange={(e) => setVisitForm({ ...visitForm, visitDate: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Visit Type</label>
              <select
                value={visitForm.visitType}
                onChange={(e) => setVisitForm({ ...visitForm, visitType: e.target.value })}
                className="input-field"
              >
                <option value="checkup">Check-up</option>
                <option value="treatment">Treatment</option>
                <option value="emergency">Emergency</option>
                <option value="consultation">Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="cleaning">Cleaning</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Doctor</label>
              <select
                value={visitForm.doctor}
                onChange={(e) => setVisitForm({ ...visitForm, doctor: e.target.value })}
                className="input-field"
              >
                <option value="">Select doctor...</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.fullname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Branch</label>
              <select
                value={visitForm.branch}
                onChange={(e) => setVisitForm({ ...visitForm, branch: e.target.value })}
                className="input-field"
              >
                <option value="westgate">Westgate Mall</option>
                <option value="newlands">Newlands Shopping Centre</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Treatment</label>
            <input
              type="text"
              value={visitForm.treatment}
              onChange={(e) => setVisitForm({ ...visitForm, treatment: e.target.value })}
              className="input-field"
              placeholder="e.g. Filling, extraction, cleaning"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Diagnosis</label>
            <input
              type="text"
              value={visitForm.diagnosis}
              onChange={(e) => setVisitForm({ ...visitForm, diagnosis: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Notes</label>
            <textarea
              value={visitForm.notes}
              onChange={(e) => setVisitForm({ ...visitForm, notes: e.target.value })}
              className="input-field"
              rows="2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Next Visit Date</label>
              <input
                type="date"
                value={visitForm.nextVisitDate}
                onChange={(e) =>
                  setVisitForm({ ...visitForm, nextVisitDate: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Status</label>
              <select
                value={visitForm.status}
                onChange={(e) => setVisitForm({ ...visitForm, status: e.target.value })}
                className="input-field"
              >
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No-show</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="flex-1 btn-primary">
              {editingVisit ? 'Update' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setShowVisitModal(false)}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* ---------- PAYMENT MODAL ---------- */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title={editingPayment ? 'Edit Payment' : 'Record Payment'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Total Amount ($) *</label>
              <input
                type="number"
                step="0.01"
                value={paymentForm.totalAmount}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, totalAmount: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Amount Paid ($) *</label>
              <input
                type="number"
                step="0.01"
                value={paymentForm.amountPaid}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, amountPaid: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Payment Method</label>
              <select
                value={paymentForm.method}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, method: e.target.value })
                }
                className="input-field"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="ecocash">EcoCash</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="insurance">Insurance</option>
                <option value="mobile-money">Mobile Money</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Branch</label>
              <select
                value={paymentForm.branch}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, branch: e.target.value })
                }
                className="input-field"
              >
                <option value="westgate">Westgate Mall</option>
                <option value="newlands">Newlands Shopping Centre</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Payment Date</label>
              <input
                type="date"
                value={paymentForm.paymentDate}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, paymentDate: e.target.value })
                }
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <input
              type="text"
              value={paymentForm.description}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, description: e.target.value })
              }
              className="input-field"
              placeholder="e.g. Root canal treatment"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Notes</label>
            <textarea
              value={paymentForm.notes}
              onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
              className="input-field"
              rows="2"
            />
          </div>

          <div className="bg-gray-50 rounded p-3 text-sm">
            <strong>Amount Due:</strong> $
            {Math.max(
              0,
              (Number(paymentForm.totalAmount) || 0) - (Number(paymentForm.amountPaid) || 0)
            ).toFixed(2)}
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="flex-1 btn-primary">
              {editingPayment ? 'Update' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
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

export default ClientDetails;