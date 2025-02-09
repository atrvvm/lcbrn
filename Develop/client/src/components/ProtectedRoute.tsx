import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import React from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}