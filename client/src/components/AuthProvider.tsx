import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AuthContext, signIn, signOut, signUp, getCurrentUser } from "../lib/auth";
import type { User } from "../types";
import { useToast } from "@/hooks/use-toast";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
          if (window.location.pathname === '/') {
            setLocation('/dashboard');
          }
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const userData = await signIn(email, password);
      setUser(userData);
      setLocation("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setLocation("/");
    } catch (error) {
      throw error;
    }
  };

  const handleSignUp = async (userData: Omit<User, "id">) => {
    try {
      await signUp(userData);
      toast({
        title: "Account created successfully!",
        description: "Please check your email for verification.",
      });
      // Don't set user or redirect yet - wait for email verification
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
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
