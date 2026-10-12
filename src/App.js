import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
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
import ManageClients from './components/shared/ManageClients';
import ClientDetails from './components/shared/ClientDetails';
import ActivityMonitor from './components/it/ActivityMonitor';
import Locations from './components/shared/Locations';
import ContactUs from './components/shared/ContactUs';
import './styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30">
      <Navbar />
      <main
        key={pathname}
        className="flex-grow container mx-auto px-4 py-6 animate-fade-in"
      >
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/ai-chat" element={<AIChat />} />

          {/* Client */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments/book"
            element={
              <PrivateRoute roles={['client']}>
                <BookAppointment />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments/view"
            element={
              <PrivateRoute>
                <ViewAppointments />
              </PrivateRoute>
            }
          />

          {/* Doctors & Schedules — IT + Reception */}
          <Route
            path="/doctors"
            element={
              <PrivateRoute roles={['it', 'receptionist']}>
                <ErrorBoundary>
                  <ManageDoctors />
                </ErrorBoundary>
              </PrivateRoute>
            }
          />

          {/* Reception */}
          <Route
            path="/reception/dashboard"
            element={
              <PrivateRoute roles={['receptionist', 'it']}>
                <ReceptionDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/reception/clients"
            element={
              <PrivateRoute roles={['receptionist', 'it']}>
                <ManageClients />
              </PrivateRoute>
            }
          />

          {/* Clients database */}
          <Route
            path="/clients"
            element={
              <PrivateRoute roles={['it', 'receptionist']}>
                <ManageClients />
              </PrivateRoute>
            }
          />
          <Route
            path="/clients/:id"
            element={
              <PrivateRoute roles={['it', 'receptionist']}>
                <ClientDetails />
              </PrivateRoute>
            }
          />

          {/* IT */}
          <Route
            path="/it/dashboard"
            element={
              <PrivateRoute roles={['it']}>
                <ErrorBoundary>
                  <ITDashboard />
                </ErrorBoundary>
              </PrivateRoute>
            }
          />
          <Route
            path="/it/users"
            element={
              <PrivateRoute roles={['it']}>
                <ErrorBoundary>
                  <ManageUsers />
                </ErrorBoundary>
              </PrivateRoute>
            }
          />
          <Route
            path="/it/appointments"
            element={
              <PrivateRoute roles={['it']}>
                <ErrorBoundary>
                  <ManageAppointments />
                </ErrorBoundary>
              </PrivateRoute>
            }
          />
          <Route
            path="/it/activity"
            element={
              <PrivateRoute roles={['it']}>
                <ErrorBoundary>
                  <ActivityMonitor />
                </ErrorBoundary>
              </PrivateRoute>
            }
          />

          {/* Old URLs redirect */}
          <Route path="/it/doctors" element={<Navigate to="/doctors" replace />} />
          <Route path="/it/schedule" element={<Navigate to="/doctors" replace />} />
          <Route path="/reception/schedule" element={<Navigate to="/doctors" replace />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{ className: 'rounded-2xl shadow-glass' }}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;