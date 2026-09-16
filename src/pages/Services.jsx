import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaTooth, FaTeeth, FaTeethOpen, FaSyringe, FaXRay, FaHeartbeat,
  FaChild, FaSmile, FaMagic, FaShieldAlt, FaUserMd, FaStethoscope,
  FaArrowRight, FaCheckCircle, FaClock, FaAward
} from 'react-icons/fa';
import { RiToothLine, RiHeartPulseLine, RiShieldCheckLine } from 'react-icons/ri';

const Services = () => {
  const { isAuthenticated } = useAuth();

  const services = [
    {
      icon: <FaTooth className="text-4xl" />,
      title: 'General Dentistry',
      description: 'Comprehensive check-ups, cleanings, and preventive care to keep your smile healthy year-round.',
      features: ['Routine check-ups', 'Professional cleaning', 'Fluoride treatment', 'Oral cancer screening'],
      color: 'from-red-500 to-red-700',
    },
    {
      icon: <FaMagic className="text-4xl" />,
      title: 'Cosmetic Dentistry',
      description: 'Transform your smile with our advanced cosmetic treatments tailored to your unique look.',
      features: ['Teeth whitening', 'Veneers', 'Smile makeover', 'Bonding'],
      color: 'from-pink-500 to-red-600',
    },
    {
      icon: <FaTeethOpen className="text-4xl" />,
      title: 'Orthodontics',
      description: 'Straighten your teeth discreetly with modern braces and clear aligner solutions.',
      features: ['Traditional braces', 'Clear aligners', 'Retainers', 'Bite correction'],
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: <FaSyringe className="text-4xl" />,
      title: 'Restorative Dentistry',
      description: 'Restore damaged or missing teeth with our state-of-the-art restorative procedures.',
      features: ['Fillings', 'Crowns & bridges', 'Dental implants', 'Dentures'],
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: <FaHeartbeat className="text-4xl" />,
      title: 'Emergency Care',
      description: 'Immediate relief and expert care for dental emergencies, whenever you need us most.',
      features: ['Same-day appointments', 'Pain relief', 'Trauma care', '24/7 hotline'],
      color: 'from-red-600 to-rose-700',
    },
    {
      icon: <FaChild className="text-4xl" />,
      title: 'Pediatric Dentistry',
      description: 'Gentle, friendly dental care designed to make children feel comfortable and safe.',
      features: ['Kid-friendly environment', 'Preventive care', 'Sealants', 'Education'],
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: <FaXRay className="text-4xl" />,
      title: 'Diagnostic Imaging',
      description: 'Advanced digital X-rays and 3D imaging for accurate diagnosis and treatment planning.',
      features: ['Digital X-rays', '3D CBCT scans', 'Low radiation', 'Instant results'],
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: 'Periodontal Care',
      description: 'Specialized treatment for gum disease to protect the foundation of your smile.',
      features: ['Deep cleaning', 'Gum therapy', 'Laser treatment', 'Maintenance'],
      color: 'from-purple-500 to-violet-600',
    },
    {
      icon: <FaSmile className="text-4xl" />,
      title: 'Teeth Whitening',
      description: 'Professional in-office and take-home whitening for a brighter, more confident smile.',
      features: ['In-office whitening', 'Take-home kits', 'Long-lasting results', 'Safe & effective'],
      color: 'from-yellow-400 to-amber-500',
    },
  ];

  const stats = [
    { value: '10+', label: 'Years Experience', icon: <FaAward /> },
    { value: '1000+', label: 'Happy Patients', icon: <FaSmile /> },
    { value: '15+', label: 'Dental Services', icon: <FaTooth /> },
    { value: '2', label: 'Convenient Branches', icon: <FaShieldAlt /> },
  ];

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      {/* ---------- HERO ---------- */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-full shadow-inner mb-6 animate-float">
          <FaTooth className="text-5xl text-dental-red" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-dental-red mb-4 tracking-wide">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Comprehensive dental care designed around you. From routine check-ups to advanced
          cosmetic treatments, our expert team delivers world-class care in a comfortable,
          modern environment.
        </p>
      </div>

      {/* ---------- STATS ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-20">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-glass hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border border-white/20"
          >
            <div className="text-3xl text-dental-red mb-2 flex justify-center">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ---------- SERVICES GRID ---------- */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
          What We Offer
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          A full spectrum of dental services under one roof, delivered by specialists who care.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-glass border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-glow-lg hover:-translate-y-2"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-dental-red transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle className="text-dental-red mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- WHY CHOOSE US ---------- */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="bg-gradient-to-br from-red-600 to-dental-dark-red text-white rounded-4xl p-10 md:p-14 shadow-glow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Why Choose Timeless Dental?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                <RiToothLine className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Technology</h3>
              <p className="text-red-100 text-sm">
                We invest in the latest dental technology to ensure precise, comfortable care.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                <RiHeartPulseLine className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Patient-First Approach</h3>
              <p className="text-red-100 text-sm">
                Your comfort and satisfaction are our top priority at every visit.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                <RiShieldCheckLine className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Trusted Expertise</h3>
              <p className="text-red-100 text-sm">
                Our team of certified specialists brings years of experience to every treatment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- CTA ---------- */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-glass border border-white/20">
          <FaClock className="text-4xl text-dental-red mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Ready to Transform Your Smile?
          </h2>
          <p className="text-gray-600 mb-6">
            Book an appointment today and let our expert team take care of your dental health.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/appointments/book" className="btn-primary inline-flex items-center">
                Book Appointment <FaArrowRight className="ml-2" />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary inline-flex items-center">
                  Get Started <FaArrowRight className="ml-2" />
                </Link>
                <Link to="/login" className="btn-secondary inline-flex items-center">
                  Sign In
                </Link>
              </>
            )}
            <Link to="/contact" className="btn-secondary inline-flex items-center">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;