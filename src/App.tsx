/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { Hero } from './components/sections/Hero';
import { Catalog } from './components/sections/Catalog';
import { Services } from './components/sections/Services';
import { Promo } from './components/sections/Promo';
import { Trust } from './components/sections/Trust';
import { Location } from './components/sections/Location';
import { Gallery } from './components/sections/Gallery';
import { FAQ } from './components/sections/FAQ';
import { SeasonalSection } from './components/sections/SeasonalSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { motion, useScroll, useSpring } from 'motion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CatalogPage } from './pages/CatalogPage';
import { DecorationPage } from './pages/DecorationPage';

function MainWebsite() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-rose z-[100] origin-left"
        style={{ scaleX }}
      />

      <Header />
      
      <main>
        <Hero />
        <SeasonalSection />
        <Catalog />
        <Services />
        <Promo />
        <Trust />
        <Location />
        <Gallery />
        <FAQ />
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Persistent Floating Order Prompt (Mobile Sticky CTA) */}
      <div className="md:hidden fixed bottom-6 left-6 z-50">
        <motion.button
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          onClick={() => window.open('https://wa.me/6281234567890?text=Halo%20Ryya%20Project!%20Saya%20ingin%20order%20buket.', '_blank')}
          className="bg-brand-rose text-white px-6 py-4 rounded-full shadow-2xl font-bold text-sm uppercase tracking-widest flex items-center gap-2"
        >
          Order Sekarang
        </motion.button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainWebsite />} />
          <Route path="/katalog" element={<CatalogPage />} />
          <Route path="/dekorasi" element={<DecorationPage />} />
          <Route path="/admin/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
