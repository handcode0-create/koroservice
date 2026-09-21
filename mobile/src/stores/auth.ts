import { create } from 'zustand';

import { api, type Utilisateur } from '@/lib/api';

type AuthState = {
  utilisateur: Utilisateur | null;
  token: string | null;
  isLoading: boolean;
  connexion: (telephone: string, motDePasse: string) => Promise<void>;
  deconnexion: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  utilisateur: null,
  token: null,
  isLoading: false,

  connexion: async (telephone, motDePasse) => {
    set({ isLoading: true });

    try {
      const session = await api.auth.connexion(telephone, motDePasse);

      set({
        token: session.token,
        utilisateur: session.utilisateur,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  deconnexion: async () => {
    const token = get().token;

    if (token) {
      try {
        await api.auth.deconnexion(token);
      } finally {
        set({ token: null, utilisateur: null, isLoading: false });
      }
      return;
    }

    set({ token: null, utilisateur: null, isLoading: false });
  },
}));
