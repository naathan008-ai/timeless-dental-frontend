import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTooth, FaDirections } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Message sent! We\'ll get back to you.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  const branches = [
    {
      name: 'Westgate Mall',
      address: 'Westgate Mall, Harare, Zimbabwe',
      phone: '+26377 885 5511',
      mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.123456789!2d31.05!3d-17.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ5JzEyLjAiUyAzMcKwMDMnMDAuMCJF!5e0!3m2!1sen!2szw!4v1234567890',
      directions: 'https://www.google.com/maps/dir//Westgate+Mall+Harare+Zimbabwe'
    },
    {
      name: 'Newlands Shopping Centre',
      address: 'Newlands Shopping Centre, Harare, Zimbabwe',
      phone: '(024)2333271',
      mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.987654321!2d31.10!3d-17.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDUxJzAwLjAiUyAzMcKwMDYnMDAuMCJF!5e0!3m2!1sen!2szw!4v1234567891',
      directions: 'https://www.google.com/maps/dir//Newlands+Shopping+Centre+Harare+Zimbabwe'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-dental-red text-center mb-12 flex items-center justify-center">
          <FaTooth className="mr-3" /> Contact Us
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="input-field" required />
              <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="input-field" required />
              <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} className="input-field" required />
              <textarea rows="4" placeholder="Your Message" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="input-field" required />
              <button type="submit" disabled={loading} className="w-full btn-primary">{loading ? 'Sending...' : 'Send Message'}</button>
            </form>
          </div>

          {/* Right: Contact Details + Mini Maps */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <FaPhone className="text-dental-red text-xl mt-1" />
                  <div><p className="font-semibold">Phone</p><p className="text-gray-600">(024)2333271</p></div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaEnvelope className="text-dental-red text-xl mt-1" />
                  <div><p className="font-semibold">Email</p><p className="text-gray-600">timelessdentalclinic@gmail.com</p></div>
                </div>
              </div>

              {/* Emergency banner */}
              <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-200">
                <p className="font-bold text-dental-red">🦷 Emergency?</p>
                <p className="text-gray-700">Call: <span className="font-bold">(024)2333271</span></p>
              </div>
            </div>

            {/* Branch info with mini maps */}
            {branches.map((b, idx) => (
              <div key={idx} className="card">
                <h3 className="text-xl font-bold mb-2">{b.name}</h3>
                <div className="mb-3 rounded-lg overflow-hidden shadow-sm">
                  <iframe
                    src={b.mapsEmbed}
                    width="100%"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${b.name}`}
                  ></iframe>
                </div>
                <p className="text-gray-600"><FaMapMarkerAlt className="inline mr-2 text-dental-red" /> {b.address}</p>
                <p className="text-gray-600"><FaPhone className="inline mr-2 text-dental-red" /> {b.phone}</p>
                <a
                  href={b.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-dental-red hover:underline font-medium"
                >
                  <FaDirections className="inline mr-1" /> Get Directions
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;