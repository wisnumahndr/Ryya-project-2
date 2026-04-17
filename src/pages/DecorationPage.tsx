import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, collection, query, onSnapshot, orderBy } from '../lib/firebase';
import { Service } from '../types';
import { DECORATION_CATEGORIES, WHATSAPP_LINK } from '../constants';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Sparkles, ArrowRight } from 'lucide-react';

export const DecorationPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(collection(db, 'services'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
      setServices(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-brand-cream/20">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark">Katalog Dekorasi</h1>
            <p className="text-gray-500 max-w-2xl mx-auto italic">
              Transformasikan acaramu menjadi momen tak terlupakan dengan sentuhan dekorasi eksklusif.
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === 'All' ? 'bg-brand-gold text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-brand-pink/20 shadow-sm'}`}
            >
              Semua
            </button>
            {DECORATION_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-brand-gold text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-brand-pink/20 shadow-sm'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-gold"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, idx) => (
                  <motion.div
                    layout
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group h-[550px] rounded-[3rem] overflow-hidden shadow-xl"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent flex flex-col justify-end p-10">
                      <p className="text-brand-pink text-xs font-bold uppercase tracking-[4px] mb-2">{service.category}</p>
                      <h3 className="text-3xl font-serif font-bold text-white mb-4">{service.title}</h3>
                      <p className="text-gray-200 text-sm mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3 leading-relaxed">
                        {service.description}
                      </p>
                      <button 
                        onClick={() => window.open(WHATSAPP_LINK(`Halo Ryya Project! Saya tertarik dengan dekorasi ${service.title} (${service.category})`), '_blank')}
                        className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs hover:text-brand-gold transition-colors"
                      >
                        Konsultasi Sekarang <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredServices.length === 0 && (
                <div className="col-span-full py-24 text-center text-gray-400">
                  Belum ada dekorasi untuk kategori ini.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
