'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, RefreshCw, ShieldAlert, CheckCircle2, ArrowRight, Zap, Play, Lock } from 'lucide-react';

export function GridlockExplainer() {
  const [isGridlocked, setIsGridlocked] = useState(true);

  return (
    <section className="py-20 border-t border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-800">
            THE CORE INSIGHT • PRD SECTION 8A
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
            Gridlock is Not Random. It&apos;s an <span className="text-emerald-400">OS Deadlock</span>.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Operating Systems have studied circular wait failure modes for 60 years. An intersection is a finite resource. A vehicle stream is a process requesting that resource. When A waits for B, B waits for C, and C waits for A — the city deadlocks.
          </p>
        </div>

        {/* Comparison Table: OS vs Traffic */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-x-auto">
          <h3 className="text-base font-bold text-white mb-6 font-mono flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            OS DEADLOCK vs TRAFFIC GRIDLOCK EQUIVALENCE
          </h3>

          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-emerald-400">
                <th className="pb-3 px-4 font-bold">OS DEADLOCK CONCEPT</th>
                <th className="pb-3 px-4 font-bold">TRAFFIC EQUIVALENT IN ECOGRID</th>
                <th className="pb-3 px-4 font-bold">ALGORITHMIC ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-100">Resource (finite instances)</td>
                <td className="py-3.5 px-4 text-slate-300">Intersection / road segment (finite vehicle capacity)</td>
                <td className="py-3.5 px-4 text-slate-400">Track node load vs capacity</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-100">Process</td>
                <td className="py-3.5 px-4 text-slate-300">Vehicle flow stream requesting entry</td>
                <td className="py-3.5 px-4 text-slate-400">Model request queue</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-100">Resource Allocation Graph (RAG)</td>
                <td className="py-3.5 px-4 text-slate-300">Live graph of intersections &amp; held/waited-on edges</td>
                <td className="py-3.5 px-4 text-slate-400">Maintain directed wait-for graph</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-red-400">Circular Wait</td>
                <td className="py-3.5 px-4 text-red-300">Gridlock: Intersection A ➔ B ➔ C ➔ A</td>
                <td className="py-3.5 px-4 text-red-400">DFS Cycle Detection O(V+E)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-emerald-400">Banker&apos;s Algorithm (Safe State)</td>
                <td className="py-3.5 px-4 text-emerald-300">Refusing routes that push network into an unsafe state</td>
                <td className="py-3.5 px-4 text-emerald-400">Simulate allocation before granting</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-cyan-400">Preemption</td>
                <td className="py-3.5 px-4 text-cyan-300">Signal retiming &amp; release-valve rerouting</td>
                <td className="py-3.5 px-4 text-cyan-400">Break wait dependency edge</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Live Interactive Cycle Explainer Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                INTERACTIVE DEMO
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Live Coffman Circular Wait Cycle Simulation
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Toggle between active deadlock cycle and EcoGrid Banker&apos;s Algorithm preemption resolution.
              </p>
            </div>

            <button
              onClick={() => setIsGridlocked(!isGridlocked)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition ${
                isGridlocked
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-red-500 hover:bg-red-400 text-slate-950 shadow-lg shadow-red-500/20'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              {isGridlocked ? 'EXECUTE PREEMPTION (RESOLVE CYCLE)' : 'INJECT CIRCULAR WAIT (GRIDLOCK)'}
            </button>
          </div>

          {/* Interactive Graph Node Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* Node 1: OMR Sholinganallur */}
            <div className={`p-5 rounded-2xl border transition-all duration-500 ${
              isGridlocked ? 'bg-red-950/40 border-red-500/70 shadow-xl shadow-red-500/10' : 'bg-slate-900 border-emerald-500/50'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-sm text-slate-100">OMR Sholinganallur</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isGridlocked ? 'bg-red-900 text-red-300' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  {isGridlocked ? 'LOAD: 34/40 (85%)' : 'LOAD: 18/40 (45%)'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isGridlocked ? '➔ Waits for: Kelambakkam Jn' : '✓ Direct Flow Available'}
              </p>
            </div>

            {/* Node 2: Kelambakkam Jn */}
            <div className={`p-5 rounded-2xl border transition-all duration-500 ${
              isGridlocked ? 'bg-red-950/40 border-red-500/70 shadow-xl shadow-red-500/10' : 'bg-slate-900 border-emerald-500/50'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-sm text-slate-100">Kelambakkam Junction</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isGridlocked ? 'bg-red-900 text-red-300' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  {isGridlocked ? 'LOAD: 28/30 (93%)' : 'LOAD: 14/30 (46%)'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isGridlocked ? '➔ Waits for: Vengaivasal Rd' : '✓ Direct Flow Available'}
              </p>
            </div>

            {/* Node 3: Vengaivasal Rd */}
            <div className={`p-5 rounded-2xl border transition-all duration-500 ${
              isGridlocked ? 'bg-red-950/40 border-red-500/70 shadow-xl shadow-red-500/10' : 'bg-slate-900 border-emerald-500/50'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-sm text-slate-100">Vengaivasal Main Road</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isGridlocked ? 'bg-red-900 text-red-300' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  {isGridlocked ? 'LOAD: 24/25 (96%)' : 'LOAD: 10/25 (40%)'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isGridlocked ? '➔ Waits for: OMR Sholinganallur' : '✓ Release Valve Open'}
              </p>
            </div>

          </div>

          {/* Status Alert Footer */}
          <div className={`p-4 rounded-2xl border font-mono text-xs flex items-center gap-3 ${
            isGridlocked
              ? 'bg-red-950/30 border-red-900/60 text-red-300 animate-pulse'
              : 'bg-emerald-950/30 border-emerald-900/60 text-emerald-300'
          }`}>
            {isGridlocked ? (
              <>
                <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <span className="font-bold uppercase">CIRCULAR WAIT DETECTED:</span> OMR ➔ Kelambakkam ➔ Vengaivasal ➔ OMR. Traffic speed degraded to 4.2 km/h. Banker&apos;s Safe State check failing.
                </div>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold uppercase">SAFE STATE VERIFIED:</span> Preemption executed. Rerouted 18% flow via Medavakkam Expressway. Average speed restored to 26.5 km/h.
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
