import React, { useState, useRef, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaRobot, FaUser, FaPaperPlane, FaTooth, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AIChat = () => {
  const { isAuthenticated, user } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: isAuthenticated
        ? `Hello ${user?.fullname || user?.username || ''}! 👋 I'm your dental AI assistant. How can I help you today?`
        : "Hello! 👋 I'm the Timeless Dental AI assistant. I can answer questions about dental care, our services, and general dental advice. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAgentAvailable, setIsAgentAvailable] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    checkAvailability();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkAvailability = async () => {
    try {
      const res = await api.get('/api/ai/agent-availability');
      setIsAgentAvailable(res.data.isAvailable);
    } catch (e) {
      /* ignore */
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await api.post('/api/ai/advice', {
        message: input,
        conversationHistory: messages.slice(-5),
      });
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.response }]);
    } catch (err) {
      toast.error('AI response failed');
    } finally {
      setLoading(false);
    }
  };

  const transferToAgent = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to chat with a receptionist.');
      return;
    }
    try {
      await api.post('/api/ai/transfer-to-agent', {
        message: messages[messages.length - 1]?.content,
      });
      toast.success('Request sent to receptionist');
      setMessages((prev) => [...prev, { role: 'system', content: '✅ Request sent to receptionist.' }]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Transfer failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto card animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-dental-dark-red text-white p-6 rounded-t-3xl flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FaRobot className="text-3xl" />
            <div>
              <h2 className="text-xl font-bold">Dental AI Assistant</h2>
              <p className="text-xs text-red-100">
                {isAuthenticated ? `Logged in as ${user?.username}` : 'Guest mode • Available 24/7'}
              </p>
            </div>
          </div>
          {isAuthenticated && isAgentAvailable && (
            <button
              onClick={transferToAgent}
              className="bg-white text-dental-red px-4 py-2 rounded-xl hover:bg-red-50 transition font-semibold"
            >
              Talk to Agent
            </button>
          )}
        </div>

        {/* Guest banner */}
        {!isAuthenticated && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-sm text-yellow-800 flex items-center">
            <FaLock className="mr-2" />
            <span>
              You're chatting as a guest. To book appointments or talk to a receptionist,{' '}
              <Link to="/login" className="font-semibold underline">
                log in
              </Link>{' '}
              or{' '}
              <Link to="/register" className="font-semibold underline">
                sign up
              </Link>
              .
            </span>
          </div>
        )}

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl whitespace-pre-wrap shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-dental-red text-white'
                    : msg.role === 'system'
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="spinner w-4 h-4"></div>
              <span>AI is thinking...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex space-x-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about dental care, pain, services..."
              className="flex-1 input-field"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="btn-primary px-5 py-3 disabled:opacity-50"
            >
              <FaPaperPlane />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <button onClick={() => setInput('How often should I visit the dentist?')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
              How often visit?
            </button>
            <button onClick={() => setInput('What should I do for tooth pain?')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
              Tooth pain?
            </button>
            <button onClick={() => setInput('What are your working hours?')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
              Working hours?
            </button>
            <button onClick={() => setInput('Do you offer teeth whitening?')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
              Whitening?
            </button>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4 max-w-3xl mx-auto">
        <div className="flex items-start space-x-3">
          <FaTooth className="text-red-600 text-xl mt-1" />
          <div className="text-sm text-red-800">
            <p className="font-semibold">💡 Emergency Notice</p>
            <p>For dental emergencies, call <strong>+263 71 2345678</strong> immediately.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;