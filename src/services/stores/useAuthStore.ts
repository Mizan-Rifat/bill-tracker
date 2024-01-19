import { User } from 'firebase/auth';
import { create } from 'zustand';

interface AuthState {
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
