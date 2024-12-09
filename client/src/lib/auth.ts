import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../types";

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
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error("Authentication failed");
  }
  
  return response.json();
}

export async function signOut() {
  const response = await fetch("/api/auth/signout", {
    method: "POST",
  });
  
  if (!response.ok) {
    throw new Error("Sign out failed");
  }
}

export async function signUp(userData: Omit<User, "id">) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error("Sign up failed");
  }
  
  return response.json();
}
