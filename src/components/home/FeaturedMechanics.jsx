import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGear, FaStar, FaUserCheck } from 'react-icons/fa6';
import { HiOutlineMapPin, HiOutlineShieldCheck, HiOutlineArrowRight } from 'react-icons/hi2';
import { Section, Grid, Card, Badge } from '../ui/Core';
import { motion } from 'framer-motion';
import api from '../../services/api';

export const FeaturedMechanics = () => {
    const [mechanics, setMechanics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMechanics = async () => {
            try {
                const response = await api.get('/mechanics');
                setMechanics(response.data.slice(0, 6)); // Display top 6
            } catch (err) {
                console.error('Error fetching mechanics:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMechanics();
    }, []);

    if (loading) {
        return (
            <Section className="py-20 flex justify-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </Section>
        );
    }

    return (
        <Section id="mechanics" className="bg-gray-50/50">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-3xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-black text-[10px] uppercase tracking-widest">
                        <FaUserCheck className="w-3 h-3" />
                        Experts Vérifiés
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                        Nos meilleurs <span className="text-blue-600">Mécaniciens</span> <br /> à proximité
                    </h2>
                    <p className="text-xl text-gray-500 font-medium">
                        Découvrez une sélection de professionnels qualifiés, prêts à intervenir sur votre véhicule avec le meilleur équipement.
                    </p>
                </div>
                <Link 
                    to="/search" 
                    className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
                >
                    Voir tous les experts
                    <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <Grid cols={3} gap="gap-10">
                {mechanics.map((mex, i) => (
                    <motion.div
                        key={mex.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Link to={`/mechanic/${mex.id}`} className="group block h-full no-underline">
                            <Card className="h-full overflow-hidden p-0 border border-gray-100 group-hover:border-blue-200 group-hover:shadow-2xl group-hover:shadow-blue-900/10 transition-all duration-500">
                                {/* Mechanic Image Header */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img 
                                        src={mex.profile_picture || 'https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?auto=format&fit=crop&q=80&w=800'} 
                                        alt={mex.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <Badge variant="green" className="absolute top-6 right-6 shadow-xl">Actif</Badge>
                                </div>

                                {/* Content */}
                                <div className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">{mex.specialty || 'Mécanique Générale'}</span>
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <FaStar className="w-4 h-4 fill-current" />
                                                <span className="text-xs font-black text-gray-900">4.9</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {mex.name}
                                        </h3>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                                            <HiOutlineMapPin className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                                            {mex.city || 'Casablanca'}
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                                            <HiOutlineShieldCheck className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" />
                                            Certifié AlloMécanique
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <div className="text-sm font-black text-gray-400 uppercase tracking-widest">
                                            {mex.experience || 5}+ Ans d'Exp
                                        </div>
                                        <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                            Profil Complet
                                            <HiOutlineArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </Grid>
        </Section>
    );
};
