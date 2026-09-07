import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/messages');
      setMessages(res.data);
    } catch (err) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await api.get('/api/messages/unread-count');
      setUnreadCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const sendMessage = useCallback(async (content) => {
    try {
      const res = await api.post('/api/messages', { content });
      toast.success('Message sent');
      await fetchMessages();
      return { success: true, data: res.data };
    } catch (err) {
      toast.error('Failed to send');
      return { success: false };
    }
  }, [fetchMessages]);

  const markAsRead = useCallback(async (id) => {
    try {
      await api.put(`/api/messages/${id}/read`);
      await fetchMessages();
      await fetchUnreadCount();
    } catch (err) {
      toast.error('Failed to mark as read');
    }
  }, [fetchMessages, fetchUnreadCount]);

  useEffect(() => {
    fetchMessages();
    fetchUnreadCount();
  }, [fetchMessages, fetchUnreadCount]);

  return { messages, loading, unreadCount, fetchMessages, fetchUnreadCount, sendMessage, markAsRead };
};