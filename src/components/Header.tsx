import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Flower, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './Button';
import { WHATSAPP_LINK } from '../constants';
import { db, collection, query, where, onSnapshot } from '../lib/firebase';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'events'), where('isActive', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) setActiveEvent(snapshot.docs[0].data());
      else setActiveEvent(null);
    });
    return () => unsubscribe();
  }, []);

  const menuItems = [
    { label: 'Katalog', href: '/katalog' },
    { label: 'Dekorasi', href: '/dekorasi' },
    { label: 'Testimoni', href: isHome ? '#testimoni' : '/#testimoni' },
    { label: 'Lokasi', href: isHome ? '#lokasi' : '/#lokasi' },
    { label: 'FAQ', href: isHome ? '#faq' : '/#faq' },
  ];

  return (
    <>
      <AnimatePresence>
        {activeEvent && (
          <motion.div 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            className="fixed top-0 left-0 right-0 z-[60] py-2 px-6 flex items-center justify-center gap-3 text-white text-[10px] font-bold uppercase tracking-[2px]"
            style={{ backgroundColor: activeEvent.themeColor || '#C5A059' }}
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>{activeEvent.title} Special Collection is here!</span>
            <a href="#special" className="underline hover:no-underline">Shop Now</a>
          </motion.div>
        )}
      </AnimatePresence>
      <header
        className={cn(
          'fixed left-0 right-0 z-50 transition-all duration-300 px-6 py-4 border-b border-brand-gold/10',
          activeEvent ? 'top-8' : 'top-0',
          isScrolled ? 'bg-brand-cream/90 backdrop-blur-md py-2 shadow-sm' : 'bg-transparent'
        )}
      >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-serif font-bold text-brand-gold uppercase tracking-[3px]">
            Ryya Project
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            item.href.startsWith('#') || item.href.startsWith('/#') ? (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium hover:text-brand-sage transition-colors uppercase tracking-wider"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium hover:text-brand-sage transition-colors uppercase tracking-wider"
              >
                {item.label}
              </Link>
            )
          ))}
          <Button
            size="sm"
            onClick={() => window.open(WHATSAPP_LINK('Halo Ryya Project!'), '_blank')}
          >
            Order via WA
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-cream overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6 border-t border-brand-pink">
              {menuItems.map((item) => (
                item.href.startsWith('#') || item.href.startsWith('/#') ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <Button
                className="w-full"
                onClick={() => window.open(WHATSAPP_LINK('Halo Ryya Project!'), '_blank')}
              >
                Order via WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </>
  );
};
