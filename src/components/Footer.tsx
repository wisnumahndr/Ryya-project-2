import { Flower, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="text-2xl font-serif font-bold tracking-[3px] text-brand-rose uppercase">
            Ryya Project
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Buket & Dekorasi Custom yang Elegan, Unik, dan Berkesan untuk Setiap Momen Spesial Anda.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" className="hover:text-brand-maroon transition-colors"><Instagram size={20} /></a>
            <a href="https://facebook.com" target="_blank" className="hover:text-brand-maroon transition-colors"><Facebook size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Navigasi</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#katalog" className="hover:text-white transition-colors">Katalog Buket</a></li>
            <li><a href="#dekorasi" className="hover:text-white transition-colors">Layanan Dekorasi</a></li>
            <li><a href="#testimoni" className="hover:text-white transition-colors">Testimoni Pelanggan</a></li>
            <li><a href="#lokasi" className="hover:text-white transition-colors">Lokasi Workshop</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Kontak Kami</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-maroon shrink-0" />
              <span>Bekasi, Jawa Barat</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-maroon shrink-0" />
              <span>+62 812-3456-7890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-maroon shrink-0" />
              <span>ryya.project@gmail.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Jam Operasional</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>Senin - Jumat: 09:00 - 18:00</li>
            <li>Sabtu: 10:00 - 16:00</li>
            <li>Minggu: Dengan Janji temu</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center space-y-4">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Ryya Project. All rights reserved.</p>
        <div className="flex justify-center">
          <a 
            href="/admin" 
            className="text-[10px] text-gray-600 hover:text-brand-gold uppercase tracking-[2px] transition-colors"
          >
            Admin Portal
          </a>
        </div>
      </div>
    </footer>
  );
};
