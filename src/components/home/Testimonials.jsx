import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa6';
import { Section, Grid, Card } from '../ui/Core';
import { motion } from 'framer-motion';

export const Testimonials = () => {
    const reviews = [
        {
            name: 'Omar El Fassi',
            role: 'Propriétaire de BMW X5',
            content: 'Service exceptionnel ! Mon mécanicien est arrivé en 20 minutes pour une batterie à plat. Très professionnel et courtois.',
            rating: 5,
            image: 'https://i.pravatar.cc/150?u=omar'
        },
        {
            name: 'Laila Mansouri',
            role: 'Citadine active',
            content: 'Allomcanique a changé ma façon de voir l\'entretien auto. Plus besoin de perdre une demi-journée au garage, ils viennent à moi.',
            rating: 5,
            image: 'https://i.pravatar.cc/150?u=laila'
        },
        {
            name: 'Mehdi Bennani',
            role: 'Conducteur régulier',
            content: 'Le diagnostic était précis et le prix transparent. Pas de mauvaises surprises, je recommande vivement cette plateforme.',
            rating: 4,
            image: 'https://i.pravatar.cc/150?u=mehdi'
        }
    ];

    return (
        <Section id="testimonials">
            <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-black text-[10px] uppercase tracking-widest">
                    <FaQuoteLeft className="w-3 h-3" />
                    Témoignages Clients
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                    Ils nous font <span className="text-blue-600">confiance</span> au quotidien
                </h2>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                    Découvrez les expériences authentiques de nos utilisateurs satisfaits à travers tout le pays.
                </p>
            </div>

            <Grid cols={3} gap="gap-10">
                {reviews.map((review, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.15 }}
                        viewport={{ once: true }}
                    >
                        <Card className="relative pt-12">
                            <div className="absolute -top-10 left-10">
                                <div className="relative">
                                    <img 
                                        src={review.image} 
                                        alt={review.name}
                                        className="w-20 h-20 rounded-[2rem] border-4 border-white shadow-xl object-cover"
                                    />
                                    <div className="absolute -right-2 -bottom-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                                        <FaQuoteLeft className="w-4 h-4 fill-current text-white/50" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar 
                                        key={i} 
                                        className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-200'}`} 
                                    />
                                ))}
                            </div>

                            <p className="text-gray-600 font-medium italic mb-10 leading-relaxed text-lg">
                                "{review.content}"
                            </p>

                            <div className="pt-8 border-t border-gray-50">
                                <h4 className="font-black text-gray-900 text-xl tracking-tight">{review.name}</h4>
                                <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest mt-1">{review.role}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </Grid>
        </Section>
    );
};
