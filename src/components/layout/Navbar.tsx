'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserDropdown } from '../auth/UserDropdown';
import { Cpu, Navigation, Activity, ShieldAlert, Sparkles } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/', icon: Cpu },
    { name: 'Gridlock Engine', href: '/dashboard', icon: Activity, badge: 'LIVE RAG' },
    { name: 'Smart Journey', href: '/planner', icon: Navigation, badge: 'GEMINI AI' },
    { name: 'Emergency AI', href: '/emergency', icon: ShieldAlert, badge: 'DISPATCH' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white font-sans">
                Eco<span className="text-emerald-400">Grid</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                OS v2.4
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Intelligent Urban Mobility Platform</p>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800/80">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {item.name}
                {item.badge && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-slate-800 text-cyan-400 border border-cyan-800/60">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Auth & Profile */}
        <div className="flex items-center gap-3">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
