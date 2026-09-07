import React, { useState, useRef, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaRobot, FaUser, FaPaperPlane, FaTooth } from 'react-icons/fa';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your dental AI assistant. How can I help?' }
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
    } catch (e) {}
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await api.post('/api/ai/advice', {
        message: input,
        conversationHistory: messages.slice(-5)
      });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.response }]);
    } catch (err) {
      toast.error('AI response failed');
    } finally {
      setLoading(false);
    }
  };

  const transferToAgent = async () => {
    try {
      await api.post('/api/ai/transfer-to-agent', { message: messages[messages.length-1]?.content });
      toast.success('Request sent to receptionist');
      setMessages(prev => [...prev, { role: 'system', content: '✅ Request sent to receptionist.' }]);
    } catch (err) {
      toast.error('Transfer failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto card animate-fadeIn">
        <div className="bg-dental-red text-white p-4 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaRobot className="text-2xl" />
            <h2 className="text-xl font-bold">Dental AI Assistant</h2>
          </div>
          {isAgentAvailable && (
            <button onClick={transferToAgent} className="bg-white text-dental-red px-4 py-1 rounded-lg hover:bg-red-50">
              Talk to Agent
            </button>
          )}
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-dental-red text-white' : 'bg-white border border-gray-200'}`}>
                {msg.role === 'system' && <span className="text-blue-600 font-semibold">System: </span>}
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-500">AI is thinking...</div>}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-gray-200 flex space-x-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Ask about dental care..." className="flex-1 input-field" disabled={loading} />
          <button onClick={sendMessage} disabled={loading || !input.trim()} className="btn-primary px-4 py-2"><FaPaperPlane /></button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;