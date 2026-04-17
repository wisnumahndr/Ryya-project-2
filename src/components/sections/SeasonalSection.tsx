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
  const [eventProducts, setEventProducts] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'events'), where('isActive', '==', true));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (!snapshot.empty) {
        const event = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as EventData;
        setActiveEvent(event);

        if (event.productIds && event.productIds.length > 0) {
          const productPromises = event.productIds.map(async (id: string) => {
            const d = await getDoc(doc(db, 'products', id));
            return d.exists() ? { id: d.id, ...d.data() } : null;
          });
          const prods = await Promise.all(productPromises);
          setEventProducts(prods.filter(p => p !== null));
        }
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

        {eventProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventProducts.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-50">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-brand-dark">{product.name}</h4>
                      <p className="text-xs text-gray-400 uppercase tracking-widest">{product.category}</p>
                    </div>
                    <p className="text-brand-gold font-bold">{formatIDR(product.priceStart)}</p>
                  </div>
                  <button 
                    onClick={() => window.open(WHATSAPP_LINK(`Halo! Saya mau order ${product.name} untuk event ${activeEvent.title}`), '_blank')}
                    className="w-full h-12 rounded-xl border border-gray-100 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                  >
                    <ShoppingBag size={16} /> Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
