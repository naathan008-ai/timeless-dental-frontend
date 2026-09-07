import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaChartLine, FaUser, FaClock, FaFilter, FaSearch } from 'react-icons/fa';

const ActivityMonitor = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await api.get('/api/users/stats/dashboard');
      setActivities(res.data.recentActivity || []);
    } catch (err) {
      toast.error('Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action) => {
    const map = {
      LOGIN: 'bg-blue-100 text-blue-700',
      REGISTER: 'bg-green-100 text-green-700',
      BOOK_APPOINTMENT: 'bg-purple-100 text-purple-700',
      CANCEL_APPOINTMENT: 'bg-red-100 text-red-700',
      UPDATE_APPOINTMENT: 'bg-yellow-100 text-yellow-700',
      DELETE_USER: 'bg-red-100 text-red-700',
      CREATE_USER: 'bg-green-100 text-green-700',
      GRANT_IT_PRIVILEGES: 'bg-indigo-100 text-indigo-700',
      REMOVE_IT_PRIVILEGES: 'bg-orange-100 text-orange-700',
    };
    return map[action] || 'bg-gray-100 text-gray-700';
  };

  const filtered = activities.filter(a => {
    if (filter !== 'all' && a.action !== filter) return false;
    if (search) {
      const term = search.toLowerCase();
      const user = a.user?.username?.toLowerCase() || '';
      const action = a.action.toLowerCase();
      return user.includes(term) || action.includes(term);
    }
    return true;
  });

  if (loading) return <div className="flex justify-center items-center h-64"><div className="spinner"></div></div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaChartLine className="mr-3 text-dental-red" /> Activity Monitor
      </h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field w-48">
          <option value="all">All Actions</option>
          <option value="LOGIN">Login</option>
          <option value="REGISTER">Register</option>
          <option value="BOOK_APPOINTMENT">Book Appointment</option>
          <option value="CANCEL_APPOINTMENT">Cancel Appointment</option>
          <option value="UPDATE_APPOINTMENT">Update Appointment</option>
          <option value="CREATE_USER">Create User</option>
          <option value="DELETE_USER">Delete User</option>
          <option value="GRANT_IT_PRIVILEGES">Grant IT</option>
          <option value="REMOVE_IT_PRIVILEGES">Remove IT</option>
        </select>
        <input type="text" placeholder="Search user or action..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field w-64" />
      </div>
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No activities found</p>
        ) : (
          filtered.map((a) => (
            <div key={a._id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                {a.action === 'LOGIN' ? '🔐' : a.action === 'REGISTER' ? '📝' : a.action === 'BOOK_APPOINTMENT' ? '📅' : '📋'}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <span className="font-semibold">{a.user?.username || 'System'}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${getActionColor(a.action)}`}>{a.action}</span>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(a.createdAt).toLocaleString()}</span>
                </div>
                {a.details && Object.keys(a.details).length > 0 && (
                  <pre className="mt-1 text-xs text-gray-600 bg-white p-2 rounded border border-gray-200">{JSON.stringify(a.details, null, 2)}</pre>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityMonitor;