import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, collection, query, onSnapshot, orderBy } from '../lib/firebase';
import { Product } from '../types';
import { BOUQUET_CATEGORIES, WHATSAPP_LINK } from '../constants';
import { formatIDR } from '../lib/utils';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark">Katalog Bouquet</h1>
            <p className="text-gray-500 max-w-2xl mx-auto italic">
              Pilihan buket terbaik untuk merayakan setiap momen berhargamu.
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-brand-dark text-white' : 'bg-gray-50 text-gray-500 hover:bg-brand-pink/20'}`}
              >
                {cat === 'All' ? 'Semua' : cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-rose"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <div className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-50 h-full flex flex-col">
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-gray-50">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          referrerPolicy="no-referrer"
                        />
                        {product.label && (
                          <div className="absolute top-4 right-4 bg-brand-rose text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter">
                            {product.label}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-2 px-2 text-center">
                        <p className="text-[10px] text-brand-maroon font-bold uppercase tracking-widest">{product.category}</p>
                        <h3 className="text-xl font-serif font-bold text-brand-dark">{product.name}</h3>
                        <p className="text-brand-rose font-bold">{formatIDR(product.priceStart)}</p>
                      </div>

                      <button 
                        onClick={() => window.open(WHATSAPP_LINK(`Halo Ryya Project, saya tertarik dengan ${product.name} (${product.category})`), '_blank')}
                        className="w-full mt-6 h-12 rounded-2xl bg-brand-cream text-brand-dark text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-brand-rose group-hover:text-white transition-all shadow-sm"
                      >
                        <ShoppingBag size={14} /> Order via WA
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-24 text-center text-gray-400">
                  Belum ada produk untuk kategori ini.
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
