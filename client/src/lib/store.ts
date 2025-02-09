import { create } from 'zustand';
import { auth, users } from './api';

interface User {
  id: string;
  email: string;
  fullName?: string;
  specialty?: string;
  location?: string;
  phone?: string;
  imageUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },
  login: async (email, password) => {
    const { user, token } = await auth.login(email, password);
    set({ user, token });
    localStorage.setItem('token', token);
  },
  register: async (email, password) => {
    const { user, token } = await auth.register(email, password);
    set({ user, token });
    localStorage.setItem('token', token);
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  updateProfile: async (data) => {
    const updatedUser = await users.updateProfile(data);
    set({ user: updatedUser });
  }
}));