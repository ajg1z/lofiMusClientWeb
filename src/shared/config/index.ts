export const APP_CONFIG = {
  // Prefer server-only env when available; fallback to public env.
  API_BASE_URL:
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001",
} as const;
