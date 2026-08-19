'use client';

import React from 'react';
import { AlertCircle, RefreshCw, Zap, Plus, ShieldAlert } from 'lucide-react';

interface SimulationControlsProps {
  onTriggerDeadlock: () => void;
  onBreakDeadlock: () => void;
  onAddTraffic: () => void;
  onResetGraph: () => void;
}

export function SimulationControls({
  onTriggerDeadlock,
  onBreakDeadlock,
  onAddTraffic,
  onResetGraph
}: SimulationControlsProps) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          Real-Time OS Deadlock Simulation Panel
        </h4>
        <p className="text-xs text-slate-400">Inject or resolve traffic dependencies in the live Firestore Resource Allocation Graph.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
        <button
          onClick={onTriggerDeadlock}
          className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-semibold font-mono transition shadow-lg shadow-red-950/40"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          Trigger Circular Wait Cycle
        </button>

        <button
          onClick={onBreakDeadlock}
          className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-xs font-semibold font-mono transition"
        >
          <Zap className="w-3.5 h-3.5" />
          Preempt Edge
        </button>

        <button
          onClick={onAddTraffic}
          className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold font-mono transition"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          +10 Traffic Load
        </button>

        <button
          onClick={onResetGraph}
          className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-mono transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Graph
        </button>
      </div>
    </div>
  );
}
