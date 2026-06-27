import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGear } from 'react-icons/fa6';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { useLanguage } from '../../contexts/LanguageContext';
import { Section } from '../ui/Core';

export const MechanicsCTA = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <Section background="linear-gradient(to right, #111827, #1e3a8a)" className="text-white overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-blue-400 text-xs font-black uppercase tracking-widest">
                        Join our network
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                        Vous êtes mécanicien ? <br />
                        <span className="text-blue-500">Boostez votre activité.</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-medium max-w-xl leading-relaxed">
                        Rejoignez la plus grande communauté de mécaniciens au Maroc et recevez des demandes de clients directement sur votre téléphone.
                    </p>
                    <div className="flex flex-wrap gap-6 text-sm font-black uppercase tracking-widest">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">✓</div>
                            <span>Abonnement Flexible</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">✓</div>
                            <span>Zéro Commission</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/register/mechanic')}
                        className="group flex items-center gap-4 bg-white text-gray-900 px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-blue-600 hover:text-white transition-all shadow-2xl shadow-blue-900/40 border-none cursor-pointer"
                    >
                        <span>S'inscrire comme expert</span>
                        <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>

                <div className="flex-1 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative z-10 p-8 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <FaGear className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black">Console Expert</h4>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Tableau de bord</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex justify-between items-center p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-800" />
                                        <div className="w-32 h-2 bg-gray-800 rounded-full" />
                                    </div>
                                    <div className="w-20 h-8 bg-blue-600/20 rounded-lg" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};
