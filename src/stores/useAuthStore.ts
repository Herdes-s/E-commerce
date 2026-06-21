import { create } from "zustand";
import { createAccountApi, loginApi } from "../services/authService";

export interface AuthCredentials {
  name?: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
  createAccount: (credential: AuthCredentials) => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  createAccount: async ({ name, email, password }: AuthCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const user = await createAccountApi({ name, email, password });
      set({ user, isAuthenticated: true });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async ({ email, password }: AuthCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const user = await loginApi({ email, password });
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  logout: () => set({ user: null, isAuthenticated: false, error: null }),
}));
