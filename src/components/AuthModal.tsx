import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { overlayFadeVariants, modalPanelVariants, contentFadeVariants, PILL_SPRING } from '../utils/motion';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  Send,
  ArrowLeft,
  Loader2,
} from 'lucide-react';

interface AuthModalProps {
  initialView?: 'signin' | 'signup';
  onClose: () => void;
  onSuccess?: () => void;
}

type ModalView = 'signin' | 'signup' | 'verify-pending' | 'forgot-password' | 'reset-sent';

export const AuthModal: React.FC<AuthModalProps> = ({
  initialView = 'signin',
  onClose,
  onSuccess,
}) => {
  const { isConfigured, signIn, signUp, resendVerification, resetPassword } = useAuth();

  const [view, setView] = useState<ModalView>(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [unverifiedRecover, setUnverifiedRecover] = useState(false);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = window.setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [resendCooldown]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);
    setUnverifiedRecover(false);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (view === 'signup') {
      const trimmedName = displayName.trim();
      if (trimmedName.length < 2) {
        setErrorMsg('Please enter your name (at least 2 characters).');
        return;
      }
      if (trimmedName.length > 40) {
        setErrorMsg('Name must be 40 characters or fewer.');
        return;
      }
      if (password.length < 8) {
        setErrorMsg('Password must be at least 8 characters.');
        return;
      }
      if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
        setErrorMsg('Password must include at least one letter and one number.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
    } else if (view === 'signin' && !password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setSubmitting(true);
    try {
      if (view === 'signup') {
        const res = await signUp(trimmedEmail, password, displayName.trim());
        if (res.error) {
          setErrorMsg(res.error);
        } else if (res.needsVerification) {
          setResendCooldown(60);
          setView('verify-pending');
        } else {
          onSuccess?.();
          onClose();
        }
      } else if (view === 'signin') {
        const res = await signIn(trimmedEmail, password);
        if (res.error) {
          setErrorMsg(res.error);
          if (res.unverifiedEmail) setUnverifiedRecover(true);
        } else {
          onSuccess?.();
          onClose();
        }
      } else if (view === 'forgot-password') {
        const res = await resetPassword(trimmedEmail);
        if (res.error) {
          setErrorMsg(res.error);
        } else {
          setView('reset-sent');
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email.trim()) return;
    setErrorMsg(null);
    setInfoMsg(null);
    setSubmitting(true);
    try {
      const res = await resendVerification(email);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setInfoMsg('Verification email sent.');
        setResendCooldown(60);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      variants={overlayFadeVariants}
      initial="enter"
      animate="center"
      exit="exit"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#0A1020]/85 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        variants={modalPanelVariants}
        initial="enter"
        animate="center"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-[#1A2540] border border-[#6382BF]/35 shadow-2xl overflow-hidden text-[#E8ECF4] font-sans"
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0A1020]/60 border-b border-[#6382BF]/25 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="matheseus" className="w-6 h-6 rounded-md object-cover ring-1 ring-white/15" />
            <span className="font-bold text-base text-[#E8ECF4]">
              {view === 'verify-pending'
                ? 'Verify Your Email'
                : view === 'forgot-password' || view === 'reset-sent'
                ? 'Reset Password'
                : view === 'signup'
                ? 'Create Account'
                : 'Sign In'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1A2540] transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {!isConfigured && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
              <div className="font-semibold">Supabase environment keys not set</div>
              <p className="text-amber-200/80 leading-relaxed">
                Add <code className="font-mono text-[11px]">VITE_SUPABASE_URL</code> and{' '}
                <code className="font-mono text-[11px]">VITE_SUPABASE_ANON_KEY</code> to enable cloud accounts.
              </p>
            </div>
          )}

          {(view === 'signin' || view === 'signup') && (
            <>
              {/* Tab switcher */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-[#0A1020] border border-[#6382BF]/25 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setView('signin');
                    setErrorMsg(null);
                    setInfoMsg(null);
                    setUnverifiedRecover(false);
                  }}
                  className={`relative py-2 rounded-lg transition-colors ${
                    view === 'signin'
                      ? 'text-white'
                      : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                  }`}
                >
                  {view === 'signin' && (
                    <motion.div
                      layoutId="auth-tab-pill"
                      className="absolute inset-0 bg-[#4A7BF7] rounded-lg shadow-sm"
                      transition={PILL_SPRING}
                    />
                  )}
                  <span className="relative z-10">Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setView('signup');
                    setErrorMsg(null);
                    setInfoMsg(null);
                    setUnverifiedRecover(false);
                  }}
                  className={`relative py-2 rounded-lg transition-colors ${
                    view === 'signup'
                      ? 'text-white'
                      : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                  }`}
                >
                  {view === 'signup' && (
                    <motion.div
                      layoutId="auth-tab-pill"
                      className="absolute inset-0 bg-[#4A7BF7] rounded-lg shadow-sm"
                      transition={PILL_SPRING}
                    />
                  )}
                  <span className="relative z-10">Create Account</span>
                </button>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={view}
                  variants={contentFadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >

              <form noValidate onSubmit={handleSubmit} className="space-y-3.5">
                {view === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#7B8FAD] block">Name</label>
                    <div className="relative">
                      <UserIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8FAD]" />
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={40}
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your name"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 focus:border-[#4A7BF7] focus:outline-none text-sm text-[#E8ECF4] placeholder-[#5A6E8A]"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#7B8FAD] block">Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8FAD]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 focus:border-[#4A7BF7] focus:outline-none text-sm text-[#E8ECF4] placeholder-[#5A6E8A]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#7B8FAD]">Password</label>
                    {view === 'signin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMsg(null);
                          setView('forgot-password');
                        }}
                        className="text-[11px] text-[#4A7BF7] hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8FAD]" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={view === 'signup' ? 'At least 8 characters' : '••••••••'}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 focus:border-[#4A7BF7] focus:outline-none text-sm text-[#E8ECF4] placeholder-[#5A6E8A]"
                    />
                  </div>
                  {view === 'signup' && (
                    <p className="text-[11px] text-[#7B8FAD]">
                      Minimum 8 characters with at least one letter and one number.
                    </p>
                  )}
                </div>

                {view === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#7B8FAD] block">Confirm Password</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8FAD]" />
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 focus:border-[#4A7BF7] focus:outline-none text-sm text-[#E8ECF4] placeholder-[#5A6E8A]"
                      />
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/35 text-xs text-rose-200 flex items-start gap-2">
                    <AlertCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                    <div className="space-y-1.5 flex-1">
                      <div>{errorMsg}</div>
                      {unverifiedRecover && (
                        <button
                          type="button"
                          onClick={handleResend}
                          disabled={resendCooldown > 0 || submitting}
                          className="text-[#4A7BF7] hover:underline font-semibold"
                        >
                          {resendCooldown > 0
                            ? `Resend link (${resendCooldown}s)`
                            : 'Resend verification email'}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {infoMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-xs text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{infoMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !isConfigured}
                  className="w-full py-2.5 rounded-xl bg-[#4A7BF7] hover:bg-[#3D6CE0] disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  <span>{view === 'signup' ? 'Create Account' : 'Sign In'}</span>
                </button>
              </form>
                </motion.div>
              </AnimatePresence>
            </>
          )}

          {view === 'verify-pending' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-2xl bg-[#4A7BF7]/15 border border-[#4A7BF7]/35 text-[#4A7BF7] flex items-center justify-center mx-auto">
                <Mail size={22} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-[#E8ECF4]">Check your inbox</h3>
                <p className="text-xs text-[#7B8FAD] leading-relaxed">
                  We sent a verification link to <span className="text-[#E8ECF4] font-semibold">{email}</span>.
                  Open the link to activate your account and sync your progress.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/35 text-xs text-rose-200">
                  {errorMsg}
                </div>
              )}
              {infoMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-xs text-emerald-200">
                  {infoMsg}
                </div>
              )}

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || submitting}
                  className="w-full py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 disabled:opacity-50 text-[#E8ECF4] border border-[#6382BF]/35 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Send size={13} className="text-[#4A7BF7]" />
                  <span>
                    {resendCooldown > 0
                      ? `Resend email in ${resendCooldown}s`
                      : 'Resend Verification Email'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setInfoMsg(null);
                    setView('signin');
                  }}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-[#7B8FAD] hover:text-[#E8ECF4] transition-colors"
                >
                  Already verified? Sign in
                </button>
              </div>
            </div>
          )}

          {view === 'forgot-password' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-[#7B8FAD]">
                Enter your account email and we will send a password reset link.
              </p>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8FAD]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 focus:border-[#4A7BF7] focus:outline-none text-sm text-[#E8ECF4]"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/35 text-xs text-rose-200">
                  {errorMsg}
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setView('signin');
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-xs font-semibold text-[#7B8FAD] hover:text-[#E8ECF4] flex items-center gap-1.5"
                >
                  <ArrowLeft size={13} />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={submitting || !isConfigured}
                  className="flex-1 py-2.5 rounded-xl bg-[#4A7BF7] hover:bg-[#3D6CE0] disabled:opacity-50 text-white text-xs font-semibold"
                >
                  {submitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          )}

          {view === 'reset-sent' && (
            <div className="space-y-4 text-center py-2">
              <CheckCircle2 size={28} className="text-emerald-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#E8ECF4]">Reset link sent</h3>
                <p className="text-xs text-[#7B8FAD]">
                  Check <span className="text-[#E8ECF4] font-semibold">{email}</span> for your reset email.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setView('signin')}
                className="w-full py-2.5 rounded-xl bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white text-xs font-semibold"
              >
                Back to Sign In
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
