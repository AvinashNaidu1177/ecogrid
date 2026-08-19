'use client';

import React from 'react';
import { DeadlockCycleResult } from '@/types';
import { Gauge, Flame, Cpu, ShieldCheck, AlertCircle } from 'lucide-react';

interface SpeedMatrixProps {
  result: DeadlockCycleResult;
}

export function SpeedMatrixCard({ result }: SpeedMatrixProps) {
  const isDeadlocked = result.hasDeadlock;
  const co2Spike = isDeadlocked ? '+240%' : 'Nominal';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Speed Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Average Speed</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-3xl font-extrabold font-mono ${isDeadlocked ? 'text-red-400' : 'text-emerald-400'}`}>
              {result.averageSpeedKmH}
            </span>
            <span className="text-xs text-slate-400">km/h</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Normal Baseline: 45.0 km/h</p>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
          isDeadlocked ? 'bg-red-950/60 border-red-800 text-red-400' : 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
        }`}>
          <Gauge className="w-6 h-6" />
        </div>
      </div>

      {/* CO2 Idle Spike Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Idling CO₂ Multiplier</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-3xl font-extrabold font-mono ${isDeadlocked ? 'text-amber-400' : 'text-slate-200'}`}>
              {co2Spike}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Fuel wasted during gridlock</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center">
          <Flame className="w-6 h-6" />
        </div>
      </div>

      {/* Coffman Conditions Checklist Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
          Coffman Conditions Status
        </span>
        <div className="space-y-1 text-xs font-mono">
          <div className="flex items-center justify-between text-slate-300">
            <span>1. Mutual Exclusion</span>
            <span className="text-emerald-400">Active</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>2. Hold and Wait</span>
            <span className="text-emerald-400">Active</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>3. No Preemption</span>
            <span className="text-emerald-400">Active</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>4. Circular Wait</span>
            <span className={isDeadlocked ? "text-red-400 font-bold animate-pulse" : "text-slate-500"}>
              {isDeadlocked ? "FOUND (CYCLE)" : "Cleared"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
