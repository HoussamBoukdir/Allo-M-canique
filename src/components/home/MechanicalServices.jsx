import React from 'react';
import { FaGear, FaDiscCheck, FaWind, FaBolt, FaGaugeHigh, FaDroplet } from 'react-icons/fa6';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { Section, Grid, Card } from '../ui/Core';
import { motion } from 'framer-motion';

export const MechanicalServices = () => {
    const services = [
        {
            icon: FaDroplet,
            title: 'Vidange & Filtres',
            desc: 'Entretien complet pour prolonger la durée de vie de votre moteur.',
            price: 'À partir de 450 MAD',
            color: 'blue'
        },
        {
            icon: FaDiscCheck,
            title: 'Système de Freinage',
            desc: 'Vérification et remplacement des plaquettes et disques de frein.',
            price: 'À partir de 300 MAD',
            color: 'red'
        },
        {
            icon: FaBolt,
            title: 'Diagnostic Électrique',
            desc: 'Analyse complète des systèmes électroniques de votre véhicule.',
            price: 'À partir de 200 MAD',
            color: 'amber'
        },
        {
            icon: FaWind,
            title: 'Climatisation',
            desc: 'Recharge et nettoyage du circuit pour un air pur et frais.',
            price: 'À partir de 400 MAD',
            color: 'cyan'
        },
        {
            icon: FaGaugeHigh,
            title: 'Pneumatiques',
            desc: 'Changement, équilibrage et parallélisme de vos pneus.',
            price: 'À partir de 150 MAD',
            color: 'emerald'
        },
        {
            icon: FaGear,
            title: 'Moteur & Boite',
            desc: 'Réparation majeure et entretien de la transmission.',
            price: 'Sur devis',
            color: 'purple'
        }
    ];

    return (
        <Section id="services" className="bg-gray-50/50">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-2xl space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                        Nos Services <br /> <span className="text-blue-600">Mécaniques</span>
                    </h2>
                    <p className="text-xl text-gray-500 font-medium">
                        Une large gamme de services professionnels pour tous vos besoins automobiles, directement chez vous ou en atelier.
                    </p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all cursor-pointer">
                    Voir tous les services
                    <HiOutlineArrowRight className="w-4 h-4" />
                </button>
            </div>

            <Grid cols={3} gap="gap-8">
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="group h-full flex flex-col hover:border-blue-200 transition-all duration-500">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 bg-${service.color}-50`}>
                                <service.icon className={`w-7 h-7 text-${service.color}-600`} />
                            </div>
                            
                            <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                {service.title}
                            </h3>
                            
                            <p className="text-gray-500 font-medium mb-8 flex-grow">
                                {service.desc}
                            </p>
                            
                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                <span className="font-black text-sm text-gray-900">{service.price}</span>
                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <HiOutlineArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </Grid>
        </Section>
    );
};
