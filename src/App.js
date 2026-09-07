import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import BookAppointment from './components/client/BookAppointment';
import ViewAppointments from './components/client/ViewAppointments';
import AIChat from './components/client/AIChat';
import ReceptionDashboard from './components/receptionist/ReceptionDashboard';
import ITDashboard from './components/it/ITDashboard';
import ManageUsers from './components/it/ManageUsers';
import ManageDoctors from './components/it/ManageDoctors';
import ManageAppointments from './components/it/ManageAppointments';
import ActivityMonitor from './components/it/ActivityMonitor';
import Locations from './components/shared/Locations';
import ContactUs from './components/shared/ContactUs';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Main container with subtle gradient background */}
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6 animate-fade-in">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/contact" element={<ContactUs />} />

              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/appointments/book" element={<PrivateRoute roles={['client']}><BookAppointment /></PrivateRoute>} />
              <Route path="/appointments/view" element={<PrivateRoute><ViewAppointments /></PrivateRoute>} />
              <Route path="/ai-chat" element={<PrivateRoute><AIChat /></PrivateRoute>} />

              <Route path="/reception/dashboard" element={<PrivateRoute roles={['receptionist','it']}><ReceptionDashboard /></PrivateRoute>} />

              <Route path="/it/dashboard" element={<PrivateRoute roles={['it']}><ITDashboard /></PrivateRoute>} />
              <Route path="/it/users" element={<PrivateRoute roles={['it']}><ManageUsers /></PrivateRoute>} />
              <Route path="/it/doctors" element={<PrivateRoute roles={['it']}><ManageDoctors /></PrivateRoute>} />
              <Route path="/it/appointments" element={<PrivateRoute roles={['it']}><ManageAppointments /></PrivateRoute>} />
              <Route path="/it/activity" element={<PrivateRoute roles={['it']}><ActivityMonitor /></PrivateRoute>} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" toastOptions={{ className: 'rounded-2xl shadow-glass' }} />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;