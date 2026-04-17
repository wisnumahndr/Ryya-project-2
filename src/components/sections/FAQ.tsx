import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../../constants';
import { LeadForm } from '../LeadForm';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 px-6 bg-brand-cream relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-maroon/10 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/30 text-brand-dark text-xs font-bold tracking-widest uppercase"
            >
              <Sparkles size={14} className="text-brand-rose" />
              Information Center
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark leading-tight">
              Sering <br /> <span className="text-brand-maroon italic">Ditanyakan</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-md leading-relaxed">
              Mungkin jawaban untuk keraguanmu ada di sini. Jika belum, jangan ragu untuk chat admin kami yang ramah!
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`group rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                  openIndex === idx 
                    ? 'bg-white shadow-xl ring-1 ring-brand-rose/20' 
                    : 'bg-white/50 hover:bg-white hover:shadow-md'
                }`}
              >
                <button
                  className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span className={`text-lg font-bold tracking-tight ${openIndex === idx ? 'text-brand-rose' : 'text-brand-dark group-hover:text-brand-maroon'}`}>
                    {item.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === idx ? 'bg-brand-rose text-white rotate-180' : 'bg-brand-pink/30 text-brand-maroon'
                  }`}>
                    {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="px-8 pb-8 text-gray-600 leading-relaxed border-t border-brand-pink/10 pt-6 italic font-serif text-lg">
                        "{item.answer}"
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-32"
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  );
};
