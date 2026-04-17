import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup } from '../../lib/firebase';
import { motion } from 'motion/react';
import { Button } from '../../components/Button';
import { LogIn } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }
  if (user && role === 'admin') return <Navigate to="/admin" />;

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/admin');
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-brand-pink/10 text-center space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-brand-dark">Admin Portal</h1>
          <p className="text-gray-500">Sign in to manage Rhya Project catalog</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm border border-red-100 flex items-center gap-2 justify-center">
            <LogIn size={14} />
            <span>{error}</span>
          </div>
        )}

        <Button 
          onClick={handleLogin}
          variant="gold" 
          className="w-full h-14 text-lg flex items-center justify-center gap-3"
        >
          <LogIn size={20} />
          Sign in with Google
        </Button>

        <button 
          onClick={() => navigate('/')}
          className="text-xs text-gray-400 hover:text-brand-gold uppercase tracking-widest transition-colors"
        >
          Back to Website
        </button>
      </motion.div>
    </div>
  );
};
