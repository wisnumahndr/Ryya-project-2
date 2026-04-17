import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS, WHATSAPP_LINK } from '../../constants';
import { formatIDR } from '../../lib/utils';
import { Button } from '../Button';
import { db, collection, query, onSnapshot, orderBy } from '../../lib/firebase';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLive, setIsLive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(`Catalog snapshot: ${snapshot.empty ? 'empty' : 'data found'}`);
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(data);
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    }, (error) => {
      console.error("Catalog Firestore error:", error);
      setIsLive(false); // Fallback to mock on error
    });
    return () => unsubscribe();
  }, []);

  const displayProducts = (isLive ? products : PRODUCTS).slice(0, 8);

  return (
    <section id="katalog" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">Katalog Buket Unggulan</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Temukan berbagai pilihan buket untuk setiap momen. Mulai dari yang klasik hingga yang unik sesuai request kamu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
            >
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-gray-50 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {product.label && (
                  <div className="absolute top-2 right-2 bg-brand-rose text-white px-2 py-1 rounded-sm text-[8px] font-bold uppercase tracking-widest">
                    {product.label}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-serif text-brand-dark">{product.name}</h3>
                <p className="text-brand-rose text-sm font-semibold">{product.priceStart ? `Mulai ${formatIDR(product.priceStart)}` : 'Custom Budget'}</p>
                <button 
                  onClick={() => window.open(WHATSAPP_LINK(`Halo Ryya Project, saya tertarik dengan ${product.name}`), '_blank')}
                  className="text-[10px] text-gray-400 uppercase tracking-widest hover:text-brand-rose transition-colors pt-2"
                >
                  Detail via WA
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/katalog')}
          >
            Lihat Semua Produk
          </Button>
        </div>
      </div>
    </section>
  );
};
