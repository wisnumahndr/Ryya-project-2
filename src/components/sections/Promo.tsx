import { motion } from 'motion/react';
import { Button } from '../Button';
import { Gift, Zap } from 'lucide-react';
import { WHATSAPP_LINK } from '../../constants';

export const Promo = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-maroon -z-10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8 bg-white/5 backdrop-blur-md p-12 md:p-20 rounded-[4rem] border border-white/20 shadow-2xl">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="inline-flex items-center gap-2 bg-brand-rose text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm"
        >
          <Zap size={18} fill="currentColor" />
          Limited Time Offer
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
          Promo Bundling Wisuda <br />
          Diskon s/d 20%!
        </h2>
        
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
          Dapatkan harga khusus untuk paket Buket + Dekorasi Mini untuk perayaan kelulusanmu. Hanya bulan ini!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            size="lg"
            variant="gold"
            asMotion
            onClick={() => window.open(WHATSAPP_LINK('Halo Ryya Project! Saya mau klaim Promo Bundling Wisuda.'), '_blank')}
          >
            Klaim Promo Sekarang
          </Button>
          <p className="text-white/60 text-xs flex items-center justify-center gap-2">
            <Gift size={16} />
            *S&K Berlaku
          </p>
        </div>
      </div>
    </section>
  );
};
