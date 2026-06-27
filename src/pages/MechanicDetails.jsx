import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaGear, FaStar, FaPhone, FaAward, FaCircleCheck } from 'react-icons/fa6';
import { HiOutlineMapPin, HiOutlineEnvelope, HiOutlineClock, HiOutlineArrowLeft, HiOutlineShieldCheck, HiOutlineMap, HiOutlineCalendar } from 'react-icons/hi2';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../services/api';
import { Section, Card, Badge } from '../components/ui/Core';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const MechanicDetails = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [mechanic, setMechanic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMechanic = async () => {
      try {
        const response = await api.get(`/mechanics/${id}`);
        setMechanic(response.data);
      } catch (err) {
        console.error('Error fetching mechanic details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMechanic();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaGear className="w-12 h-12 text-blue-600" />
        </motion.div>
      </div>
    );
  }

  if (!mechanic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-black text-gray-900">Mécanicien non trouvé</h2>
        <Link to="/" className="text-blue-600 font-bold hover:underline">Retourner à l'accueil</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero / Header Section */}
      <div className="bg-white border-b border-gray-100 pt-10 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-bold mb-8">
            <HiOutlineArrowLeft className="w-4 h-4" />
            Retour aux experts
          </Link>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left Image & Stats */}
            <div className="lg:col-span-1 space-y-6">
              <div className="relative group">
                <img 
                  src={mechanic.profile_picture || 'https://images.unsplash.com/photo-1613214149174-e1a24769d19f?auto=format&fit=crop&q=80&w=800'} 
                  alt={mechanic.name} 
                  className="w-full aspect-square object-cover rounded-[3rem] shadow-2xl shadow-blue-900/10"
                />
                <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Disponible
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center p-6 bg-blue-50/50 border-blue-100">
                  <div className="text-2xl font-black text-blue-600 mb-1">4.9/5</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-blue-400">Note Globale</div>
                </Card>
                <Card className="text-center p-6 bg-purple-50/50 border-purple-100">
                  <div className="text-2xl font-black text-purple-600 mb-1">{mechanic.experience || 5}+</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-purple-400">Ans d'expérience</div>
                </Card>
              </div>
            </div>

            {/* Middle Profile Info */}
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="blue" className="px-4 py-1.5">{mechanic.specialty || 'Mécanicien Généraliste'}</Badge>
                  <div className="flex items-center gap-1 text-amber-400">
                    <FaStar className="w-5 h-5 fill-current" />
                    <FaStar className="w-5 h-5 fill-current" />
                    <FaStar className="w-5 h-5 fill-current" />
                    <FaStar className="w-5 h-5 fill-current" />
                    <FaStar className="w-5 h-5" />
                    <span className="text-gray-400 font-bold ml-2 text-sm">(124 avis)</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-none">
                  {mechanic.name}
                </h1>
                <div className="flex items-center gap-4 text-gray-500 text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <HiOutlineMapPin className="w-5 h-5 text-blue-600" />
                    {mechanic.city || 'Casablanca'}
                  </div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                  <div className="flex items-center gap-2">
                    <FaAward className="w-5 h-5 text-blue-600" />
                    Certifié AlloMécanique
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                    <HiOutlineClock className="w-6 h-6 text-blue-600" />
                    Horaires de service
                  </h3>
                  <div className="space-y-3">
                    {['Lundi - Vendredi', 'Samedi', 'Dimanche'].map((day, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 font-medium h-fit">
                        <span className="text-gray-500">{day}</span>
                        <span className="text-gray-900 font-bold">{i < 2 ? '08:00 - 19:00' : 'Urgences uniquement'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                    <HiOutlineShieldCheck className="w-6 h-6 text-blue-600" />
                    Services & Garanties
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Pièces d\'origine garanties',
                      'Diagnostic complet numérique',
                      'Déplacement à domicile',
                      'Paiement sécurisé via App'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <button 
                  className="flex-1 bg-blue-600 text-white rounded-[1.5rem] py-5 font-black text-lg transition-all hover:bg-black hover:shadow-2xl hover:shadow-blue-900/20 active:scale-95 border-none cursor-pointer flex items-center justify-center gap-3"
                  onClick={() => window.location.href = `/login?redirect=mechanic/${id}`}
                >
                  <HiOutlineCalendar className="w-6 h-6" />
                  Prendre rendez-vous
                </button>
                <div className="flex gap-4">
                    <button className="p-5 bg-white border border-gray-200 text-gray-500 rounded-[1.5rem] hover:text-blue-600 transition-all cursor-pointer">
                        <FaPhone className="w-6 h-6" />
                    </button>
                    <button className="p-5 bg-white border border-gray-200 text-gray-500 rounded-[1.5rem] hover:text-blue-600 transition-all cursor-pointer">
                        <HiOutlineMap className="w-6 h-6" />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About & Reviews Section */}
      <Section>
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">À propos de {mechanic.name}</h2>
              <div className="prose prose-lg text-gray-500 font-medium leading-relaxed max-w-none">
                <p>
                  Fort de son expérience de plus de {mechanic.experience || 5} ans dans l'automobile, {mechanic.name} est spécialisé dans 
                  {mechanic.specialty ? ` le ${mechanic.specialty}` : ' la maintenance préventive et curative des véhicules légers'}. 
                  Il a rejoint AlloMécanique pour offrir un service de proximité de haute qualité et transparent à tous ses clients de {mechanic.city || 'sa région'}.
                </p>
                <p>
                  Que ce soit pour une simple vidange ou une intervention plus complexe sur le moteur, il utilise des outils de diagnostic modernes 
                  et s'engage à vous expliquer chaque étape de la réparation.
                </p>
              </div>
            </div>

            {/* Map Section */}
            {mechanic.latitude && mechanic.longitude && (
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Localisation</h2>
                <div className="h-[400px] w-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
                  <MapContainer 
                    center={[Number(mechanic.latitude), Number(mechanic.longitude)]} 
                    zoom={15} 
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[Number(mechanic.latitude), Number(mechanic.longitude)]}>
                      <Popup>
                        <div className="p-2">
                          <div className="font-black text-gray-900">{mechanic.name}</div>
                          <div className="text-xs text-blue-600 font-bold">{mechanic.city}</div>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Avis Clients</h2>
                    <span className="text-blue-600 font-black text-xs uppercase tracking-widest cursor-pointer">Voir tout</span>
                </div>
                
                <div className="space-y-6">
                    {[1, 2].map((_, i) => (
                        <Card key={i} className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-100" />
                                    <div>
                                        <div className="font-black text-gray-900">Client Anonyme</div>
                                        <div className="text-xs font-bold text-gray-400">Il y a 2 jours</div>
                                    </div>
                                </div>
                                <div className="flex gap-1 text-amber-400">
                                    <FaStar className="w-4 h-4 fill-current" />
                                    <FaStar className="w-4 h-4 fill-current" />
                                    <FaStar className="w-4 h-4 fill-current" />
                                    <FaStar className="w-4 h-4 fill-current" />
                                    <FaStar className="w-4 h-4 fill-current" />
                                </div>
                            </div>
                            <p className="text-gray-600 font-medium italic">"Excellent mécanicien, très ponctuel et efficace. Le prix était conforme au devis annoncé. Je recommande !"</p>
                        </Card>
                    ))}
                </div>
            </div>
          </div>

          <div className="lg:col-span-1">
              <Card className="sticky top-32 bg-blue-600 p-10 overflow-hidden relative">
                  <div className="absolute -right-10 -bottom-10 text-9xl font-black text-white/5 opacity-20">GO</div>
                  <h3 className="text-3xl font-black text-white mb-6 relative z-10">Besoin d'aide immédiate ?</h3>
                  <p className="text-blue-100 font-medium mb-10 relative z-10 leading-relaxed">
                      Si vous faites face à une urgence, {mechanic.name} peut se déplacer rapidement.
                  </p>
                  <button className="w-full bg-white text-blue-600 py-5 rounded-2xl font-black text-lg hover:bg-black hover:text-white transition-all shadow-xl shadow-blue-900/20 border-none cursor-pointer relative z-10">
                      Demander une urgence
                  </button>
              </Card>
          </div>
        </div>
      </Section>
    </main>
  );
};
