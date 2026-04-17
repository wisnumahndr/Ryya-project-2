import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  if (adminOnly && role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream p-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif text-brand-dark">Access Denied</h1>
          <p className="text-gray-500">You do not have permission to view this page.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-brand-gold font-bold uppercase tracking-widest hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
