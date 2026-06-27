import React from 'react';
import { Link } from 'react-router-dom';
import { FaGear, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlineShieldCheck, HiChevronRight } from 'react-icons/hi2';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

export const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="relative bg-[#0b101e] text-white overflow-hidden pt-20 pb-8 border-t border-white/5">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Brand Identity */}
          <div className="space-y-6 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-blue-600 p-2.5 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center">
                <FaGear className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight uppercase">
                Allo <span className="text-blue-500">Mécanique</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm font-medium leading-relaxed pr-4">
              {language === 'fr'
                ? 'La plateforme n°1 au Maghreb qui connecte les automobilistes avec des experts qualifiés en quelques minutes.'
                : 'المنصة الأولى في المغرب العربي التي تربط السائقين بخبراء مؤهلين في دقائق معدودة.'}
            </p>
            <div className="flex gap-4 pt-2">
              {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-500">
              {language === 'fr' ? 'Plateforme' : 'المنصة'}
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { label: t('footer.about') || 'À propos', to: '/' },
                { label: 'Trouver un garage', to: '/' },
                { label: 'Devenir expert', to: '/register/mechanic' },
                { label: 'Aide & Support', to: '/' }
              ].map((link, i) => (
                <Link key={i} to={link.to} className="text-gray-300 text-sm font-medium hover:text-blue-400 transition-colors flex items-center gap-2 group w-fit">
                  <HiChevronRight className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Governance Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-500">
              {language === 'fr' ? 'Légal' : 'قانوني'}
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { label: t('footer.terms') || 'Conditions d\'utilisation', to: '/' },
                { label: t('footer.privacy') || 'Confidentialité', to: '/' },
                { label: 'Cookies Policy', to: '/' },
                { label: 'Assurance & Garantie', to: '/' }
              ].map((link, i) => (
                <Link key={i} to={link.to} className="text-gray-300 text-sm font-medium hover:text-blue-400 transition-colors flex items-center gap-2 group w-fit">
                  <HiChevronRight className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Direct Contact Card */}
          <div className="space-y-6 lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-500">
              {language === 'fr' ? 'Nous contacter' : 'اتصل بنا'}
            </h3>
            <div className="p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/10 space-y-5 hover:border-blue-500/30 hover:bg-white/[0.03] transition-all duration-300 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                  <HiOutlineEnvelope className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-sm font-medium text-white truncate hover:text-blue-400 transition-colors cursor-pointer">
                    {t('footer.email') || 'contact@allomecanique.ma'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                  <HiOutlinePhone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">WhatsApp</p>
                  <p className="text-sm font-medium text-white truncate hover:text-green-400 transition-colors cursor-pointer">
                    {t('footer.phone') || '+212 5XX-XXXXXX'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                  <HiOutlineMapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Siège Social</p>
                  <p className="text-sm font-medium text-white truncate">
                    {language === 'fr' ? 'Casablanca, Maroc' : 'الدار البيضاء، المغرب'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Bottom Bar */}
        <div className="relative pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          {/* Overlapping Center Icon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0b101e] px-4">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.15)] cursor-pointer"
            >
              <FaGear className="w-4 h-4" />
            </motion.div>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
            <HiOutlineShieldCheck className="w-4 h-4" />
            <span>© {new Date().getFullYear()} Allo Mécanique Networks. Tous droits réservés.</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              Statut Système: <span className="text-blue-500">Opérationnel</span>
            </span>
            <span className="w-px h-3 bg-white/10"></span>
            <span>Support: 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
