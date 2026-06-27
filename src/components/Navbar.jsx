import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGear, FaUser } from 'react-icons/fa6';
import { HiBars3, HiXMark, HiOutlineArrowRightOnRectangle, HiChevronRight } from 'react-icons/hi2';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const userRole = typeof localStorage !== 'undefined' ? localStorage.getItem('userRole') : null;
  const isLoggedIn = !!userRole;

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.clear();
    navigate('/login');
    window.location.reload(); // Force reload to clear state
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'client': return '/client-dashboard';
      case 'mechanic': return '/mechanic-dashboard';
      case 'admin': return '/admin-dashboard';
      default: return '/';
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="p-2.5 rounded-xl shadow-lg shadow-blue-500/20"
                style={{ backgroundColor: '#2563eb' }}
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <FaGear className="w-6 h-6 text-white" />
              </motion.div>
              <span className={`text-2xl font-black tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-blue-900'
                }`}>
                {language === 'fr' ? 'Allo Mécanique' : 'ألو ميكانيك'}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 mr-4">
                <Link to="/" className={`text-sm font-semibold transition-all hover:text-blue-600 ${location.pathname === '/' ? 'text-blue-600 after:content-[""] after:block after:h-0.5 after:bg-blue-600 after:w-full' : 'text-gray-700'
                  }`}>
                  {t('nav.home')}
                </Link>
                {isLoggedIn && (
                  <Link to={getDashboardLink()} className={`text-sm font-semibold transition-all hover:text-blue-600 ${location.pathname.includes('dashboard') ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                    {t('nav.dashboard')}
                  </Link>
                )}
              </div>

              {/* Auth Actions */}
              <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-red-600 transition-colors"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
                    {t('nav.logout')}
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors">
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/register/client"
                      className="px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
                      style={{ backgroundColor: '#2563eb' }}
                    >
                      {t('nav.register')}
                    </Link>
                  </>
                )}

                {/* Language Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-full ml-2">
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'fr' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                      }`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLanguage('ar')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'ar' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                      }`}
                  >
                    AR
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl bg-gray-100 text-gray-900 shadow-inner"
            >
              <HiBars3 className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[120] shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-black text-blue-600">MENU</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-gray-100 text-gray-500"
                >
                  <HiXMark className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <MobileNavLink to="/" label={t('nav.home')} onClick={() => setMobileMenuOpen(false)} />
                {isLoggedIn && (
                  <MobileNavLink to={getDashboardLink()} label={t('nav.dashboard')} onClick={() => setMobileMenuOpen(false)} />
                )}

                <div className="h-px bg-gray-100 my-8" />

                {!isLoggedIn ? (
                  <div className="space-y-4">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center py-4 rounded-2xl bg-gray-50 text-gray-900 font-bold"
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/register/client"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30"
                      style={{ backgroundColor: '#2563eb' }}
                    >
                      {t('nav.register')}
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full text-left py-4 px-6 rounded-2xl bg-red-50 text-red-600 font-bold flex justify-between items-center"
                    style={{ border: 'none' }}
                  >
                    <span>{t('nav.logout')}</span>
                    <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                  </button>
                )}

                <div className="flex bg-gray-100 p-1 rounded-2xl mt-8">
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${language === 'fr' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500'
                      }`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => setLanguage('ar')}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${language === 'ar' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500'
                      }`}
                  >
                    العربية
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const MobileNavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center justify-between text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
  >
    <span>{label}</span>
    <HiChevronRight className="w-6 h-6 text-gray-300" />
  </Link>
);
