import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types';
import { setActiveSyncUserId, syncUserProgressOnLogin } from '../utils/progressSync';

export type SyncStatus = 'idle' | 'syncing' | 'synced';

interface AuthResult {
  error?: string;
  needsVerification?: boolean;
  unverifiedEmail?: boolean;
}

interface AuthContextValue {
  isConfigured: boolean;
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  syncStatus: SyncStatus;
  verifiedNotice: boolean;
  dismissVerifiedNotice: () => void;
  signUp: (email: string, password: string, displayName?: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  resendVerification: (email: string) => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  updateProfile: (patch: Partial<Omit<UserProfile, 'id'>>) => Promise<{ error?: string }>;
  refreshSync: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const mapProfileRow = (row: any, fallbackUser: User): UserProfile => ({
  id: fallbackUser.id,
  displayName:
    row?.display_name ||
    (fallbackUser.user_metadata?.display_name as string | undefined) ||
    fallbackUser.email?.split('@')[0] ||
    'Student',
  qualificationFocus:
    row?.qualification_focus === 'maths' || row?.qualification_focus === 'further-maths'
      ? row.qualification_focus
      : 'both',
  targetGradeMaths: row?.target_grade_maths || 'A*',
  targetGradeFm: row?.target_grade_fm || 'A*',
  weeklyGoalPapers: Number(row?.weekly_goal_papers || 2),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(isSupabaseConfigured);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [verifiedNotice, setVerifiedNotice] = useState<boolean>(false);

  const loadProfileAndSync = useCallback(async (u: User) => {
    if (!supabase) return;
    setSyncStatus('syncing');
    setActiveSyncUserId(u.id);
    try {
      const { data: profData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', u.id)
        .maybeSingle();

      if (profData) {
        setProfile(mapProfileRow(profData, u));
      } else {
        const defaultProf: UserProfile = mapProfileRow(null, u);
        setProfile(defaultProf);
        await supabase.from('profiles').upsert({
          id: u.id,
          display_name: defaultProf.displayName,
          qualification_focus: defaultProf.qualificationFocus,
          target_grade_maths: defaultProf.targetGradeMaths,
          target_grade_fm: defaultProf.targetGradeFm,
          weekly_goal_papers: defaultProf.weeklyGoalPapers,
        });
      }

      await syncUserProgressOnLogin(u.id);
      setSyncStatus('synced');
    } catch (e) {
      console.warn('Failed to initialize account sync', e);
      setSyncStatus('idle');
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const hadAuthCallbackParams =
      window.location.search.includes('code=') ||
      window.location.hash.includes('access_token=') ||
      window.location.hash.includes('type=signup');

    supabase.auth.getSession().then(({ data }) => {
      const sess = data.session;
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        if (hadAuthCallbackParams) {
          setVerifiedNotice(true);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        void loadProfileAndSync(sess.user);
      } else {
        setActiveSyncUserId(null);
      }
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (nextSession?.user) {
        if (event === 'SIGNED_IN' && window.location.search.includes('code=')) {
          setVerifiedNotice(true);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          void loadProfileAndSync(nextSession.user);
        }
      } else {
        setActiveSyncUserId(null);
        setProfile(null);
        setSyncStatus('idle');
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [loadProfileAndSync]);

  const signUp = async (email: string, password: string, displayName?: string): Promise<AuthResult> => {
    if (!supabase) return { error: 'Supabase is not configured yet.' };
    const cleanEmail = email.trim();
    const cleanName = (displayName || '').trim() || cleanEmail.split('@')[0];
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { display_name: cleanName },
      },
    });
    if (error) return { error: error.message };
    // Supabase returns identities = [] if an unconfirmed/existing account email already exists without error
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      return { error: 'An account with this email already exists. Try signing in instead.' };
    }
    if (!data.session) {
      return { needsVerification: true };
    }
    return {};
  };

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    if (!supabase) return { error: 'Supabase is not configured yet.' };
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      const low = error.message.toLowerCase();
      if (low.includes('email not confirmed') || low.includes('confirm your email')) {
        return { error: 'Please verify your email address before signing in.', unverifiedEmail: true };
      }
      return { error: error.message };
    }
    return {};
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setActiveSyncUserId(null);
    setSession(null);
    setUser(null);
    setProfile(null);
    setSyncStatus('idle');
  };

  const resendVerification = async (email: string): Promise<AuthResult> => {
    if (!supabase) return { error: 'Supabase is not configured yet.' };
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) return { error: error.message };
    return {};
  };

  const resetPassword = async (email: string): Promise<AuthResult> => {
    if (!supabase) return { error: 'Supabase is not configured yet.' };
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin,
    });
    if (error) return { error: error.message };
    return {};
  };

  const updateProfile = async (patch: Partial<Omit<UserProfile, 'id'>>) => {
    if (!supabase || !user) return { error: 'Not signed in.' };
    const next: UserProfile = {
      ...(profile || mapProfileRow(null, user)),
      ...patch,
      id: user.id,
    };
    setProfile(next);

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      display_name: next.displayName,
      qualification_focus: next.qualificationFocus,
      target_grade_maths: next.targetGradeMaths,
      target_grade_fm: next.targetGradeFm,
      weekly_goal_papers: next.weeklyGoalPapers,
      updated_at: new Date().toISOString(),
    });
    if (error) return { error: error.message };
    return {};
  };

  const refreshSync = async () => {
    if (!user) return;
    await loadProfileAndSync(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isConfigured: isSupabaseConfigured,
        session,
        user,
        profile,
        loading,
        syncStatus,
        verifiedNotice,
        dismissVerifiedNotice: () => setVerifiedNotice(false),
        signUp,
        signIn,
        signOut,
        resendVerification,
        resetPassword,
        updateProfile,
        refreshSync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
