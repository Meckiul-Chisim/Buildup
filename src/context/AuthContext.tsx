import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthValue = {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<{ error: string | null; confirmation: boolean }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) { setSession(data.session); setLoading(false); }
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  const value = useMemo(() => ({
    session,
    loading,
    async signIn(email: string, password: string) {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      return error?.message ?? null;
    },
    async signUp(email: string, password: string) {
      const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
      return { error: error?.message ?? null, confirmation: Boolean(data.user && !data.session) };
    },
    async signOut() { await supabase.auth.signOut(); },
  }), [session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
