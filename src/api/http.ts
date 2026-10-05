// src/api/http.ts
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
export const TOKEN_KEY = "token";

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    // json-server-auth sends errors as a plain string
    throw new Error(typeof body === "string" ? body : `Request failed: ${res.status}`);
  }
  return body as T;
}