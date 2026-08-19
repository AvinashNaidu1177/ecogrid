'use client';

import React from 'react';
import { Cpu, ShieldCheck, Leaf, Sparkles, Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-200">EcoGrid OS</span>
          <span className="text-slate-600">|</span>
          <span>Resource Allocation Graph Urban Traffic Mitigation</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-emerald-400/90">
            <Leaf className="w-3.5 h-3.5" />
            <span>Google Cloud & Gemini AI</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400/90">
            <Terminal className="w-3.5 h-3.5" />
            <span>DFS Circular Wait Algorithm</span>
          </div>
        </div>

        <div className="text-slate-500 font-mono text-[11px]">
          © 2026 EcoGrid Platform. Built for Hackathon Excellence.
        </div>
      </div>
    </footer>
  );
}
