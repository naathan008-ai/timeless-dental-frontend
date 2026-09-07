import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/appointments/my-appointments');
      setAppointments(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch');
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  }, []);

  const bookAppointment = useCallback(async (data) => {
    try {
      const res = await api.post('/api/appointments/book', data);
      toast.success('Appointment booked!');
      await fetchAppointments();
      return { success: true, data: res.data };
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
      return { success: false, error: err.response?.data?.message };
    }
  }, [fetchAppointments]);

  const cancelAppointment = useCallback(async (id) => {
    try {
      await api.delete(`/api/appointments/${id}`);
      toast.success('Cancelled');
      await fetchAppointments();
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cancellation failed');
      return { success: false };
    }
  }, [fetchAppointments]);

  const getAvailableSlots = useCallback(async (date, branch) => {
    try {
      const res = await api.get('/api/appointments/available', { params: { date, branch } });
      return res.data.availableSlots;
    } catch (err) {
      toast.error('Could not load slots');
      return [];
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return { appointments, loading, error, fetchAppointments, bookAppointment, cancelAppointment, getAvailableSlots };
};