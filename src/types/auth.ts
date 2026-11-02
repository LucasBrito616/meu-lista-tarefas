/**
 * Usuário autenticado, mapeado do `User` do Firebase com só o que a UI usa.
 */
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

/**
 * Retorno do hook `useAuth`.
 */
export interface UseAuthReturn {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

/**
 * Tipo do contexto de autenticação (igual ao retorno de `useAuth`).
 */
export type AuthContextType = UseAuthReturn;
