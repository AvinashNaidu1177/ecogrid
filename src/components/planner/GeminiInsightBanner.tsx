'use client';

import React from 'react';
import { GeminiRerouteResponse } from '@/types';
import { Sparkles, Leaf, Clock, Award, ShieldCheck, ArrowRight } from 'lucide-react';

interface InsightBannerProps {
  insight: GeminiRerouteResponse | null;
  isLoading: boolean;
}

export function GeminiInsightBanner({ insight, isLoading }: InsightBannerProps) {
  if (isLoading) {
    return (
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 animate-pulse space-y-3">
        <div className="h-4 bg-slate-800 rounded w-1/3" />
        <div className="h-6 bg-slate-800 rounded w-3/4" />
        <div className="h-4 bg-slate-800 rounded w-1/2" />
      </div>
    );
  }

  if (!insight) return null;

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-950 to-cyan-950/70 border border-emerald-500/50 shadow-2xl shadow-emerald-500/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>GEMINI AI DYNAMIC REROUTE DIRECTIVE</span>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
          {insight.gamifiedBadge}
        </span>
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-white font-sans">{insight.alertHeadline}</h3>
        <p className="text-xs text-slate-300 mt-1 font-mono leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          {insight.deadlockExplanation}
        </p>
      </div>

      <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-4 rounded-2xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Recommended Mitigation Action</span>
          <p className="text-sm font-bold text-emerald-300">{insight.recommendedAction}</p>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs flex-shrink-0">
          <div className="flex items-center gap-1 text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-800">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Saved {insight.timeSavingsMinutes} mins</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Saved {insight.co2SavingsKg} kg CO₂</span>
          </div>
        </div>
      </div>
    </div>
  );
}
