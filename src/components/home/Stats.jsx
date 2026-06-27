import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Section, Grid, Card } from '../ui/Core';

const CountUp = ({ value, suffix = '', duration = 2.5 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const springValue = useSpring(0, { duration: duration * 1000, bounce: 0 });
    const displayValue = useTransform(springValue, (current) => Math.round(current));

    useEffect(() => {
        if (isInView) springValue.set(value);
    }, [isInView, value, springValue]);

    return <motion.span ref={ref}>{displayValue}</motion.span>;
};

export const Stats = () => {
    const { t } = useLanguage();

    return (
        <Section background="#f8fafc" className="border-y border-gray-100">
            <Grid cols={4} gap="gap-10">
                {[
                    { label: 'Utilisateurs', value: 10, suffix: 'k+' },
                    { label: 'Mécaniciens', value: 500, suffix: '+' },
                    { label: 'Interventions', value: 25, suffix: 'k+' },
                    { label: 'Satisfaction', value: 99, suffix: '%' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center space-y-2"
                    >
                        <p className="text-5xl font-black text-blue-600 tracking-tighter">
                            <CountUp value={stat.value} />{stat.suffix}
                        </p>
                        <p className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                    </motion.div>
                ))}
            </Grid>
        </Section>
    );
};
