/**
 * src/types/profile.ts — Tipos TypeScript do módulo de Perfil
 */

// Perfil do usuário como está salvo no banco
export interface UserProfile {
  id: number; // Sempre 1 (registro único)
  name: string;
  email: string;
  photoUri: string | null; // Caminho local da foto ou null se não houver
}

// Dados necessários para salvar o perfil (criar ou atualizar)
export interface SaveProfileInput {
  name: string;
  email: string;
  photoUri: string | null;
}
