import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_LINK } from '../constants';

export const WhatsAppButton = () => {
  return (
    <motion.a
      href={WHATSAPP_LINK('Halo Ryya Project! Saya tertarik untuk konsultasi buket/dekorasi.')}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <MessageCircle size={32} className="fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-medium whitespace-nowrap">
        Chat Admin
      </span>
    </motion.a>
  );
};
