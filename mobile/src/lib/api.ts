const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '') ??
  'http://127.0.0.1:8000/api';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly fields: Record<string, string[]> = {},
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  meta?: Record<string, unknown>;
  error?: {
    code: string;
    message: string;
    fields?: Record<string, string[]>;
  };
};

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');

  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  let payload: ApiEnvelope<T> | null = null;

  try {
    payload = (await response.json()) as ApiEnvelope<T>;
  } catch {
    // Keep the API error generic when the server does not return JSON.
  }

  if (!response.ok || payload?.success === false) {
    throw new ApiError(
      response.status,
      payload?.error?.code ?? 'NETWORK_ERROR',
      payload?.error?.message ?? 'Une erreur est survenue.',
      payload?.error?.fields ?? {},
    );
  }

  return payload?.data as T;
}

export type Utilisateur = {
  id: string;
  nom: string;
  prenom: string;
  nom_complet: string;
  telephone: string;
  email: string | null;
  roles?: string[];
  actif: boolean;
};

export type AuthPayload = {
  utilisateur: Utilisateur;
  token: string;
  token_type: 'Bearer';
};

export const api = {
  auth: {
    async connexion(telephone: string, motDePasse: string) {
      return request<AuthPayload>('/auth/connexion', {
        method: 'POST',
        body: JSON.stringify({
          telephone,
          mot_de_passe: motDePasse,
        }),
      });
    },

    async deconnexion(token: string) {
      await request<{ message: string }>(
        '/auth/deconnexion',
        { method: 'POST' },
        token,
      );
    },
  },
};
