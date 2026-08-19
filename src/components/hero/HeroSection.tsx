'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { SplineCanvas } from './SplineCanvas';
import { FallbackGrid3D } from './FallbackGrid3D';
import { Navigation, Sparkles, ArrowRight, ShieldCheck, Activity, Cpu } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-cyan-500/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Copy Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-lg shadow-emerald-500/10">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>OS DEADLOCK AVOIDANCE THEORY FOR CITIES</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Headline per PRD Section 24 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.08]">
              THE CITY IS MOVING.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                MAKE IT MOVE SMARTER.
              </span>
            </h1>

            {/* Core Insight Subtext */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Gridlock is not random. It is a <strong className="text-emerald-400">circular wait condition</strong> in a Resource Allocation Graph. 
              EcoGrid detects circular waits forming in real time and intervenes before the network locks — using Banker&apos;s Safe-State checks and AI routing.
            </p>

            {/* Action Buttons per PRD Section 24 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/planner"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm font-sans shadow-xl shadow-emerald-500/25 transition transform active:scale-95"
              >
                <Navigation className="w-4 h-4 fill-slate-950" />
                PLAN MY JOURNEY
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm font-sans transition"
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                EXPLORE CITY
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 font-mono">
              <div>
                <span className="text-2xl font-bold text-emerald-400">DFS RAG</span>
                <p className="text-[11px] text-slate-400">Cycle Detection</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-cyan-400">Banker&apos;s</span>
                <p className="text-[11px] text-slate-400">Safe-State Check</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-amber-400">Gemini 2.5</span>
                <p className="text-[11px] text-slate-400">AI Preemption</p>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Spline Canvas */}
          <div className="lg:col-span-6 w-full">
            <Suspense fallback={<FallbackGrid3D />}>
              <SplineCanvas />
            </Suspense>
          </div>

        </div>
      </div>
    </section>
  );
}
