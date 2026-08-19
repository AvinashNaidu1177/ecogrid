'use client';

import React from 'react';
import { DeadlockCycleResult } from '@/types';
import { ShieldAlert, Zap, AlertOctagon, CheckCircle2, RotateCcw } from 'lucide-react';

interface AlertBannerProps {
  result: DeadlockCycleResult;
  onBreakDeadlock: () => void;
}

export function DeadlockAlertBanner({ result, onBreakDeadlock }: AlertBannerProps) {
  if (!result.hasDeadlock) {
    return (
      <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-300">City Network Status: Optimal</h4>
            <p className="text-xs text-emerald-400/80">No Circular Wait conditions detected in Resource Allocation Graph.</p>
          </div>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-700">
          Speed: {result.averageSpeedKmH} km/h
        </span>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-3xl bg-gradient-to-r from-red-950/90 via-slate-950 to-violet-950/90 border border-red-500/60 shadow-2xl shadow-red-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in duration-300">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-2xl bg-red-500/20 border border-red-500/60 flex items-center justify-center flex-shrink-0 animate-pulse">
          <ShieldAlert className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-red-200">OS CIRCULAR WAIT DEADLOCK DETECTED!</h4>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-900 text-red-100 border border-red-600">
              SEVERITY: {result.severityScore}%
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            DFS Graph Traversal confirmed circular wait dependency between <strong className="text-red-400 font-mono">{result.deadlockedNodes.join(', ')}</strong>. Gridlock speed reduced to <span className="font-bold text-red-400 font-mono">{result.averageSpeedKmH} km/h</span>.
          </p>
        </div>
      </div>

      <button
        onClick={onBreakDeadlock}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-violet-600 hover:from-red-400 hover:to-violet-500 text-white text-xs font-bold font-sans shadow-lg shadow-red-500/30 transition transform active:scale-95 flex-shrink-0"
      >
        <Zap className="w-4 h-4 text-amber-300" />
        Preempt Cycle (Break Edge)
      </button>
    </div>
  );
}
