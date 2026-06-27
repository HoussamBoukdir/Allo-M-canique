import React, { useState } from 'react';
import { HiOutlineMapPin, HiOutlinePlus } from 'react-icons/hi2';
import { FaUser, FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import { MdOutlineMessage, MdOutlineAccessTime } from 'react-icons/md';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { Section, Card, Badge, Grid } from '../components/ui/Core';
import { DashboardHeader } from '../components/ui/Dashboard';

export const ClientDashboard = () => {
  const { t } = useLanguage();
  const userName = localStorage.getItem('userName') || 'Client';
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestDescription, setRequestDescription] = useState('');
  const [requestLocation, setRequestLocation] = useState('');

  const [requests, setRequests] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const clientId = localStorage.getItem('userId');
      const [reqRes, mechRes] = await Promise.all([
        api.get(`/client/requests/${clientId}`),
        api.get('/client/mechanics')
      ]);
      setRequests(reqRes.data);
      setMechanics(mechRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      const clientId = localStorage.getItem('userId');
      await api.post('/client/requests', {
        client_id: clientId,
        description: requestDescription,
        location: requestLocation
      });
      setRequestDescription('');
      setRequestLocation('');
      setShowRequestForm(false);
      fetchData(); // Refresh list
    } catch (err) {
      alert('Erreur lors de la création de la demande');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 pt-24 pb-20">
      <Section noPadding>
        <DashboardHeader
          roleLabel="Espace Client"
          title={t('client.welcome')}
          userName={userName}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Action Promo Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative p-12 overflow-hidden text-white rounded-[3.5rem] shadow-2xl shadow-blue-900/20"
              style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)' }}
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
              <div className="relative z-10 max-w-xl space-y-8">
                <h2 className="text-4xl font-black leading-tight">{t('client.requestMechanic')}</h2>
                <p className="text-blue-100 font-medium text-xl leading-relaxed">
                  Besoin d’un diagnostic rapide ? Envoyez votre demande et recevez des devis en quelques minutes.
                </p>
                <button
                  onClick={() => setShowRequestForm(!showRequestForm)}
                  className="flex items-center gap-4 bg-white text-blue-600 px-10 py-5 rounded-[2rem] hover:scale-105 active:scale-95 transition-all font-black text-xl shadow-2xl shadow-blue-900/40 border-none cursor-pointer"
                >
                  <HiOutlinePlus className="w-6 h-6" />
                  <span>Nouvelle demande</span>
                </button>
              </div>
            </motion.div>

            {/* Request Form */}
            <AnimatePresence>
              {showRequestForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <Card p="p-10 md:p-16">
                    <h3 className="text-3xl font-black text-gray-900 mb-10">Créer une intervention</h3>
                    <form onSubmit={handleSubmitRequest} className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Type de problème</label>
                        <textarea
                          value={requestDescription}
                          onChange={(e) => setRequestDescription(e.target.value)}
                          required
                          rows={4}
                          className="w-full px-8 py-6 bg-gray-50 border-none rounded-[2rem] focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none text-gray-900 shadow-inner"
                          placeholder="Décrivez votre panne..."
                        />
                      </div>
                      <div className="space-y-10">
                        <div className="space-y-4">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Votre Localisation</label>
                          <div className="relative">
                            <HiOutlineMapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300" />
                            <input
                              type="text"
                              value={requestLocation}
                              onChange={(e) => setRequestLocation(e.target.value)}
                              required
                              className="w-full pl-16 pr-8 py-6 bg-gray-50 border-none rounded-[2rem] focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none text-gray-900 shadow-inner"
                            />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button type="submit" className="flex-1 bg-blue-600 text-white py-5 rounded-[1.8rem] font-black hover:bg-black transition-all border-none cursor-pointer">
                            Envoyer la demande
                          </button>
                          <button onClick={() => setShowRequestForm(false)} className="px-8 py-5 bg-gray-100 text-gray-400 font-bold rounded-[1.8rem] border-none cursor-pointer">
                            Fermer
                          </button>
                        </div>
                      </div>
                    </form>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* My Requests List */}
            <div className="space-y-8">
              <div className="flex justify-between items-center px-4">
                <h3 className="text-3xl font-black text-gray-900">{t('client.myRequests')}</h3>
                <button className="text-blue-600 font-black text-sm uppercase tracking-widest hover:underline border-none bg-transparent cursor-pointer">Tout voir</button>
              </div>

              <div className="space-y-6">
                {requests.length === 0 ? (
                  <Card padding="p-8">
                    <p className="text-center font-bold text-gray-400">Aucune demande pour le moment.</p>
                  </Card>
                ) : requests.map((request, i) => (
                  <Card key={request.id} className="group overflow-hidden" padding="p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-4">
                          <Badge variant={request.status === 'completed' ? 'green' : request.status === 'accepted' ? 'blue' : 'amber'}>
                            {t(`client.status.${request.status}`)}
                          </Badge>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {new Date(request.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">{request.description}</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-3 text-sm text-gray-500 font-bold bg-gray-50 px-5 py-3 rounded-2xl">
                            <HiOutlineMapPin className="w-5 h-5 text-blue-500" />
                            <span>{request.location}</span>
                          </div>
                        </div>
                      </div>

                      {request.mechanic_name && (
                        <div className="flex items-center gap-5 p-6 rounded-[2rem] bg-gray-50 border border-gray-100 min-w-[240px]">
                          <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center font-black text-blue-600 shadow-sm">
                            <FaUser className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Expert Assigné</p>
                            <p className="font-black text-gray-900">{request.mechanic_name}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-12">
            {/* Experts Nearby Card */}
            <Card p="p-10">
              <h3 className="text-2xl font-black text-gray-900 mb-10">{t('client.nearbyMechanics')}</h3>
              <div className="space-y-8">
                {mechanics.length === 0 ? (
                  <p className="text-center text-sm font-bold text-gray-400">Aucun expert en ligne.</p>
                ) : mechanics.slice(0, 5).map(mech => (
                  <div key={mech.id} className="flex gap-4 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      {mech.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{mech.name}</h4>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{mech.specialty || 'Garage'}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all border-none cursor-pointer shadow-xl shadow-gray-900/20">
                Explorer la carte
              </button>
            </Card>

            {/* Profile CTA */}
            <Card p="p-10" background="linear-gradient(135deg, #2563eb 0%, #1e40af 100%)" className="text-white border-none">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center backdrop-blur-md">
                  <FaUser className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black leading-tight">{userName}</p>
                  <Badge variant="purple" className="mt-2 bg-white/20 border-white/20 text-white">Client Gold</Badge>
                </div>
              </div>
              <button className="w-full py-5 bg-white text-blue-600 rounded-[1.8rem] font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all border-none cursor-pointer shadow-2xl shadow-blue-900/30">
                Gérer mon compte
              </button>
            </Card>
          </aside>
        </div>
      </Section>
    </main>
  );
};
