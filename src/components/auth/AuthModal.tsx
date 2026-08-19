'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { X, LogIn, UserPlus, Sparkles, Mail, Lock, User, ShieldCheck, Zap, ArrowRight, Check } from 'lucide-react';

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authError,
    signInWithGoogle,
    signInWithEmail,
    signUpWithCustomProfile,
    signInAsDemoUser
  } = useAuth();

  const [tab, setTab] = useState<'signin' | 'signup' | 'demo'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Level 4 Eco-Grid Master');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    await signInWithEmail(email, password);
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    setIsLoading(true);
    await signUpWithCustomProfile(name, email, password, role);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-mono border border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ECOGRID COMMUTER AUTHENTICATION</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">
            {tab === 'signin' ? 'Welcome Back Commuter' : tab === 'signup' ? 'Create Eco Account' : 'Demo Account'}
          </h2>
          <p className="text-xs text-slate-400">
            Access real-time OS deadlock rerouting and earn gamified Eco Points.
          </p>
        </div>

        {/* Auth Error Notice Banner */}
        {authError && (
          <div className="p-3 rounded-2xl bg-amber-950/50 border border-amber-500/50 text-xs text-amber-300 font-mono text-center">
            {authError}
          </div>
        )}

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setTab('signin')}
            className={`py-2 rounded-xl transition ${
              tab === 'signin' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setTab('signup')}
            className={`py-2 rounded-xl transition ${
              tab === 'signup' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register
          </button>

          <button
            onClick={() => setTab('demo')}
            className={`py-2 rounded-xl transition ${
              tab === 'demo' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Demo
          </button>
        </div>

        {/* Form Body */}
        {tab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="commuter@ecogrid.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {isLoading ? 'Signing In...' : 'Custom Sign In'}
            </button>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t border-slate-800" />
              <span className="absolute bg-slate-900 px-3 text-[10px] font-mono text-slate-500 uppercase">OR OAUTH</span>
            </div>

            {/* Google Sign In Option */}
            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Sign In with Google
            </button>
          </form>
        )}

        {/* Register Tab */}
        {tab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Jordan Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="jordan@ecogrid.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Commuter Category Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
              >
                <option value="Level 4 Eco-Grid Master">Level 4 Eco-Grid Master (Metro Pass)</option>
                <option value="Level 3 EV Carpooler">Level 3 EV Carpooler</option>
                <option value="Level 2 Daily Tech Commuter">Level 2 Daily Tech Commuter</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              {isLoading ? 'Creating Account...' : 'Register Eco Account (+1,000 PTS)'}
            </button>
          </form>
        )}

        {/* Demo Tab */}
        {tab === 'demo' && (
          <div className="space-y-4 text-center py-2">
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-300 space-y-2">
              <Zap className="w-6 h-6 text-amber-400 mx-auto" />
              <p className="font-bold text-sm text-slate-100">Evaluator &amp; Hackathon Demo Mode</p>
              <p className="text-slate-300">
                Log in instantly as <strong>Alex Rivers</strong> (Level 4 Eco-Grid Master with 1,250 PTS &amp; 42.8kg CO₂ saved).
              </p>
            </div>

            <button
              onClick={signInAsDemoUser}
              className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              Launch Demo Commuter Session
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
