import { createContext, useContext } from "react";
import type { User } from "../types";
import { api } from "./api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (userData: Omit<User, "id">) => Promise<void>;
}

const defaultContext: AuthContextType = {
  user: null,
  loading: true,
  signIn: async () => { throw new Error('AuthContext not initialized') },
  signOut: async () => { throw new Error('AuthContext not initialized') },
  signUp: async () => { throw new Error('AuthContext not initialized') },
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

export function useAuth() {
  return useContext(AuthContext);
}

export async function signIn(email: string, password: string) {
  const data = await api("/auth/signin", {
    method: "POST",
    body: { email, password },
  });
  
  localStorage.setItem('token', data.token);
  return data.user;
}

export async function signOut() {
  localStorage.removeItem('token');
}

export async function signUp(userData: any) {
  try {
    const data = await api("/auth/signup", {
      method: "POST",
      body: userData,
    });
    
    // Don't set token or auto-login on signup
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.user;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create account");
  }
}

export async function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    return await api("/auth/me");
  } catch {
    localStorage.removeItem('token');
    return null;
  }
}
