export function getRemoteApiBaseUrl(): string {
  const baseUrl =
    process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  return baseUrl.replace(/\/+$/, "");
}

export function joinUrl(baseUrl: string, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${p}`;
}

export const ACCESS_TOKEN_COOKIE_NAME = "access_token";

