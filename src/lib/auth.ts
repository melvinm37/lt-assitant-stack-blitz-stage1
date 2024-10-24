import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { email: string; password: string; name?: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials) => {
    try {
      // TODO: Replace with actual API call
      const mockUser = {
        id: '1',
        email: credentials.email,
      };
      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  register: async (userData) => {
    try {
      // TODO: Replace with actual API call
      const mockUser = {
        id: '1',
        email: userData.email,
        name: userData.name,
      };
      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  logout: async () => {
    try {
      // TODO: Replace with actual API call
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      throw new Error('Logout failed');
    }
  },
}));