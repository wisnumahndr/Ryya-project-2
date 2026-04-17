import { motion } from 'motion/react';
import { TESTIMONIALS } from '../../constants';
import { Star, Quote } from 'lucide-react';

export const Trust = () => {
  return (
    <section id="testimoni" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-[1.2]">
              Dipercaya Ratusan <br />
              Pelanggan Menjaga <br />
              Momen Berharga.
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-white rounded-3xl shadow-sm border border-brand-pink/20">
                <div className="w-12 h-12 bg-brand-pink rounded-2xl flex items-center justify-center text-brand-maroon shrink-0">
                  <Star fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark">Rating 4.9/5.0</h4>
                  <p className="text-sm text-gray-500">Dari 200+ review di Google Maps dan WhatsApp.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-white rounded-3xl shadow-sm border border-brand-pink/20">
                <div className="w-12 h-12 bg-brand-pink rounded-2xl flex items-center justify-center text-brand-maroon shrink-0">
                  <Quote fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark">Pengerjaan Cepat</h4>
                  <p className="text-sm text-gray-500">Bisa order dadakan (S&K berlaku) dengan hasil tetap rapi.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="space-y-6">
              {TESTIMONIALS.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-white p-6 rounded-3xl shadow-xl relative"
                  style={{
                    marginLeft: `${idx * 2}rem`
                  }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-brand-rose text-brand-rose" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4 leading-relaxed tracking-tight group-hover:text-brand-dark transition-colors">
                    "{testimonial.comment}"
                  </p>
                  <p className="font-bold text-brand-dark">{testimonial.name}</p>
                </motion.div>
              ))}
            </div>
            {/* Decors */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-brand-pink/50 rounded-full -z-10 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
