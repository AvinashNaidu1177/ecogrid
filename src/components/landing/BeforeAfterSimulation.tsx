'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, ShieldAlert, CheckCircle2, TrendingDown, Gauge, Fuel, Clock, Activity } from 'lucide-react';

export function BeforeAfterSimulation() {
  const [viewState, setViewState] = useState<'before' | 'after'>('after');

  const beforeMetrics = {
    vehicles: '48,200',
    speed: '17 km/h',
    co2: '18.4 tonnes',
    delay: '34 min',
    gridlockCycles: 3,
    statusText: 'SEVERE CONGESTION & ACTIVE CIRCULAR WAITS',
    statusBg: 'bg-red-950/80 border-red-800 text-red-300'
  };

  const afterMetrics = {
    vehicles: '37,600',
    speed: '26 km/h',
    co2: '13.1 tonnes',
    delay: '19 min',
    gridlockCycles: 0,
    statusText: 'OPTIMIZED MULTIMODAL FLOW & 0 GRIDLOCK CYCLES',
    statusBg: 'bg-emerald-950/80 border-emerald-800 text-emerald-300'
  };

  const current = viewState === 'before' ? beforeMetrics : afterMetrics;

  return (
    <section className="py-20 border-t border-slate-800/80 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3.5 py-1 rounded-full border border-cyan-800">
              PRD SECTION 13 • INTERACTIVE SIMULATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Before vs After <span className="text-cyan-400">EcoGrid Transformation</span>
            </h2>
            <p className="text-slate-300 text-sm">
              Watch how individual smart journey choices and Banker&apos;s Safe-State gridlock preemption transform city-wide congestion in real time.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="bg-slate-950 p-1.5 rounded-full border border-slate-800 flex items-center gap-1 self-start md:self-auto shadow-xl">
            <button
              onClick={() => setViewState('before')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition ${
                viewState === 'before'
                  ? 'bg-red-500 text-slate-950 shadow-md shadow-red-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              BEFORE (HIGH TRAFFIC)
            </button>
            <button
              onClick={() => setViewState('after')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition ${
                viewState === 'after'
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              AFTER (OPTIMIZED)
            </button>
          </div>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual City State Render Simulator */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            
            {/* Ambient Background Simulation Colors */}
            <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
              viewState === 'before'
                ? 'bg-gradient-to-tr from-red-950/40 via-amber-950/20 to-transparent opacity-100'
                : 'bg-gradient-to-tr from-emerald-950/40 via-teal-950/20 to-transparent opacity-100'
            }`} />

            {/* Header Badge */}
            <div className="relative z-10 flex justify-between items-center pb-4 border-b border-slate-800/80">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${current.statusBg}`}>
                {current.statusText}
              </span>
              <span className="text-xs font-mono text-slate-400">SIMULATION ENGINE v2</span>
            </div>

            {/* Simulated Road Arterial Grid */}
            <div className="relative z-10 py-8 space-y-4 font-mono text-xs">
              
              {/* OMR Main Expressway */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>OMR Main Expressway (Arterial 1)</span>
                  <span className={viewState === 'before' ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {viewState === 'before' ? '82% Load • Circular Wait Loop' : '42% Load • Free Flow'}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      viewState === 'before'
                        ? 'bg-gradient-to-r from-red-500 via-red-600 to-violet-500 animate-pulse'
                        : 'bg-emerald-400'
                    }`}
                    style={{ width: viewState === 'before' ? '88%' : '42%' }}
                  />
                </div>
              </div>

              {/* Kelambakkam Junction */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Kelambakkam Junction (Arterial 2)</span>
                  <span className={viewState === 'before' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {viewState === 'before' ? '91% Load • Severe Spillback' : '48% Load • Optimized'}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      viewState === 'before'
                        ? 'bg-gradient-to-r from-amber-500 to-red-500'
                        : 'bg-teal-400'
                    }`}
                    style={{ width: viewState === 'before' ? '91%' : '48%' }}
                  />
                </div>
              </div>

              {/* Velachery Transit Hub Route */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Velachery Metro Corridor</span>
                  <span className="text-emerald-400 font-bold">
                    {viewState === 'before' ? '32% Park-and-Ride Utilization' : '88% High Transit Shift'}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className="h-full rounded-full transition-all duration-700 bg-cyan-400"
                    style={{ width: viewState === 'before' ? '32%' : '88%' }}
                  />
                </div>
              </div>

            </div>

            {/* Footer Summary */}
            <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Gridlock cycles active: <strong className={viewState === 'before' ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>{current.gridlockCycles}</strong></span>
              <span>Network status: <strong className="text-slate-200">{viewState === 'before' ? 'UNSAFE STATE' : 'SAFE STATE'}</strong></span>
            </div>

          </div>

          {/* Metrics Column */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">Active Vehicles</p>
                  <p className="text-xl font-bold text-white font-mono">{current.vehicles}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400">↓ 22% Reduction</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">Average City Speed</p>
                  <p className="text-xl font-bold text-white font-mono">{current.speed}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400">↑ +53% Speedup</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400">
                  <Fuel className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">CO₂ Emissions / Day</p>
                  <p className="text-xl font-bold text-white font-mono">{current.co2}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-400">↓ -5.3 Tonnes CO₂</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">Average Commuter Delay</p>
                  <p className="text-xl font-bold text-white font-mono">{current.delay}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400">↓ -15 min Saved</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
