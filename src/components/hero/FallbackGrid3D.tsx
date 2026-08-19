'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldAlert, Zap, ArrowRight, Radio } from 'lucide-react';

export function FallbackGrid3D() {
  return (
    <div className="relative w-full h-[450px] lg:h-[550px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border border-slate-800/80 shadow-2xl flex items-center justify-center p-6">
      {/* Dynamic 3D Grid Perspective Plane */}
      <div className="absolute inset-0 opacity-40 [perspective:1000px] pointer-events-none">
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '0px 60px'],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'linear',
          }}
          className="w-full h-[200%] [transform:rotateX(60deg)_translateZ(-100px)] bg-[linear-gradient(to_right,#0ea5e920_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px]"
        />
      </div>

      {/* Floating Network Nodes */}
      <div className="relative z-10 w-full max-w-lg space-y-6">
        {/* Node 1 */}
        <motion.div 
          animate={{ y: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-red-500/40 shadow-xl shadow-red-500/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-100">OMR Sholinganallur</p>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                  DEADLOCK
                </span>
              </div>
              <p className="text-xs text-slate-400">Waits For: Kelambakkam_Jn (Capacity 85%)</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-red-400">4.2 km/h</span>
        </motion.div>

        {/* Directed Edge Arrow Visual */}
        <div className="flex items-center justify-center text-slate-500 font-mono text-xs gap-2 my-[-8px]">
          <div className="h-6 w-0.5 bg-gradient-to-b from-red-500 to-amber-500 animate-pulse" />
          <span className="text-[10px] text-red-400 font-mono bg-red-950/60 px-2 py-0.5 rounded border border-red-900/40">
            Circular Wait Edge (waitsFor)
          </span>
        </div>

        {/* Node 2 */}
        <motion.div 
          animate={{ y: [4, -4, 4] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
          className="p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-amber-500/40 shadow-xl shadow-amber-500/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center">
              <Radio className="w-5 h-5 text-amber-400 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-100">Kelambakkam Junction</p>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                  BLOCKED
                </span>
              </div>
              <p className="text-xs text-slate-400">Waits For: Vengaivasal_Rd</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400">9.8 km/h</span>
        </motion.div>

        {/* Directed Edge Arrow Visual */}
        <div className="flex items-center justify-center text-slate-500 font-mono text-xs gap-2 my-[-8px]">
          <div className="h-6 w-0.5 bg-gradient-to-b from-amber-500 to-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/40">
            AI Gemini Mitigation Available
          </span>
        </div>

        {/* Node 3 - Solution Node */}
        <motion.div 
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
          className="p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-emerald-500/50 shadow-xl shadow-emerald-500/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-100">Velachery Metro Park-and-Ride</p>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  CLEAR FLOW
                </span>
              </div>
              <p className="text-xs text-emerald-400/90">Avoids Deadlocked Circular Wait • Saves 45m</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400">55.0 km/h</span>
        </motion.div>
      </div>
    </div>
  );
}
