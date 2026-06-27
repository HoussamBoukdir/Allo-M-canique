import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FaGear, FaUser, FaCheck, FaBriefcase } from 'react-icons/fa6';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineLockClosed, HiOutlineMapPin, HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi2';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../services/api';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationPicker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

export const Register = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { type } = useParams();
  const isMechanic = type === 'mechanic';
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    city: '', address: '', specialty: '', experience: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [position, setPosition] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      data.append('role', isMechanic ? 'mechanic' : 'client');
      if (profilePicture) {
        data.append('profile_picture', profilePicture);
      }
      if (isMechanic && position) {
        data.append('latitude', position.lat);
        data.append('longitude', position.lng);
      }

      await api.post('/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 overflow-hidden border border-gray-100"
        >
          <div className="grid lg:grid-cols-5">
            {/* Sidebar info */}
            <div className="lg:col-span-2 bg-blue-600 p-12 text-white relative overflow-hidden" style={{ backgroundColor: '#2563eb' }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-12">
                <Link to="/" className="inline-block p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                  <FaGear className="w-8 h-8 text-white" />
                </Link>

                <div className="space-y-6">
                  <h2 className="text-4xl font-black leading-tight">
                    {isMechanic ? "Boostez votre activité" : "Trouvez votre expert"}
                  </h2>
                  <p className="text-blue-100 text-lg font-medium leading-relaxed">
                    {isMechanic
                      ? "Rejoignez la plus grande communauté de mécaniciens du Maghreb et recevez des clients chaque jour."
                      : "Inscrivez-vous en 30 secondes et accédez aux meilleurs garages près de chez vous."}
                  </p>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm">Étape {i} de l'inscription</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-3 p-12 md:p-16">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-gray-900">
                  {isMechanic ? "Compte Expert" : "Compte Client"}
                </h2>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <Link to="/register/client" className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${!isMechanic ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}>CLIENT</Link>
                  <Link to="/register/mechanic" className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${isMechanic ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}>MECHANIC</Link>
                </div>
              </div>

              {isMechanic && (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-10 flex gap-4 items-center">
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex-shrink-0 flex items-center justify-center text-white">!</div>
                  <p className="text-amber-900 text-sm font-bold leading-snug">{t('register.subscriptionNote')}</p>
                </div>
              )}

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
                <div className="field-group">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">{t('register.name')}</label>
                  <div className="relative">
                    <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <input name="name" type="text" required onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none" placeholder="Jean Dupont" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="field-group">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">{t('register.email')}</label>
                    <div className="relative">
                      <HiOutlineEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                      <input name="email" type="email" required onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none" placeholder="Email" />
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">{t('register.phone')}</label>
                    <div className="relative">
                      <HiOutlinePhone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                      <input name="phone" type="tel" required onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none" placeholder="Téléphone" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="field-group">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">{t('register.password')}</label>
                    <div className="relative">
                      <HiOutlineLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                      <input name="password" type="password" required onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none" placeholder="••••••••" />
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">{t('register.confirmPassword')}</label>
                    <div className="relative">
                      <HiOutlineLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                      <input name="confirmPassword" type="password" required onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none" placeholder="••••••••" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="field-group">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">{t('register.city')}</label>
                    <div className="relative">
                      <HiOutlineMapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                      <input name="city" type="text" required onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none" placeholder="Ville" />
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">{t('register.address')}</label>
                    <div className="relative">
                      <HiOutlineMapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                      <input name="address" type="text" required onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none" placeholder="Adresse" />
                    </div>
                  </div>
                </div>

                {isMechanic && (
                  <>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="field-group">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">CIN (Carte d'Identité)</label>
                        <div className="relative">
                          <FaCheck className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                          <input name="cin" type="text" required onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none" placeholder="Ex: AB123456" />
                        </div>
                      </div>
                      <div className="field-group">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Photo de profil / Garage (Appareil)</label>
                        <div className="relative">
                          <FaBriefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                          <input name="profile_picture" type="file" accept="image/*" onChange={handleFileChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none file:hidden" />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="field-group">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">{t('register.specialty')}</label>
                        <div className="relative">
                          <FaBriefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                          <select name="specialty" required onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none appearance-none">
                            <option value="">Sélectionner...</option>
                            <option value="general">Mécanique générale</option>
                            <option value="engine">Moteur</option>
                            <option value="electrical">Électrique</option>
                            <option value="bodywork">Carrosserie</option>
                          </select>
                        </div>
                      </div>
                      <div className="field-group">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">{t('register.experience')}</label>
                        <div className="relative">
                          <HiOutlineCalendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                          <input name="experience" type="number" required min="0" onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold outline-none" placeholder="Années" />
                        </div>
                      </div>
                    </div>

                    <div className="field-group">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Localisation sur la carte (Optionnel)</label>
                      <div className="rounded-2xl overflow-hidden border-2 border-gray-100 shadow-inner h-64 sticky z-10 w-full relative">
                        <MapContainer 
                          center={[33.5731, -7.5898]} 
                          zoom={12} 
                          style={{ height: '100%', width: '100%' }}
                          scrollWheelZoom={false}
                        >
                          <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          <LocationPicker position={position} setPosition={setPosition} />
                        </MapContainer>
                      </div>
                      <p className="text-xs font-bold text-gray-400 mt-2 ml-2">Cliquez sur la carte pour définir votre position exacte.</p>
                    </div>
                  </>
                )}

                <button type="submit"
                  className="w-full flex items-center justify-between bg-blue-600 text-white p-2 pl-8 rounded-3xl hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-600/20"
                  style={{ backgroundColor: '#2563eb', border: 'none', cursor: 'pointer' }}>
                  <span className="text-xl font-black tracking-tight">{t('register.button')}</span>
                  <div className="bg-white/20 p-4 rounded-2xl">
                    <HiOutlineArrowRight className="w-6 h-6" />
                  </div>
                </button>
              </form>

              <div className="mt-12 text-center">
                <p className="text-gray-500 font-bold">
                  {t('register.haveAccount')}{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold underline decoration-2 underline-offset-4">
                    {t('register.login')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>);
};
