import { motion } from 'motion/react';
import { SERVICES } from '../../constants';
import { Button } from '../Button';
import { WHATSAPP_LINK } from '../../constants';

export const Services = () => {
  return (
    <section id="dekorasi" className="py-24 px-6 bg-brand-cream/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">Layanan Dekorasi Event</h2>
            <p className="text-gray-500 max-w-xl">
              Ubah momen spesialmu jadi tak terlupakan dengan dekorasi aesthetic dari kami. Dari lamaran hingga wedding.
            </p>
          </div>
          <Button
            variant="gold"
            onClick={() => window.open(WHATSAPP_LINK('Halo Ryya Project! Saya mau konsultasi dekorasi event.'), '_blank')}
          >
            Konsultasi Dekorasi
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group h-[500px] rounded-[2.5rem] overflow-hidden shadow-lg"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-200 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                  {service.description}
                </p>
                <button 
                  onClick={() => window.open(WHATSAPP_LINK(`Halo Ryya Project, saya tertarik tanya dekorasi ${service.title}`), '_blank')}
                  className="text-brand-pink text-sm font-semibold uppercase tracking-widest hover:underline text-left"
                >
                  Lihat Detail &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
