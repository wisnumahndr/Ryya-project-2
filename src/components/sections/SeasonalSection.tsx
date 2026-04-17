import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, collection, query, where, onSnapshot, doc, getDoc } from '../../lib/firebase';
import { Button } from '../Button';
import { WHATSAPP_LINK } from '../../constants';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatIDR } from '../../lib/utils';

interface EventData {
  id: string;
  title: string;
  description?: string;
  bannerImage: string;
  themeColor?: string;
  productIds?: string[];
  isActive: boolean;
}

export const SeasonalSection = () => {
  const [activeEvent, setActiveEvent] = useState<EventData | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'events'), where('isActive', '==', true));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (!snapshot.empty) {
        const event = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as EventData;
        setActiveEvent(event);
      } else {
        setActiveEvent(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!activeEvent) return null;

  return (
    <section 
      id="special"
      className="py-24 px-6 relative overflow-hidden" 
      style={{ backgroundColor: `${activeEvent.themeColor}10` || '#fdf2f8' }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 rounded-full blur-[100px] opacity-20" style={{ backgroundColor: activeEvent.themeColor || '#db2777' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 translate-y-1/2 -translate-x-1/2 rounded-full blur-[100px] opacity-20" style={{ backgroundColor: activeEvent.themeColor || '#db2777' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-sm border border-brand-pink/20">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeEvent.themeColor || '#db2777' }} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Limited Collection</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-dark leading-tight">
                {activeEvent.title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed font-serif italic">
                {activeEvent.description}
              </p>
            </div>

            <Button 
              size="lg" 
              className="px-10 h-16 rounded-full group bg-brand-dark text-white hover:bg-brand-gold transition-all"
              onClick={() => window.open(WHATSAPP_LINK(`Halo Ryya Project! Saya tertarik dengan koleksi ${activeEvent.title}`), '_blank')}
            >
              Order Koleksi Spesial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 border-8 border-white">
              <img 
                src={activeEvent.bannerImage} 
                alt={activeEvent.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
