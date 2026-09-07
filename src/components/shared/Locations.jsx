import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock, FaTooth, FaDirections } from 'react-icons/fa';

const Locations = () => {
  const branches = [
    {
      name: 'Westgate Mall',
      address: 'Westgate Mall, Harare, Zimbabwe',
      phone: '+26377 885 5511',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.123456789!2d31.05!3d-17.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ5JzEyLjAiUyAzMcKwMDMnMDAuMCJF!5e0!3m2!1sen!2szw!4v1234567890', // Replace with actual embed URL
      directionsUrl: 'https://www.google.com/maps/dir//Westgate+Mall+Harare+Zimbabwe',
      description: 'Conveniently located in Westgate with ample parking.',
      features: ['Free Parking', 'Wheelchair Accessible']
    },
    {
      name: 'Newlands Shopping Centre',
      address: 'Newlands Shopping Centre, Harare, Zimbabwe',
      phone: '(024)2333271',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.987654321!2d31.10!3d-17.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDUxJzAwLjAiUyAzMcKwMDYnMDAuMCJF!5e0!3m2!1sen!2szw!4v1234567891',
      directionsUrl: 'https://www.google.com/maps/dir//Newlands+Shopping+Centre+Harare+Zimbabwe',
      description: 'Modern facility in Newlands with family-friendly atmosphere.',
      features: ['Free Parking', 'Family Friendly']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 animate-fadeIn">
        <h1 className="text-4xl font-bold text-dental-red flex items-center justify-center">
          <FaTooth className="mr-3" /> Our Locations
        </h1>
        <p className="text-gray-600 mt-2">Visit us at one of our two branches in Harare</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {branches.map((b, i) => (
          <div key={i} className="card hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-bold mb-2">{b.name}</h2>
            <p className="text-gray-600 mb-4">{b.description}</p>

            {/* Google Maps embed preview */}
            <div className="mb-4 rounded-lg overflow-hidden shadow-md">
              <iframe
                src={b.googleMapsEmbed}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${b.name}`}
              ></iframe>
            </div>

            <div className="space-y-2 text-gray-600">
              <p><FaMapMarkerAlt className="inline mr-2 text-dental-red" /> {b.address}</p>
              <p><FaPhone className="inline mr-2 text-dental-red" /> {b.phone}</p>
              <p><FaClock className="inline mr-2 text-dental-red" /> {b.hours}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {b.features.map((f, idx) => (
                <span key={idx} className="px-3 py-1 bg-red-50 text-dental-red rounded-full text-sm">{f}</span>
              ))}
            </div>

            <a
              href={b.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block w-full text-center mt-4 flex items-center justify-center"
            >
              <FaDirections className="mr-2" /> Get Directions
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-red-50 rounded-2xl p-8 max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-dental-red mb-2">📋 Working Hours</h3>
        <p className="text-gray-700">Monday – Friday: 9:00 AM – 5:00 PM</p>
        <p className="text-gray-700">Saturday: 9:00 AM – 13:00 PM</p>
        <p className="text-gray-600 text-sm">Last appointment: 4:00 PM</p>
        <p className="text-gray-600 text-sm">Sunday: Closed</p>
        <p className="mt-4 text-sm text-gray-500">📞 Emergency: (024)2333271</p>
      </div>
    </div>
  );
};

export default Locations;