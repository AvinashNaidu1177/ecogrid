'use client';

import React from 'react';
import { TrendingDown, TrendingUp, ShieldCheck, Zap, ArrowUpRight, Gauge } from 'lucide-react';

export function LiveTicker() {
  const metrics = [
    { label: 'Traffic Congestion', value: '↓ 18%', color: 'text-emerald-400', icon: TrendingDown },
    { label: 'CO₂ Emissions', value: '↓ 24%', color: 'text-cyan-400', icon: TrendingDown },
    { label: 'Avg City Speed', value: '↑ 16%', color: 'text-emerald-400', icon: TrendingUp },
    { label: 'Public Transit Usage', value: '↑ 31%', color: 'text-cyan-400', icon: TrendingUp },
    { label: 'Gridlock Cycles Prevented Today', value: '47', color: 'text-amber-400', isAccent: true, icon: ShieldCheck }
  ];

  return (
    <div className="w-full border-y border-slate-800/80 bg-slate-950/60 backdrop-blur-md py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6 font-mono text-xs">
          
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">CITY MOBILITY INTELLIGENCE:</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 ${
                    m.isAccent ? 'bg-amber-950/40 border border-amber-800/50 px-3 py-1 rounded-full' : ''
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                  <span className="text-slate-400 hidden sm:inline">{m.label}:</span>
                  <span className="text-slate-300 sm:hidden">{m.label.split(' ')[0]}:</span>
                  <span className={`font-bold ${m.color}`}>{m.value}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
