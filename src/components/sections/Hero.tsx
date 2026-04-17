import { motion } from 'motion/react';
import { Button } from '../Button';
import { WHATSAPP_LINK, HERO_IMAGE } from '../../constants';
import { Flower } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 right-[-10%] w-[50%] h-[50%] bg-brand-pink/30 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-10 left-[-5%] w-[40%] h-[40%] bg-brand-maroon/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 text-brand-maroon text-lg font-serif italic mb-2">
            <span>Elegance in Every Petal</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif leading-[1.1] text-brand-dark font-normal">
            Buket Cantik & <br />
            Dekorasi Aesthetic
          </h1>
          
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Custom desain sesuai keinginan, hasil rapi & premium untuk setiap momen spesial Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              variant="gold"
              asMotion
              onClick={() => window.open(WHATSAPP_LINK('Halo Ryya Project! Saya mau tanya-tanya order buket/dekorasi.'), '_blank')}
            >
              Order via WhatsApp Sekarang
            </Button>
            <Button
              size="lg"
              variant="outline"
              asMotion
              onClick={() => navigate('/katalog')}
            >
              Lihat Katalog
            </Button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
            <div className="text-center lg:text-left">
              <p className="text-2xl font-serif font-bold text-brand-dark">500+</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Happy Customer</p>
            </div>
            <div className="w-px h-8 bg-brand-pink" />
            <div className="text-center lg:text-left">
              <p className="text-2xl font-serif font-bold text-brand-dark">100%</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Custom Request</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-t-[200px] overflow-hidden shadow-2xl z-10 border-8 border-white bg-brand-pink">
            <img
              src={HERO_IMAGE}
              alt="Buket Cantik"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-4 md:p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-brand-pink rounded-full flex items-center justify-center text-brand-maroon">
              <Flower />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-tighter">Mulai dari</p>
              <p className="text-lg font-serif font-bold text-brand-dark">Rp 50.000</p>
            </div>
          </motion.div>
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-brand-rose rounded-full -z-10 opacity-30" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-maroon rounded-[4rem] rotate-12 -z-10 opacity-10" />
        </motion.div>
      </div>
    </section>
  );
};
