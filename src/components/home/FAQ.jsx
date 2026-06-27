import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Section } from '../ui/Core';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-none py-8">
            <button
                className="flex justify-between items-center w-full text-left focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}
            >
                <span className={`text-xl font-black transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'}`}>
                    {question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                    {isOpen ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="mt-6 text-lg text-gray-500 font-medium leading-relaxed max-w-4xl">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const FAQ = () => {
    const { t } = useLanguage();

    const items = [
        { question: t('home.faq.1.q'), answer: t('home.faq.1.a') },
        { question: t('home.faq.2.q'), answer: t('home.faq.2.a') },
        { question: t('home.faq.3.q'), answer: t('home.faq.3.a') }
    ];

    return (
        <Section background="#fff">
            <div className="max-w-4xl mx-auto">
                <div className="mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Questions Fréquentes</h2>
                    <p className="text-xl text-gray-500 font-medium">Tout ce que vous devez savoir sur Allo Mécanique.</p>
                </div>
                <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-50 shadow-2xl">
                    {items.map((item, i) => (
                        <FAQItem key={i} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </Section>
    );
};
