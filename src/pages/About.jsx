import React from 'react';
import { FaTooth, FaHeart, FaAward, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto animate-fadeIn">
        <h1 className="text-4xl font-bold text-dental-red text-center mb-8 flex items-center justify-center"><FaTooth className="mr-3" /> About Us</h1>
        <div className="card mb-8">
          <h2 className="text-2xl font-bold flex items-center"><FaHeart className="text-dental-red mr-3" /> Our Mission</h2>
          <p className="text-gray-600 mt-2">To provide exceptional dental care in a comfortable, welcoming environment. We use the latest technology to ensure the best outcomes for our patients.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow text-center"><p className="text-3xl font-bold text-dental-red">2</p><p className="text-gray-600 text-sm">Branches</p></div>
          <div className="bg-white rounded-xl p-4 shadow text-center"><p className="text-3xl font-bold text-dental-red">1000+</p><p className="text-gray-600 text-sm">Patients</p></div>
          <div className="bg-white rounded-xl p-4 shadow text-center"><p className="text-3xl font-bold text-dental-red">10+</p><p className="text-gray-600 text-sm">Years Experience</p></div>
          <div className="bg-white rounded-xl p-4 shadow text-center"><p className="text-3xl font-bold text-dental-red">5</p><p className="text-gray-600 text-sm">Expert Dentists</p></div>
        </div>
        <div className="card">
          <h2 className="text-2xl font-bold flex items-center"><FaUsers className="text-dental-red mr-3" /> Our Team</h2>
          <p className="text-gray-600">Our team of dedicated professionals is committed to your oral health.</p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="text-center"><div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center text-3xl">👨‍⚕️</div><p className="font-semibold">Dr. John Smith</p><p className="text-sm text-gray-500">Lead Dentist</p></div>
            <div className="text-center"><div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center text-3xl">👩‍⚕️</div><p className="font-semibold">Dr. Sarah Johnson</p><p className="text-sm text-gray-500">Orthodontist</p></div>
            <div className="text-center"><div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center text-3xl">👨‍⚕️</div><p className="font-semibold">Dr. Michael Chen</p><p className="text-sm text-gray-500">Periodontist</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;