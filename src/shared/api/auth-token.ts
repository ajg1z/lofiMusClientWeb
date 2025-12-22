export const AUTH_TOKEN_STORAGE_KEY = "authToken";

/**
 * Browser-only token getter.
 * - Works with current auth implementation (localStorage).
 * - Returns null on the server (SSR / RSC).
 */
export function getBrowserAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

