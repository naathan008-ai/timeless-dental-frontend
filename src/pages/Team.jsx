import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaUserMd, FaMapMarkerAlt, FaTooth, FaGlobe, FaInfoCircle, FaTimes, FaPhone, FaUser } from 'react-icons/fa';

const branchLabel = (b) =>
  b === 'westgate' ? 'Westgate Mall' : b === 'newlands' ? 'Newlands Shopping Centre' : b === 'all' ? 'All Branches' : 'Unassigned';

const Team = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await api.get('/api/team/public');
      setStaff(res.data);
    } catch (err) {
      console.error('Failed to load staff', err);
    } finally {
      setLoading(false);
    }
  };

  const westgateStaff = staff.filter((s) => s.branch === 'westgate');
  const newlandsStaff = staff.filter((s) => s.branch === 'newlands');
  const allBranchesStaff = staff.filter((s) => s.branch === 'all');

  const StaffCard = ({ member }) => (
    <div 
      onClick={() => setSelectedMember(member)}
      className="relative overflow-hidden rounded-3xl h-[400px] w-full cursor-pointer group shadow-xl border border-gray-200 dark:border-gray-700 hover:-translate-y-2 transition-all duration-300"
    >
      {member.profilePicture ? (
        <img 
          src={member.profilePicture} 
          alt={member.fullname} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => { e.target.onerror = null; e.target.src = ''; }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
          <FaUserMd className="text-7xl text-dental-red opacity-50" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/10 dark:bg-black/40 backdrop-blur-md border-t border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
          {member.fullname}
        </h3>
        <p className="text-sm font-bold uppercase tracking-wider text-red-400 drop-shadow-md">
          {member.role}
        </p>
        
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-xs font-medium text-white/90 bg-white/20 px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
            <FaMapMarkerAlt /> {branchLabel(member.branch)}
          </span>
          {member.specialization && (
            <span className="text-xs font-medium text-white/90 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
              {member.specialization}
            </span>
          )}
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
        <FaInfoCircle />
      </div>
    </div>
  );

  const BranchSection = ({ title, icon, staffList, colorClass }) => {
    if (staffList.length === 0) return null;

    return (
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-4 rounded-2xl ${colorClass} text-white shadow-lg`}>{icon}</div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
            <p className="text-gray-500 dark:text-gray-400">Meet the team at this location</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {staffList.map((member) => (
            <StaffCard key={member._id} member={member} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-full shadow-inner mb-6 animate-float">
          <FaTooth className="text-4xl text-dental-red" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-dental-red mb-4 tracking-wide">Our Team</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Dedicated professionals committed to giving you the best dental care in Harare.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64"><div className="spinner"></div></div>
      ) : (
        <>
          <BranchSection title="Westgate Mall" icon={<FaMapMarkerAlt className="text-2xl" />} staffList={westgateStaff} colorClass="bg-gradient-to-br from-red-500 to-dental-dark-red" />
          <BranchSection title="Newlands Shopping Centre" icon={<FaMapMarkerAlt className="text-2xl" />} staffList={newlandsStaff} colorClass="bg-gradient-to-br from-blue-500 to-indigo-600" />
          <BranchSection title="Head Office & All Branches" icon={<FaGlobe className="text-2xl" />} staffList={allBranchesStaff} colorClass="bg-gradient-to-br from-gray-700 to-gray-900" />
        </>
      )}

      {selectedMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl relative">
            
            <div className="h-48 w-full relative">
              {selectedMember.profilePicture ? (
                <img src={selectedMember.profilePicture} alt={selectedMember.fullname} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-red-50 dark:bg-gray-900 flex items-center justify-center">
                  <FaUserMd className="text-6xl text-dental-red" />
                </div>
              )}
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-white hover:text-red-500 bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6 relative">
              <div className="absolute -top-10 left-6 right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg text-center border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedMember.fullname}</h2>
                <p className="text-dental-red font-bold uppercase tracking-wider text-sm mt-1">{selectedMember.role}</p>
              </div>

              <div className="mt-10 space-y-4">
                {selectedMember.specialization && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl">
                    <FaUser className="text-dental-red text-lg mr-3" />
                    <span className="font-medium">{selectedMember.specialization}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl">
                  <FaMapMarkerAlt className="text-dental-red text-lg mr-3" />
                  <span className="font-medium">{branchLabel(selectedMember.branch)}</span>
                </div>
                {selectedMember.phoneNumber && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl">
                    <FaPhone className="text-dental-red text-lg mr-3" />
                    <span className="font-medium">{selectedMember.phoneNumber}</span>
                  </div>
                )}
                {selectedMember.username && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl">
                    <FaInfoCircle className="text-dental-red text-lg mr-3" />
                    <span className="font-medium">@{selectedMember.username}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;