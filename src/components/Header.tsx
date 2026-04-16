import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Flower } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './Button';
import { WHATSAPP_LINK } from '../constants';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Katalog', href: '#katalog' },
    { label: 'Dekorasi', href: '#dekorasi' },
    { label: 'Testimoni', href: '#testimoni' },
    { label: 'Lokasi', href: '#lokasi' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 border-b border-brand-gold/10',
        isScrolled ? 'bg-brand-cream/90 backdrop-blur-md py-2' : 'bg-transparent'
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
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium hover:text-brand-sage transition-colors uppercase tracking-wider"
            >
              {item.label}
            </a>
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
                <a
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
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
  );
};
