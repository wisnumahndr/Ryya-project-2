import { MapPin, Navigation } from 'lucide-react';
import { Button } from '../Button';

export const Location = () => {
  const realMapsLink = "https://www.google.com/maps/place/Buket+dan+dekorasi+ryya+project/@-6.2212082,107.0243975,20z/data=!4m6!3m5!1s0x2e698f2c08f60705:0x88a90da3b2871f05!8m2!3d-6.2212082!4d107.0247194!16s%2Fg%2F11t5gvy75b?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section id="lokasi" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">Kunjungi Workshop Kami</h2>
              <p className="text-gray-500">
                Kami melayani pemesanan langsung di lokasi atau pengiriman ke seluruh area terjangkau. Datang dan pilih desainmu!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-brand-cream/50 rounded-3xl border border-brand-pink/20">
                <MapPin className="text-brand-maroon w-10 h-10 shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-dark">Alamat Lengkap</h4>
                  <p className="text-sm text-gray-600">Buket dan dekorasi Ryya Project, Bekasi, Jawa Barat.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-brand-cream/50 rounded-3xl border border-brand-pink/20">
                <Navigation className="text-brand-maroon w-10 h-10 shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-dark">Area Layanan</h4>
                  <p className="text-sm text-gray-600">Melayani pengiriman lokal dan sekitarnya (Radius 15km).</p>
                </div>
              </div>
            </div>

            <Button
              variant="gold"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => window.open(realMapsLink, '_blank')}
            >
              Lihat Rute di Google Maps
            </Button>
          </div>

          <div className="order-1 lg:order-2">
            <div className="aspect-square lg:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-brand-pink/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1!2d107.0247194!3d-6.2212082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698f2c08f60705%3A0x88a90da3b2871f05!2sBuket%20dan%20dekorasi%20ryya%20project!5e0!3m2!1sid!2sid!4v1713280000000!5m2!1sid!2sid"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
