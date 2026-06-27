import React, { useState } from 'react';
import { FaUsers, FaGear, FaArrowTrendUp, FaCircleCheck, FaCircleXmark, FaTriangleExclamation, FaEye, FaTrashCan, FaToggleOn, FaToggleOff, FaArrowUpRightFromSquare, FaChartLine, FaFilter, FaDownload } from 'react-icons/fa6';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { MdAttachMoney } from 'react-icons/md';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { Section, Card, Badge, Grid } from '../components/ui/Core';
import { DashboardHeader, StatTile } from '../components/ui/Dashboard';

export const AdminDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('mechanics');
  const [searchQuery, setSearchQuery] = useState('');

  const [stats, setStats] = useState({ totalClients: 0, totalMechanics: 0, activeRequests: 0, monthlyRevenue: 0 });
  const [users, setUsers] = useState([]);
  const [pendingMechanics, setPendingMechanics] = useState([]);
  const [requests, setRequests] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, pendingRes, usersRes, requestsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/pending-mechanics'),
        api.get('/admin/users'),
        api.get('/admin/requests') // Need to add this to backend
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setPendingMechanics(pendingRes.data);
      setRequests(requestsRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.post(`/admin/approve-mechanic/${id}`);
      fetchData();
    } catch (err) {
      alert("Erreur lors de l'approbation");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.post(`/admin/reject-mechanic/${id}`);
      fetchData();
    } catch (err) {
      alert("Erreur lors du rejet");
    }
  };

  const clients = users.filter(u => u.role === 'client');
  const mechanics = users.filter(u => u.role === 'mechanic');

  return (
    <main className="min-h-screen bg-gray-50/50 pt-24 pb-20">
      <Section noPadding>
        {/* Admin Header */}
        <DashboardHeader
          roleLabel="Système de Gouvernance"
          title={t('admin.welcome')}
          userName="Admin"
          icon={FaChartLine}
        />

        {/* Stats Grid */}
        <Grid cols={4} gap="gap-8" className="mb-16">
          <StatTile label={t('admin.totalClients')} value={stats.totalClients} icon={FaUsers} color="blue" trend="5.4" />
          <StatTile label={t('admin.totalMechanics')} value={stats.totalMechanics} icon={FaGear} color="green" trend="3.2" />
          <StatTile label={t('admin.activeRequests')} value={stats.activeRequests} icon={FaArrowTrendUp} color="amber" trend="12" />
          <StatTile label={t('admin.monthlyRevenue')} value={`${stats.monthlyRevenue.toLocaleString()} MAD`} icon={MdAttachMoney} color="purple" trend="8.2" />
        </Grid>

        {/* Main Governance Area */}
        <Card p="p-10" className="bg-white">
          {/* Tab Navigation Redesign */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
              {[
                { id: 'pending', label: 'En attente' },
                { id: 'users', label: 'Utilisateurs' },
                { id: 'requests', label: 'Demandes' },
                { id: 'payments', label: t('admin.payments') }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-400 hover:text-gray-600'}`}
                  style={{ border: 'none', cursor: 'pointer', background: activeTab === tab.id ? 'white' : 'transparent' }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative group">
                <HiOutlineMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none w-64 md:w-80 shadow-inner"
                />
              </div>
              <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-blue-600 transition-all border-none cursor-pointer">
                <FaFilter className="w-6 h-6" />
              </button>
              <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-blue-600 transition-all border-none font-black text-xs uppercase tracking-widest cursor-pointer">
                <FaDownload className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Dynamic Content Tables */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-left border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    {activeTab === 'pending' && (
                      <><th className="px-6 pb-2">Expert</th><th className="px-6 pb-2">Spécialité</th><th className="px-6 pb-2">CIN</th><th className="px-6 pb-2 text-center">Photo</th><th className="px-6 pb-2 text-right">Actions</th></>
                    )}
                    {activeTab === 'users' && (
                      <><th className="px-6 pb-2">Utilisateur</th><th className="px-6 pb-2">Role</th><th className="px-6 pb-2">Email</th><th className="px-6 pb-2">Statut</th><th className="px-6 pb-2 text-right">Actions</th></>
                    )}
                    {activeTab === 'requests' && (
                      <><th className="px-6 pb-2">Client</th><th className="px-6 pb-2">Mécanicien</th><th className="px-6 pb-2">Description</th><th className="px-6 pb-2 text-right">Statut</th></>
                    )}
                    {activeTab === 'payments' && (
                      <><th className="px-6 pb-2">Mécanicien</th><th className="px-6 pb-2">Montant</th><th className="px-6 pb-2">Date</th><th className="px-6 pb-2 text-right">Statut</th></>
                    )}
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  {/* Pending Mechanics */}
                  {activeTab === 'pending' && pendingMechanics.map((mex) => (
                    <tr key={mex.id} className="group transition-all hover:translate-x-1">
                      <td className="px-6 py-6 bg-gray-50/50 rounded-l-[1.5rem] border-y border-l border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all">
                        <span className="font-black text-gray-900">{mex.name}</span>
                      </td>
                      <td className="px-6 py-6 bg-gray-50/50 border-y border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all font-black text-xs text-blue-600">{mex.specialty}</td>
                      <td className="px-6 py-6 bg-gray-50/50 border-y border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all font-bold text-gray-400">{mex.cin}</td>
                      <td className="px-6 py-6 bg-gray-50/50 border-y border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all text-center">
                        {mex.profile_picture ? <img src={mex.profile_picture} className="w-10 h-10 rounded-xl object-cover" /> : 'N/A'}
                      </td>
                      <td className="px-6 py-6 bg-gray-50/50 rounded-r-[1.5rem] border-y border-r border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all text-right">
                        <div className="flex justify-end gap-2">
                           <button onClick={() => handleApprove(mex.id)} className="p-3 bg-green-500 text-white rounded-xl border-none cursor-pointer"><FaCircleCheck className="w-4 h-4" /></button>
                           <button onClick={() => handleReject(mex.id)} className="p-3 bg-red-500 text-white rounded-xl border-none cursor-pointer"><FaCircleXmark className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* All Users */}
                  {activeTab === 'users' && users.map((user) => (
                    <tr key={user.id} className="group transition-all hover:translate-x-1">
                      <td className="px-6 py-6 bg-gray-50/50 rounded-l-[1.5rem] border-y border-l border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all">
                         <span className="font-black text-gray-900">{user.name}</span>
                      </td>
                      <td className="px-6 py-6 bg-gray-50/50 border-y border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all font-black text-[10px] uppercase tracking-widest">{user.role}</td>
                      <td className="px-6 py-6 bg-gray-50/50 border-y border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all text-gray-400 font-bold">{user.email}</td>
                      <td className="px-6 py-6 bg-gray-50/50 border-y border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all text-gray-400">
                         <Badge variant={user.status === 'active' ? 'green' : 'red'}>{user.status}</Badge>
                      </td>
                      <td className="px-6 py-6 bg-gray-50/50 rounded-r-[1.5rem] border-y border-r border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all text-right">
                        <button className="p-3 rounded-xl bg-white text-gray-400 hover:text-red-600 border-none cursor-pointer"><FaTrashCan className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}

                  {/* Requests */}
                  {activeTab === 'requests' && requests.map((req) => (
                    <tr key={req.id} className="group transition-all hover:translate-x-1">
                      <td className="px-6 py-6 bg-gray-50/50 rounded-l-[1.5rem] border-y border-l border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all font-black text-gray-900">{req.client?.name}</td>
                      <td className="px-6 py-6 bg-gray-50/50 border-y border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all font-black text-blue-600">{req.mechanic?.name || 'Pas encore assigné'}</td>
                      <td className="px-6 py-6 bg-gray-50/50 border-y border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all text-gray-400 font-bold italic truncate max-w-[200px]">{req.description}</td>
                      <td className="px-6 py-6 bg-gray-50/50 rounded-r-[1.5rem] border-y border-r border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all text-right">
                         <Badge variant={req.status === 'completed' ? 'green' : 'amber'}>{req.status}</Badge>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'payments' && payments.map((pay) => (
                    <tr key={pay.id} className="group transition-all hover:translate-x-1">
                      <td className="px-6 py-6 bg-gray-50/50 rounded-l-[1.5rem] border-y border-l border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all font-black text-gray-900 text-lg uppercase tracking-tight">{pay.mechanic_name}</td>
                      <td className="px-6 py-6 bg-gray-50/50 border-y border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all font-black text-blue-600">{pay.amount} MAD</td>
                      <td className="px-6 py-6 bg-gray-50/50 border-y border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all font-bold text-gray-400">
                        {new Date(pay.start_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-6 bg-gray-50/50 border-y border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all font-black text-[10px] uppercase tracking-widest text-gray-500">{pay.method}</td>
                      <td className="px-6 py-6 bg-gray-50/50 rounded-r-[1.5rem] border-y border-r border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all text-right">
                        <div className="flex items-center justify-end gap-2 text-green-600 text-[10px] font-black uppercase tracking-widest">
                          <FaCircleCheck className="w-4 h-4" />
                          <span>Validé</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </AnimatePresence>
        </Card>
      </Section>
    </main>
  );
};
