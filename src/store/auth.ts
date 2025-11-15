import { create } from 'zustand';
import { mockUsers, User } from '@/lib/mock-data';
interface AuthState {
  currentUser: User | null;
  login: () => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  login: () => set({ currentUser: mockUsers[0] }), // Log in the first mock user
  logout: () => set({ currentUser: null }),
}));