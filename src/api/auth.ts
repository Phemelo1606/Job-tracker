// src/api/auth.ts
import type { AuthResponse, LoginData, RegisterData } from "../types/auth";
import { request } from "./http";

export const register = (data: RegisterData) =>
  request<AuthResponse>("/register", { method: "POST", body: JSON.stringify(data) });

export const login = (data: LoginData) =>
  request<AuthResponse>("/login", { method: "POST", body: JSON.stringify(data) });