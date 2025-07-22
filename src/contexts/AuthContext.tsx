import { createContext, useContext, useEffect, useState } from "react";
import { Session, User, AuthTokenResponsePassword } from "@supabase/supabase-js";
import { supabase } from "../supabase-client";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<AuthTokenResponsePassword>;
  signUp: (
    email: string,
    password: string,
    name: string,
    grade: string,
  ) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null };
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get session from storage
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email: string, password: string, name: string, grade: string) => {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    // If user is created, insert profile
    if (result.data.user) {
      const { error: userInsertError } = await supabase
        .from("user")
        .upsert({
          id: result.data.user.id,
          full_name: name,
          grade: grade,
          email: email,
        });
      if (userInsertError) {
        console.error("Failed to insert user into user table:", userInsertError);
      }
    }

    // Directly sign in the user after signup (bypass email confirmation)
    if (!result.error) {
      // Try to sign in immediately
      await supabase.auth.signInWithPassword({ email, password });
    }

    return result;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
