'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { LogIn, LogOut, ShieldCheck, Leaf, Award, ChevronDown, Zap } from 'lucide-react';

export function UserDropdown() {
  const { user, openAuthModal, signInAsDemoUser, signOut, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="h-9 w-24 bg-slate-800/60 animate-pulse rounded-full border border-slate-700/50" />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={signInAsDemoUser}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
        >
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          Demo Commuter
        </button>

        <button
          onClick={openAuthModal}
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-sans shadow-lg shadow-emerald-500/20 transition transform active:scale-95"
        >
          <LogIn className="w-3.5 h-3.5" />
          Custom Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 transition group"
      >
        <img
          src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
          alt={user.displayName || 'Commuter'}
          className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/40 group-hover:ring-emerald-400"
        />
        <div className="text-left hidden md:block">
          <p className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400 transition truncate max-w-[110px]">
            {user.displayName}
          </p>
          <p className="text-[10px] text-emerald-400/80 flex items-center gap-1 font-mono">
            <Leaf className="w-2.5 h-2.5" /> {user.co2SavedKg}kg CO₂
          </p>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <img
              src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
              alt={user.displayName || 'Commuter'}
              className="w-12 h-12 rounded-full ring-2 ring-emerald-500/50 object-cover"
            />
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-slate-100 truncate">{user.displayName}</h4>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
              {user.isDemo ? (
                <span className="inline-block mt-1 text-[10px] font-medium bg-cyan-950/80 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-800/50">
                  ⚡ Demo Account
                </span>
              ) : (
                <span className="inline-block mt-1 text-[10px] font-medium bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50">
                  ✓ Custom Commuter
                </span>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 my-3">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs mb-0.5">
                <Leaf className="w-3.5 h-3.5" />
                <span className="font-semibold">CO₂ Saved</span>
              </div>
              <span className="text-sm font-bold text-slate-100 font-mono">{user.co2SavedKg} kg</span>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 text-xs mb-0.5">
                <Award className="w-3.5 h-3.5" />
                <span className="font-semibold">Eco Points</span>
              </div>
              <span className="text-sm font-bold text-slate-100 font-mono">{user.ecoPoints}</span>
            </div>
          </div>

          {/* Tier Badge */}
          <div className="bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 border border-emerald-500/20 p-2.5 rounded-xl flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div className="text-xs">
              <p className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">Commuter Category</p>
              <p className="font-semibold text-emerald-300">{user.commuterTier}</p>
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 p-2 rounded-xl border border-red-900/20 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
