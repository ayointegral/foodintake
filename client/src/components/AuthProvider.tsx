import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AuthContext, signIn, signOut, signUp } from "../lib/auth";
import type { User } from "../types";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    fetch("/api/auth/me")
      .then(async (res) => {
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const userData = await signIn(email, password);
      setUser(userData);
      setLocation("/");
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setLocation("/signin");
    } catch (error) {
      throw error;
    }
  };

  const handleSignUp = async (userData: Omit<User, "id">) => {
    try {
      const newUser = await signUp(userData);
      setUser(newUser);
      setLocation("/onboarding");
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
