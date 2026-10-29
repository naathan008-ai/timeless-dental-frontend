import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaUserMd, FaUserTie, FaMapMarkerAlt, FaTooth } from 'react-icons/fa';

const Team = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await api.get('/api/users/public/staff');
      setStaff(res.data);
    } catch (err) {
      console.error('Failed to load staff', err);
    } finally {
      setLoading(false);
    }
  };

  const westgateStaff = staff.filter((s) => s.branch === 'westgate' || !s.branch);
  const newlandsStaff = staff.filter((s) => s.branch === 'newlands');

  const StaffCard = ({ member }) => (
    <div className="card text-center flex flex-col items-center group relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full blur-2xl group-hover:bg-red-100 dark:group-hover:bg-red-900/40 transition-all duration-500"></div>
      
      <div className="w-24 h-24 rounded-full mb-4 shadow-inner relative z-10 overflow-hidden border-4 border-white dark:border-gray-700">
        {member.profilePicture ? (
          <img 
            src={member.profilePicture} 
            alt={member.fullname} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = ''; // Fallback to icon if image fails to load
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
            {member.role === 'doctor' ? (
              <FaUserMd className="text-4xl text-dental-red" />
            ) : (
              <FaUserTie className="text-4xl text-blue-600 dark:text-blue-400" />
            )}
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1 relative z-10">
        {member.fullname}
      </h3>
      
      <p className={`text-sm font-semibold uppercase tracking-wider mb-2 relative z-10 ${
        member.role === 'doctor' ? 'text-dental-red' : 'text-blue-600 dark:text-blue-400'
      }`}>
        {member.role}
      </p>

      {member.specialization && (
        <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-3 py-1 rounded-full relative z-10">
          {member.specialization}
        </p>
      )}
    </div>
  );

  const BranchSection = ({ title, icon, staffList, colorClass }) => (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-4 rounded-2xl ${colorClass} text-white shadow-lg`}>
          {icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
          <p className="text-gray-500 dark:text-gray-400">Meet the team at this location</p>
        </div>
      </div>

      {staffList.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 text-center text-gray-500 dark:text-gray-400">
          Our team for this branch is currently being updated. Please check back soon.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staffList.map((member) => (
            <StaffCard key={member._id} member={member} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-full shadow-inner mb-6 animate-float">
          <FaTooth className="text-4xl text-dental-red" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-dental-red mb-4 tracking-wide">
          Our Team
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Dedicated professionals committed to giving you the best dental care in Harare.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <BranchSection 
            title="Westgate Mall" 
            icon={<FaMapMarkerAlt className="text-2xl" />}
            staffList={westgateStaff}
            colorClass="bg-gradient-to-br from-red-500 to-dental-dark-red"
          />
          
          <BranchSection 
            title="Newlands Shopping Centre" 
            icon={<FaMapMarkerAlt className="text-2xl" />}
            staffList={newlandsStaff}
            colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
          />
        </>
      )}
    </div>
  );
};

export default Team;