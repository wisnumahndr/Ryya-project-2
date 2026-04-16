import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './Button';
import { WHATSAPP_LINK } from '../constants';
import { MessageSquare, Calendar, User, Tag, ShieldCheck, Clock } from 'lucide-react';

const formSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  whatsapp: z.string().min(10, 'Nomor WA tidak valid'),
  pesanan: z.string().min(1, 'Pilih kategori pesanan'),
  tanggal: z.string().min(1, 'Pilih tanggal'),
});

type FormValues = z.infer<typeof formSchema>;

export const LeadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    const message = `Halo Ryya Project! 
Nama: ${data.nama}
WA: ${data.whatsapp}
Pesanan: ${data.pesanan}
Tanggal Kebutuhan: ${data.tanggal}

Saya ingin tanya lebih lanjut/order pesanan di atas. Terima kasih!`;
    
    window.open(WHATSAPP_LINK(message), '_blank');
  };

  return (
    <div className="relative group">
      {/* Decorative Blur */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold/20 to-brand-sage/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="relative space-y-6 bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-brand-pink/10"
      >
        <div className="space-y-2 border-b border-brand-pink/10 pb-6">
          <div className="flex items-center gap-2 text-brand-gold mb-1">
            <MessageSquare size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Pemesanan Online</span>
          </div>
          <h3 className="text-3xl font-serif text-brand-dark">Cek Slot & Order</h3>
          <p className="text-sm text-gray-500">Isi form di bawah untuk mulai berdiskusi dengan admin kami.</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-brand-sage font-bold flex items-center gap-2">
              <User size={12} /> Nama Lengkap
            </label>
            <input
              {...register('nama')}
              placeholder="Contoh: Rina Amalia"
              className="w-full px-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50/50 focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:border-brand-gold outline-none transition-all"
            />
            {errors.nama && <p className="text-red-500 text-[10px] font-medium">{errors.nama.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-brand-sage font-bold flex items-center gap-2">
              <MessageSquare size={12} /> Nomor WhatsApp
            </label>
            <input
              {...register('whatsapp')}
              placeholder="0812 3456 7890"
              className="w-full px-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50/50 focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:border-brand-gold outline-none transition-all"
            />
            {errors.whatsapp && <p className="text-red-500 text-[10px] font-medium">{errors.whatsapp.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-brand-sage font-bold flex items-center gap-2">
                <Tag size={12} /> Kategori
              </label>
              <select
                {...register('pesanan')}
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50/50 focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:border-brand-gold outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">Pilih Kategori</option>
                <option value="Buket Bunga Fresh">Buket Bunga</option>
                <option value="Money Bouquet">Money Bouquet</option>
                <option value="Hampers">Hampers</option>
                <option value="Dekorasi Event">Dekorasi Event</option>
              </select>
              {errors.pesanan && <p className="text-red-500 text-[10px] font-medium">{errors.pesanan.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-brand-sage font-bold flex items-center gap-2">
                <Calendar size={12} /> Tanggal
              </label>
              <input
                type="date"
                {...register('tanggal')}
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50/50 focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:border-brand-gold outline-none transition-all cursor-pointer"
              />
              {errors.tanggal && <p className="text-red-500 text-[10px] font-medium">{errors.tanggal.message}</p>}
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full shadow-lg shadow-brand-gold/20 hover:shadow-xl hover:-translate-y-0.5" 
          variant="gold" 
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim via WhatsApp'}
        </Button>

        <div className="flex items-center justify-between pt-6 border-t border-brand-pink/10">
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <ShieldCheck size={14} className="text-brand-sage" />
            Aman & Amanah
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <Clock size={14} className="text-brand-gold" />
            Fast Response
          </div>
        </div>
      </form>
    </div>
  );
};
