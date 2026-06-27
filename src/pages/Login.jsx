import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGear, FaShieldHalved } from 'react-icons/fa6';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineArrowRight } from 'react-icons/hi2';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

export const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('client');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userId', user.id);

      // Force a small delay to ensure localStorage is set before navigation
      setTimeout(() => {
        switch (user.role) {
          case 'client': navigate('/client-dashboard'); break;
          case 'mechanic': navigate('/mechanic-dashboard'); break;
          case 'admin': navigate('/admin-dashboard'); break;
          default: navigate('/'); break;
        }
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 skew-x-12 translate-x-32 z-0 hidden lg:block" />

      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-center relative z-10 py-20">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side: Branding/Value Prop */}
          <motion.div
            className="hidden lg:block space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-4">
              <h1 className="text-6xl font-black text-gray-900 leading-[1.1]">
                Bon retour <br /> parmi nous.
              </h1>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Accédez à votre compte pour gérer vos demandes, vos rendez-vous et vos paiements en toute sécurité.
              </p>
            </div>

            <div className="space-y-4 pt-6">
              {[
                "Plus de 5000 mécaniciens certifiés",
                "Support client disponible 24/7",
                "Paiement 100% sécurisé"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700 font-bold">
                  <FaShieldHalved className="w-6 h-6 text-blue-600" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Auth Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 p-10 md:p-14 border border-gray-50">
              <div className="flex justify-between items-center mb-10">
                <Link to="/" className="p-3 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
                  <FaGear className="w-6 h-6 text-white" />
                </Link>
                <span className="text-sm font-black text-gray-300 uppercase tracking-widest">Login</span>
              </div>

              <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
                {t('login.title')}
              </h2>

              {/* User Type Tab */}
              <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-10">
                {['client', 'mechanic'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setUserType(type)}
                    className={`flex-1 py-3 rounded-xl text-xs font-black transition-all uppercase tracking-wider ${userType === type
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-400 hover:text-gray-600'}`}
                    style={{ background: userType === type ? 'white' : 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    {t(`login.as${type.charAt(0).toUpperCase() + type.slice(1)}`)}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 font-bold text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">
                    {t('login.email')}
                  </label>
                  <div className="relative group">
                    <HiOutlineEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-lg font-bold"
                      placeholder="nom@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">
                    {t('login.password')}
                  </label>
                  <div className="relative group">
                    <HiOutlineLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-lg font-bold"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-between bg-blue-600 text-white p-2 pl-8 rounded-[1.5rem] hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-600/20"
                  style={{ backgroundColor: '#2563eb', border: 'none', cursor: 'pointer' }}
                >
                  <span className="text-xl font-black tracking-tight">{t('login.button')}</span>
                  <div className="bg-white/20 p-4 rounded-2xl">
                    <HiOutlineArrowRight className="w-6 h-6" />
                  </div>
                </button>
              </form>

              <div className="mt-12 text-center">
                <p className="text-gray-500 font-bold">
                  {t('login.noAccount')}{' '}
                  <Link
                    to={userType === 'mechanic' ? '/register/mechanic' : '/register/client'}
                    className="text-blue-600 hover:text-blue-700 transition-colors underline decoration-2 underline-offset-4"
                  >
                    {t('login.register')}
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>);
};
