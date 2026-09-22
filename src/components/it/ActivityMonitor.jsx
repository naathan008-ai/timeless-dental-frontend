import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import {
  FaChartLine,
  FaSearch,
  FaFilter,
  FaUserPlus,
  FaUserEdit,
  FaUserMinus,
  FaSignInAlt,
  FaSignOutAlt,
  FaCalendarPlus,
  FaCalendarCheck,
  FaCalendarTimes,
  FaTrash,
  FaShieldAlt,
  FaUserShield,
  FaEnvelope,
  FaRobot,
  FaClock,
  FaCalendarDay,
  FaDownload,
} from 'react-icons/fa';

// Friendly action metadata
const ACTION_INFO = {
  LOGIN: {
    label: 'Logged In',
    icon: <FaSignInAlt />,
    color: 'bg-blue-100 text-blue-700',
    description: 'signed in to the system',
  },
  REGISTER: {
    label: 'Registered',
    icon: <FaUserPlus />,
    color: 'bg-emerald-100 text-emerald-700',
    description: 'created a new account',
  },
  BOOK_APPOINTMENT: {
    label: 'Booked Appointment',
    icon: <FaCalendarPlus />,
    color: 'bg-purple-100 text-purple-700',
    description: 'booked a new appointment',
  },
  CANCEL_APPOINTMENT: {
    label: 'Cancelled Appointment',
    icon: <FaCalendarTimes />,
    color: 'bg-red-100 text-red-700',
    description: 'cancelled an appointment',
  },
  UPDATE_APPOINTMENT: {
    label: 'Updated Appointment',
    icon: <FaCalendarCheck />,
    color: 'bg-yellow-100 text-yellow-700',
    description: 'updated appointment status',
  },
  DELETE_APPOINTMENT: {
    label: 'Deleted Appointment',
    icon: <FaTrash />,
    color: 'bg-red-100 text-red-700',
    description: 'permanently deleted an appointment',
  },
  CREATE_USER: {
    label: 'Created User',
    icon: <FaUserPlus />,
    color: 'bg-emerald-100 text-emerald-700',
    description: 'created a new user account',
  },
  UPDATE_USER: {
    label: 'Updated User',
    icon: <FaUserEdit />,
    color: 'bg-yellow-100 text-yellow-700',
    description: 'updated user details',
  },
  DELETE_USER: {
    label: 'Deleted User',
    icon: <FaUserMinus />,
    color: 'bg-red-100 text-red-700',
    description: 'deleted a user',
  },
  DEACTIVATE_USER: {
    label: 'Deactivated User',
    icon: <FaUserMinus />,
    color: 'bg-orange-100 text-orange-700',
    description: 'deactivated a user account',
  },
  GRANT_IT_PRIVILEGES: {
    label: 'Granted IT Privileges',
    icon: <FaShieldAlt />,
    color: 'bg-indigo-100 text-indigo-700',
    description: 'granted IT administrator privileges',
  },
  REMOVE_IT_PRIVILEGES: {
    label: 'Removed IT Privileges',
    icon: <FaUserShield />,
    color: 'bg-orange-100 text-orange-700',
    description: 'removed IT administrator privileges',
  },
  CHANGE_PASSWORD: {
    label: 'Changed Password',
    icon: <FaShieldAlt />,
    color: 'bg-blue-100 text-blue-700',
    description: 'changed account password',
  },
  SEND_MESSAGE: {
    label: 'Sent Message',
    icon: <FaEnvelope />,
    color: 'bg-cyan-100 text-cyan-700',
    description: 'sent a message to reception',
  },
  REPLY_MESSAGE: {
    label: 'Replied to Message',
    icon: <FaEnvelope />,
    color: 'bg-cyan-100 text-cyan-700',
    description: 'replied to a message',
  },
  AI_CHAT: {
    label: 'AI Chat',
    icon: <FaRobot />,
    color: 'bg-pink-100 text-pink-700',
    description: 'used the AI dental assistant',
  },
  TRANSFER_TO_AGENT: {
    label: 'Requested Agent',
    icon: <FaEnvelope />,
    color: 'bg-amber-100 text-amber-700',
    description: 'requested to speak with a receptionist',
  },
  CREATE_SCHEDULE: {
    label: 'Created Schedule',
    icon: <FaCalendarPlus />,
    color: 'bg-purple-100 text-purple-700',
    description: 'created a doctor schedule entry',
  },
  DELETE_SCHEDULE: {
    label: 'Deleted Schedule',
    icon: <FaTrash />,
    color: 'bg-red-100 text-red-700',
    description: 'deleted a doctor schedule entry',
  },
  CREATE_CLIENT: {
    label: 'Created Client',
    icon: <FaUserPlus />,
    color: 'bg-emerald-100 text-emerald-700',
    description: 'added a new client to the database',
  },
  UPDATE_CLIENT: {
    label: 'Updated Client',
    icon: <FaUserEdit />,
    color: 'bg-yellow-100 text-yellow-700',
    description: 'updated client details',
  },
  DELETE_CLIENT: {
    label: 'Deleted Client',
    icon: <FaUserMinus />,
    color: 'bg-red-100 text-red-700',
    description: 'deleted a client',
  },
  DEACTIVATE_CLIENT: {
    label: 'Deactivated Client',
    icon: <FaUserMinus />,
    color: 'bg-orange-100 text-orange-700',
    description: 'deactivated a client account',
  },
  ADD_VISIT: {
    label: 'Added Visit',
    icon: <FaCalendarCheck />,
    color: 'bg-emerald-100 text-emerald-700',
    description: 'recorded a new visit',
  },
  UPDATE_VISIT: {
    label: 'Updated Visit',
    icon: <FaCalendarCheck />,
    color: 'bg-yellow-100 text-yellow-700',
    description: 'updated a visit record',
  },
  DELETE_VISIT: {
    label: 'Deleted Visit',
    icon: <FaTrash />,
    color: 'bg-red-100 text-red-700',
    description: 'deleted a visit record',
  },
  ADD_PAYMENT: {
    label: 'Recorded Payment',
    icon: <FaCalendarCheck />,
    color: 'bg-green-100 text-green-700',
    description: 'recorded a payment',
  },
  UPDATE_PAYMENT: {
    label: 'Updated Payment',
    icon: <FaCalendarCheck />,
    color: 'bg-yellow-100 text-yellow-700',
    description: 'updated a payment record',
  },
  DELETE_PAYMENT: {
    label: 'Deleted Payment',
    icon: <FaTrash />,
    color: 'bg-red-100 text-red-700',
    description: 'deleted a payment record',
  },
};

// Category groups for filtering
const CATEGORIES = {
  all: { label: 'All Activity', filter: () => true },
  auth: {
    label: 'Login & Accounts',
    filter: (a) => ['LOGIN', 'REGISTER', 'CHANGE_PASSWORD'].includes(a.action),
  },
  appointments: {
    label: 'Appointments',
    filter: (a) =>
      a.action.includes('APPOINTMENT'),
  },
  users: {
    label: 'User Management',
    filter: (a) =>
      ['CREATE_USER', 'UPDATE_USER', 'DELETE_USER', 'DEACTIVATE_USER', 'GRANT_IT_PRIVILEGES', 'REMOVE_IT_PRIVILEGES'].includes(a.action),
  },
  clients: {
    label: 'Clients',
    filter: (a) => a.action.includes('CLIENT') || a.action.includes('VISIT') || a.action.includes('PAYMENT'),
  },
  messages: {
    label: 'Messages & AI',
    filter: (a) => ['SEND_MESSAGE', 'REPLY_MESSAGE', 'AI_CHAT', 'TRANSFER_TO_AGENT'].includes(a.action),
  },
  schedules: {
    label: 'Schedules',
    filter: (a) => a.action.includes('SCHEDULE'),
  },
};

const ActivityMonitor = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

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

  const getActionInfo = (action) =>
    ACTION_INFO[action] || {
      label: action.replace(/_/g, ' '),
      icon: <FaChartLine />,
      color: 'bg-gray-100 text-gray-700',
      description: 'performed an action',
    };

  // Format "what" nicely from the details
  const getActionDetail = (activity) => {
    const d = activity.details || {};
    switch (activity.action) {
      case 'LOGIN':
      case 'REGISTER':
        return d.username ? `as ${d.username}` : '';
      case 'BOOK_APPOINTMENT':
        return d.clientName
          ? `for ${d.clientName} at ${d.branch === 'westgate' ? 'Westgate Mall' : 'Newlands'}`
          : '';
      case 'UPDATE_APPOINTMENT':
      case 'CANCEL_APPOINTMENT':
        return d.status ? `— status set to ${d.status}` : '';
      case 'CREATE_USER':
      case 'DELETE_USER':
        return d.username ? `— ${d.username} (${d.role || ''})` : '';
      case 'UPDATE_USER':
        return d.updatedUser ? `— ${d.updatedUser}` : '';
      case 'GRANT_IT_PRIVILEGES':
        return d.grantedTo ? `to ${d.grantedTo}` : '';
      case 'REMOVE_IT_PRIVILEGES':
        return d.removedFrom ? `from ${d.removedFrom}` : '';
      case 'DEACTIVATE_USER':
        return d.deactivatedUser ? `— ${d.deactivatedUser}` : '';
      case 'CHANGE_PASSWORD':
        return d.targetUser ? `for ${d.targetUser}` : '';
      case 'CREATE_SCHEDULE':
        return d.doctor
          ? `— Dr. ${d.doctor} at ${d.branch === 'westgate' ? 'Westgate' : 'Newlands'}`
          : '';
      case 'CREATE_CLIENT':
      case 'UPDATE_CLIENT':
      case 'DELETE_CLIENT':
        return d.fullname ? `— ${d.fullname}` : '';
      case 'ADD_VISIT':
        return d.visitType ? `— ${d.visitType} visit` : '';
      case 'ADD_PAYMENT':
        return d.amount ? `— $${d.amount}` : '';
      default:
        return '';
    }
  };

  // Relative time formatting
  const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return past.toLocaleDateString();
  };

  const groupByDate = (items) => {
    const groups = {};
    items.forEach((item) => {
      const date = new Date(item.createdAt);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      let key;
      if (date.toDateString() === today.toDateString()) key = 'Today';
      else if (date.toDateString() === yesterday.toDateString()) key = 'Yesterday';
      else key = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return groups;
  };

  // Apply filters
  const filtered = activities.filter((a) => {
    // Category filter
    if (!CATEGORIES[activeCategory].filter(a)) return false;

    // Date filter
    if (dateFilter !== 'all') {
      const activityDate = new Date(a.createdAt);
      const now = new Date();
      if (dateFilter === 'today') {
        if (activityDate.toDateString() !== now.toDateString()) return false;
      } else if (dateFilter === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        if (activityDate < weekAgo) return false;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        if (activityDate < monthAgo) return false;
      }
    }

    // Search filter
    if (search) {
      const term = search.toLowerCase();
      const user = a.user?.username?.toLowerCase() || '';
      const action = getActionInfo(a.action).label.toLowerCase();
      const detail = getActionDetail(a).toLowerCase();
      return (
        user.includes(term) || action.includes(term) || detail.includes(term)
      );
    }
    return true;
  });

  const grouped = groupByDate(filtered);

  // Stats
  const stats = {
    total: activities.length,
    today: activities.filter(
      (a) => new Date(a.createdAt).toDateString() === new Date().toDateString()
    ).length,
    activeUsers: new Set(
      activities
        .filter((a) => {
          const d = new Date(a.createdAt);
          const dayAgo = new Date();
          dayAgo.setDate(dayAgo.getDate() - 1);
          return d > dayAgo;
        })
        .map((a) => a.user?.username)
    ).size,
  };

  const exportCSV = () => {
    if (filtered.length === 0) return toast.error('No activity to export');
    const rows = filtered.map((a) => ({
      Time: new Date(a.createdAt).toLocaleString(),
      User: a.user?.username || 'System',
      Action: getActionInfo(a.action).label,
      Detail: getActionDetail(a),
    }));
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(','),
      ...rows.map((r) =>
        headers.map((h) => `"${String(r[h]).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `activity-log-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Activity log downloaded');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-dental-red flex items-center">
            <FaChartLine className="mr-3" /> Activity Monitor
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            A full history of what's happening across your clinic
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="btn-secondary flex items-center text-sm"
        >
          <FaDownload className="mr-2" /> Export
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-glass border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Total Events
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
              <FaChartLine className="text-dental-red text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-glass border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Today
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.today}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <FaCalendarDay className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-glass border border-white/20 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Active (24h)
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stats.activeUsers}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
              <FaClock className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-glass border border-white/20 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-gray-50 rounded-xl px-3 py-2">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search activity, users or actions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-dental-red outline-none text-sm"
          >
            <option value="all">All time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
          </select>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === key
                  ? 'bg-dental-red text-white shadow-glow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity timeline */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-glass border border-white/20 text-center">
          <FaChartLine className="text-5xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No activity matches your filters.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                  {date}
                </h2>
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400">{items.length} events</span>
              </div>

              <div className="space-y-2">
                {items.map((a) => {
                  const info = getActionInfo(a.action);
                  const detail = getActionDetail(a);
                  return (
                    <div
                      key={a._id}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-glass hover:border-red-100 transition-all duration-300 flex items-center gap-4"
                    >
                      {/* Icon */}
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${info.color}`}
                      >
                        {info.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">
                            {a.user?.username || 'System'}
                          </span>{' '}
                          <span className="text-gray-500">
                            {info.description}
                          </span>
                          {detail && (
                            <span className="text-gray-700 font-medium">
                              {' '}
                              {detail}
                            </span>
                          )}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-400">
                            {new Date(a.createdAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <span className="text-xs text-gray-300">•</span>
                          <span className="text-xs text-gray-400">
                            {timeAgo(a.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Action badge */}
                      <span
                        className={`hidden md:inline-block px-3 py-1 rounded-full text-xs font-semibold ${info.color} flex-shrink-0`}
                      >
                        {info.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer note */}
      <div className="mt-6 text-center text-xs text-gray-400">
        Showing {filtered.length} of {activities.length} recorded events
      </div>
    </div>
  );
};

export default ActivityMonitor;