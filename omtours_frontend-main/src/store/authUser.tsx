  import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// Axios config
axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE}`;
axios.defaults.withCredentials = true;

// -------------------- Types --------------------

type User = {
  id: string;
  username: string;
  email: string;
  image?: string;
  searchHistory?: string[];
};

interface AuthState {
  user: User | null;
  isCheckingAuth: boolean;
  isLoggingOut: boolean;
  googleOAuthLogin: (code: string) => Promise<void>;
  authCheck: () => Promise<void>;
  logout: () => Promise<void>;
  
}

// -------------------- Zustand Store --------------------

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isCheckingAuth: true,
  isLoggingOut: false,

  // ✅ Google OAuth login
  googleOAuthLogin: async (code: string) => {
    try {
      const response = await axios.post<{ user: User }>(
        "/api/v1/auth/login",
        { code }
      );
      set({ user: response.data.user });
      toast.success("Logged in with Google");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Google login failed");
      set({ user: null });
      throw error;
    }
  },

  // ✅ Auth check for session persistence
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get<{ user: User }>(
        "/api/v1/auth/authCheck"
      );
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error: any) {
      set({ user: null, isCheckingAuth: false });
    }
  },

  // ✅ Logout
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Logout failed");
      set({ isLoggingOut: false });
    }
  },
}));