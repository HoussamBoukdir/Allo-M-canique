import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMagnifyingGlass, HiOutlineMapPin } from 'react-icons/hi2';
import { useLanguage } from '../../contexts/LanguageContext';
import { Section } from '../ui/Core';
import HeroImage from '../../assets/hero-mechanic.png';

export const Hero = ({ onSearch, searchLocation, setSearchLocation }) => {
    const { t } = useLanguage();

    return (
        <Section
            noPadding
            className="overflow-hidden pt-40 pb-20 md:pt-56 md:pb-32"
            background="linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-xs font-black uppercase tracking-widest"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Reliable experts at your service
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
                        {t('home.hero.title')}
                    </h1>

                    <p className="text-xl text-blue-100 font-medium max-w-xl leading-relaxed">
                        Trouvez instantanément des mécaniciens certifiés et gagnez du temps sur vos réparations automobiles.
                    </p>

                    <motion.form
                        onSubmit={onSearch}
                        className="bg-white p-3 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row gap-3"
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="flex-1 flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-[1.8rem]">
                            <HiOutlineMapPin className="w-6 h-6 text-blue-600" />
                            <input
                                type="text"
                                placeholder={t('home.search.placeholder')}
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                className="bg-transparent border-none outline-none w-full font-bold text-gray-900"
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-10 py-5 rounded-[1.8rem] font-black text-lg hover:bg-black transition-all shadow-xl shadow-blue-900/20 active:scale-95 border-none cursor-pointer">
                            {t('home.search.button')}
                        </button>
                    </motion.form>
                </motion.div>

                <motion.div
                    className="relative hidden lg:block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Main Visual Placeholder or Generated Image */}
                    <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white/10">
                        <img src={HeroImage} alt="Repair" className="w-full h-[600px] object-cover" />
                    </div>

                    {/* Floating UI elements to add "premium" feel */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl z-20"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-black">4.9/5</div>
                            <div>
                                <p className="font-black text-gray-900 leading-none">Top Rated</p>
                                <p className="text-xs text-gray-400 font-bold mt-1">Certified Mechanics</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
};
