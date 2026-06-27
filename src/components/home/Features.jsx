import React from 'react';
import { HiOutlineClock, HiOutlineWallet, HiOutlineTrophy, HiOutlineShieldCheck, HiOutlineBolt, HiOutlineHeart } from 'react-icons/hi2';
import { useLanguage } from '../../contexts/LanguageContext';
import { Section, Grid, Card } from '../ui/Core';

export const Features = () => {
    const { t } = useLanguage();

    const features = [
        { icon: HiOutlineClock, title: t('home.features.1.title'), desc: t('home.features.1.desc'), color: 'text-blue-600', bg: 'bg-blue-50' },
        { icon: HiOutlineWallet, title: t('home.features.2.title'), desc: t('home.features.2.desc'), color: 'text-green-600', bg: 'bg-green-50' },
        { icon: HiOutlineTrophy, title: t('home.features.3.title'), desc: t('home.features.3.desc'), color: 'text-amber-600', bg: 'bg-amber-50' },
        { icon: HiOutlineShieldCheck, title: 'Sécurité Garantie', desc: 'Tous nos experts sont vérifiés et notés par la communauté.', color: 'text-purple-600', bg: 'bg-purple-50' },
        { icon: HiOutlineBolt, title: 'Service Rapide', desc: 'Réponse moyenne en moins de 15 minutes pour vos urgences.', color: 'text-red-600', bg: 'bg-red-50' },
        { icon: HiOutlineHeart, title: 'Support Humain', desc: 'Notre équipe vous accompagne à chaque étape de votre réparation.', color: 'text-pink-600', bg: 'bg-pink-50' },
    ];

    return (
        <Section id="features">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                    {t('home.features.title')}
                </h2>
                <p className="text-xl text-gray-500 font-medium">
                    Une expérience repensée pour votre sérénité au volant.
                </p>
            </div>

            <Grid cols={3} gap="gap-10">
                {features.map((f, i) => (
                    <Card key={i} className="group overflow-hidden relative">
                        {/* Decorative background number */}
                        <span className="absolute -right-4 -bottom-4 text-8xl font-black text-gray-50 opacity-[0.03] group-hover:opacity-10 transition-opacity">0{i + 1}</span>

                        <div className={`w-16 h-16 ${f.bg} rounded-[1.5rem] flex items-center justify-center mb-10 transition-transform group-hover:rotate-12`}>
                            <f.icon className={`w-8 h-8 ${f.color}`} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{f.title}</h3>
                        <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
                    </Card>
                ))}
            </Grid>
        </Section>
    );
};
