import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ClientDashboard } from './pages/ClientDashboard';
import { MechanicDashboard } from './pages/MechanicDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { MechanicDetails } from './pages/MechanicDetails';
import { AnimatePresence, motion } from 'framer-motion';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem('userRole');
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  if (userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Page Transition Wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register/:type" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/mechanic/:id" element={<PageTransition><MechanicDetails /></PageTransition>} />
        <Route path="/client-dashboard" element={
          <ProtectedRoute allowedRole="client">
            <PageTransition><ClientDashboard /></PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/mechanic-dashboard" element={
          <ProtectedRoute allowedRole="mechanic">
            <PageTransition><MechanicDashboard /></PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRole="admin">
            <PageTransition><AdminDashboard /></PageTransition>
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 pt-20">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
