import React, { useState } from 'react';
import { Hero } from '../components/home/Hero';
import { Stats } from '../components/home/Stats';
import { Features } from '../components/home/Features';
import { MechanicsCTA } from '../components/home/MechanicsCTA';
import { FeaturedMechanics } from '../components/home/FeaturedMechanics';
import { Testimonials } from '../components/home/Testimonials';
import { FAQ } from '../components/home/FAQ';
import MechanicMap from '../components/home/MechanicMap';
import { useLanguage } from '../contexts/LanguageContext';

export const Home = () => {
  const { t } = useLanguage();
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchLocation);
    // Future implementation: Redirect to results or filter list
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <Hero
        onSearch={handleSearch}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
      />

      {/* Featured Mechanics Section */}
      <FeaturedMechanics />

      {/* Map Section */}
      <MechanicMap />

      {/* Stats Section */}
      <Stats />

      {/* Why Choose Us Section */}
      <Features />

      {/* Mechanics CTA Section */}
      <MechanicsCTA />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Bottom CTA */}
      <section className="py-32 text-center bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-black text-gray-900 mb-8 tracking-tight">Prêt à reprendre la route ?</h2>
          <p className="text-xl text-gray-500 font-medium mb-12">Rejoignez des milliers d'automobilistes qui nous font confiance chaque jour.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-blue-600 text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-black transition-all shadow-2xl shadow-blue-900/20 border-none cursor-pointer">
              Trouver un mécanicien
            </button>
            <button className="bg-white text-gray-900 px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-gray-50 transition-all border border-gray-200 cursor-pointer">
              En savoir plus
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
