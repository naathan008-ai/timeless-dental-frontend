import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  FaUserMd, FaMapMarkerAlt, FaTooth, FaGlobe, 
  FaPhone, FaEnvelope, FaInfoCircle, FaTimes 
} from 'react-icons/fa';

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
      const res = await api.get('/api/users/public/staff');
      setStaff(res.data);
    } catch (err) {
      console.error('Failed to load staff', err);
    } finally {
      setLoading(false);
    }
  };

  const westgateStaff = staff.filter((s) => s.branch === 'westgate');
  const newlandsStaff = staff.filter((s) => s.branch === 'newlands');
  const allBranchesStaff = staff.filter((s) => s.branch === 'all' || !s.branch);

  const StaffCard = ({ member }) => (
    <div 
      onClick={() => setSelectedMember(member)}
      className="cursor-pointer card text-center flex flex-col items-center group relative overflow-hidden bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-all duration-300 hover:shadow-glow"
    >
      <div className="w-24 h-24 rounded-full mb-4 shadow-inner relative z-10 overflow-hidden border-4 border-white dark:border-gray-700">
        {member.profilePicture ? (
          <img 
            src={member.profilePicture} 
            alt={member.fullname} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.onerror = null; e.target.src = ''; }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <FaUserMd className="text-4xl text-dental-red" />
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1 relative z-10">{member.fullname}</h3>
      <p className="text-sm font-semibold uppercase tracking-wider mb-2 relative z-10 text-dental-red">{member.role}</p>
      
      {member.specialization && (
        <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-full relative z-10">
          {member.specialization}
        </p>
      )}

      <div className="mt-4 text-xs font-semibold text-gray-400 flex items-center gap-1 group-hover:text-dental-red transition-colors">
        <FaInfoCircle /> View Profile
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-100 dark:bg-gray-700 p-2 rounded-full transition-colors"
            >
              <FaTimes />
            </button>

            <div className="flex flex-col items-center mt-2">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg border-4 border-dental-red">
                {selectedMember.profilePicture ? (
                  <img src={selectedMember.profilePicture} alt={selectedMember.fullname} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-red-50 flex items-center justify-center">
                    <FaUserMd className="text-5xl text-dental-red" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedMember.fullname}</h2>
              <p className="text-dental-red font-bold uppercase tracking-wider text-sm mt-1">{selectedMember.role}</p>
              {selectedMember.specialization && (
                <span className="text-xs bg-red-50 text-dental-red px-3 py-1 rounded-full mt-2 font-medium">
                  {selectedMember.specialization}
                </span>
              )}

              <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-6"></div>

              <div className="w-full space-y-4">
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
                {selectedMember.email && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl">
                    <FaEnvelope className="text-dental-red text-lg mr-3" />
                    <span className="font-medium truncate">{selectedMember.email}</span>
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