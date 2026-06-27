import React, { useState } from 'react';
import { FaGear, FaArrowTrendUp, FaCircleCheck, FaCircleXmark, FaTriangleExclamation, FaPhone, FaShieldHalved, FaChartLine } from 'react-icons/fa6';
import { HiOutlineMapPin, HiOutlineClock, HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi2';
import { MdAttachMoney, MdOutlineCreditCard } from 'react-icons/md';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { Section, Card, Badge, Grid } from '../components/ui/Core';
import { DashboardHeader, StatTile } from '../components/ui/Dashboard';

export const MechanicDashboard = () => {
  const { t } = useLanguage();
  const userName = localStorage.getItem('userName') || 'Mechanic';
  const [isAvailable, setIsAvailable] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({ name: userName, phone: '', city: '', address: '', specialty: '', experience: '' });


  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState({ status: 'active', nextPayment: '2026-02-15', amount: 200, daysRemaining: 31 });

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const mechanicId = localStorage.getItem('userId');
      const [reqRes, subRes, authRes] = await Promise.all([
        api.get('/mechanic/requests/available'),
        api.get(`/mechanic/subscription/${mechanicId}`),
        api.get('/auth/me')
      ]);
      setRequests(reqRes.data);
      if (authRes.data) {
        setProfileData({ ...authRes.data });
      }
      if (subRes.data) {
        setSubscription({
          ...subRes.data,
          nextPayment: new Date(subRes.data.end_date).toLocaleDateString(),
          daysRemaining: Math.ceil((new Date(subRes.data.end_date) - new Date()) / (1000 * 60 * 60 * 24))
        });
      }
    } catch (err) {
      console.error('Error fetching mechanic data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const mechanicId = localStorage.getItem('userId');
      await api.put(`/mechanic/requests/${requestId}/accept`, { mechanic_id: mechanicId });
      fetchData();
    } catch (err) {
      alert('Erreur lors de l’acceptation');
    }
  };

  const handleCompleteRequest = async (requestId) => {
    try {
      await api.put(`/mechanic/requests/${requestId}/complete`);
      fetchData();
    } catch (err) {
      alert('Erreur lors de la clôture');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/mechanic/profile', profileData);
      localStorage.setItem('userName', profileData.name);
      setShowProfileModal(false);
      alert('Profil mis à jour avec succès');
      window.location.reload();
    } catch (err) {
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  const earnings = { thisMonth: 4500, totalRequests: requests.length, completedRequests: 18 };

  return (
    <main className="min-h-screen bg-gray-50/50 pt-24 pb-20">
      <Section noPadding>
        {/* Header Redesign */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <DashboardHeader
            roleLabel="Console Expert"
            title={t('mechanic.welcome')}
            userName={userName}
            icon={FaChartLine}
          />

          <div className="flex items-center gap-6 bg-white p-3 pr-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 px-4 border-r border-gray-100">
              <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Statut</span>
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className={`w-14 h-8 rounded-full relative transition-colors border-none p-1 cursor-pointer ${isAvailable ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isAvailable ? 'text-green-600' : 'text-gray-400'}`}>
                {isAvailable ? 'En Ligne' : 'Hors Ligne'}
              </span>
            </div>
          </div>
        </div>

        {/* Urgent Warning */}
        {subscription.daysRemaining <= 7 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-8 mb-12 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-xl shadow-amber-200/50">
              <FaTriangleExclamation className="w-8 h-8" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-2xl font-black text-amber-900 leading-tight">{t('mechanic.subscriptionWarning')}</p>
              <p className="text-amber-700 font-bold mt-1">Renouvelez votre abonnement pour garder accès à vos clients.</p>
            </div>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-amber-900 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all border-none cursor-pointer shadow-xl shadow-amber-900/20"
            >
              Payer Maintenant
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* High-Level Metrics */}
            <Grid cols={3} gap="gap-8">
              <StatTile label={t('mechanic.earnings')} value={`${earnings.thisMonth} MAD`} sub={t('mechanic.thisMonth')} icon={MdAttachMoney} color="green" trend="15" />
              <StatTile label="Demandes Reçues" value={earnings.totalRequests} sub="Clients potentiels" icon={FaArrowTrendUp} color="blue" trend="8" />
              <StatTile label="Taux de Succès" value="92%" sub="Satisfaction client" icon={FaCircleCheck} color="purple" />
            </Grid>

            {/* Live Service Requests */}
            <div className="space-y-8">
              <div className="flex justify-between items-center px-4">
                <h3 className="text-3xl font-black text-gray-900">{t('mechanic.requests')}</h3>
                <Badge variant="blue" className="animate-pulse">Live Feed</Badge>
              </div>

              <div className="space-y-6">
                {requests.length === 0 ? (
                  <Card p="p-8">
                    <p className="text-center font-bold text-gray-400">Aucune demande disponible pour le moment.</p>
                  </Card>
                ) : requests.map((request, i) => (
                  <Card key={request.id} p="p-8" className="group">
                    <div className="flex flex-col md:flex-row justify-between gap-10">
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center font-black border border-gray-100 uppercase tracking-widest">
                            {request.client_name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <h4 className="font-black text-xl text-gray-900">{request.client_name}</h4>
                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
                             <HiOutlineClock className="w-3.5 h-3.5" />
                              <span>{new Date(request.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-2xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">{request.description}</p>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-600">
                             <HiOutlineMapPin className="w-5 h-5 text-blue-500" />
                            <span className="truncate">{request.location}</span>
                          </div>
                          <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-600">
                             <FaPhone className="w-5 h-5 text-green-500" />
                            <span>{request.phone || '+212 6XX-XXXXXX'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center gap-4 md:min-w-[220px]">
                        {request.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleAcceptRequest(request.id)}
                              className="w-full bg-green-600 text-white py-5 rounded-[1.8rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-green-600/30 hover:bg-black transition-all border-none cursor-pointer"
                            >
                              {t('mechanic.accept')}
                            </button>
                            <button className="w-full bg-gray-100 text-gray-400 py-5 rounded-[1.8rem] font-black text-sm uppercase tracking-widest hover:text-red-500 transition-all border-none cursor-pointer">
                              {t('mechanic.reject')}
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleCompleteRequest(request.id)}
                            className="w-full bg-blue-600 text-white py-6 rounded-[1.8rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-600/40 hover:bg-black transition-all border-none cursor-pointer flex items-center justify-center gap-3"
                          >
                            <span>{t('mechanic.complete')}</span>
                             <FaCircleCheck className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-12">
            {/* Premium Subscription Card */}
            <Card p="p-10" background="linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)" className="text-white border-none relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-10">
                <div className="flex justify-between items-center">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center">
                     <FaShieldHalved className="w-8 h-8 text-white" />
                  </div>
                  <Badge variant="purple" className="bg-white/20 border-white/20 text-white">Mécanicien Pro</Badge>
                </div>

                <div>
                  <p className="text-blue-200 font-black uppercase tracking-widest text-[10px] mb-2">Prochain paiement</p>
                  <p className="text-3xl font-black tabular-nums">{subscription.nextPayment}</p>
                </div>

                <div className="py-8 border-y border-white/10">
                  <p className="text-4xl font-black">{subscription.amount} MAD<span className="text-sm font-medium opacity-60 ml-2">/mois</span></p>
                </div>

                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full bg-white text-blue-600 py-6 rounded-[2rem] font-black text-lg shadow-2xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95 transition-all border-none cursor-pointer"
                >
                  Gérer l'abonnement
                </button>
              </div>
            </Card>

            {/* Profile Overview Card */}
            <Card p="p-12" className="text-center">
              <div className="w-24 h-24 rounded-[2.5rem] bg-gray-50 flex items-center justify-center text-blue-600 text-3xl font-black mx-auto mb-8 border border-gray-100 shadow-inner">
                {userName.charAt(0)}
              </div>
              <h4 className="text-2xl font-black text-gray-900">{userName}</h4>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2 border-b border-gray-50 pb-8 mb-8">Mécanicien Certifié</p>

              <div className="flex gap-4">
                <div className="flex-1 p-5 bg-gray-50 rounded-3xl border border-gray-50">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Dernier Avis</p>
                  <p className="text-xl font-black text-gray-900">4.9/5</p>
                </div>
                <div className="flex-1 p-5 bg-gray-50 rounded-3xl border border-gray-50">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Ancienneté</p>
                  <p className="text-xl font-black text-gray-900">5 ans</p>
                </div>
              </div>

              <button 
                onClick={() => setShowProfileModal(true)}
                className="w-full mt-8 py-5 bg-gray-900 text-white rounded-[1.8rem] font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all border-none cursor-pointer">
                Éditer le Profil
              </button>
            </Card>
          </aside>
        </div>
      </Section>

      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 w-full max-w-2xl shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-8 right-8 p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors border-none cursor-pointer"
              >
                <FaCircleXmark className="w-5 h-5" />
              </button>

              <div className="mb-10">
                <h3 className="text-3xl font-black text-gray-900 mb-2">Modifier le profil</h3>
                <p className="text-gray-500 font-bold">Mettez à jour vos informations publiques.</p>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Nom complet</label>
                    <input type="text" value={profileData.name || ''} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold focus:ring-4 focus:ring-blue-100 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Téléphone</label>
                    <input type="tel" value={profileData.phone || ''} onChange={e => setProfileData({...profileData, phone: e.target.value})} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold focus:ring-4 focus:ring-blue-100 transition-all" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Ville</label>
                    <input type="text" value={profileData.city || ''} onChange={e => setProfileData({...profileData, city: e.target.value})} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold focus:ring-4 focus:ring-blue-100 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Adresse</label>
                    <input type="text" value={profileData.address || ''} onChange={e => setProfileData({...profileData, address: e.target.value})} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold focus:ring-4 focus:ring-blue-100 transition-all" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Spécialité</label>
                    <select value={profileData.specialty || ''} onChange={e => setProfileData({...profileData, specialty: e.target.value})} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold focus:ring-4 focus:ring-blue-100 transition-all appearance-none cursor-pointer">
                      <option value="general">Mécanique générale</option>
                      <option value="engine">Moteur</option>
                      <option value="electrical">Électrique</option>
                      <option value="bodywork">Carrosserie</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Expérience (années)</label>
                    <input type="number" min="0" value={profileData.experience || ''} onChange={e => setProfileData({...profileData, experience: e.target.value})} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold focus:ring-4 focus:ring-blue-100 transition-all" />
                  </div>
                </div>

                <button type="submit" className="w-full h-16 mt-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all border-none cursor-pointer">
                  Enregistrer les modifications
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
