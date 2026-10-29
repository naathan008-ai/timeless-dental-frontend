import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Team from './pages/Team'; // 👈 NEW IMPORT
import Dashboard from './pages/Dashboard';
// ... other imports ...

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, refetchOnWindowFocus: false, retry: 1 },
  },
});

function AppContent() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar />
      <main key={pathname} className="flex-grow container mx-auto px-4 py-6 animate-fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} /> {/* 👈 NEW ROUTE */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ... keep the rest of your routes ... */}
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" toastOptions={{ className: 'rounded-2xl shadow-glass' }} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;