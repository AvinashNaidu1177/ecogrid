'use client';

import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/hero/HeroSection';
import { LiveTicker } from '@/components/landing/LiveTicker';
import { GridlockExplainer } from '@/components/landing/GridlockExplainer';
import { BeforeAfterSimulation } from '@/components/landing/BeforeAfterSimulation';
import { QuickPlannerSection } from '@/components/landing/QuickPlannerSection';
import { MobilityModulesSection } from '@/components/landing/MobilityModulesSection';
import { AIMobilityAssistantWidget } from '@/components/landing/AIMobilityAssistantWidget';
import { Navigation, Activity, ArrowRight, Cpu, Sparkles, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* 1. Hero Section with 3D Spline Scene */}
      <HeroSection />

      {/* 2. Live City Intelligence Stats Ticker */}
      <LiveTicker />

      {/* 3. Gridlock Prevention & OS Deadlock Theory Explainer (Section 8A) */}
      <GridlockExplainer />

      {/* 4. Before vs After Interactive Simulation (Section 13) */}
      <BeforeAfterSimulation />

      {/* 5. Smart Journey Multimodal Planner Showcase (Section 5 & 6) */}
      <QuickPlannerSection />

      {/* 6. Ecosystem Infrastructure Layers (Sections 15–20) */}
      <MobilityModulesSection />

      {/* 7. AI Mobility Assistant Widget (Section 21) */}
      <AIMobilityAssistantWidget />

      {/* 8. Final CTA Banner */}
      <section className="py-24 border-t border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800">
            PRD SECTION 24 • FINAL CTA
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            MAKE EVERY JOURNEY <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">SMARTER.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Every transportation decision has a personal cost and a city-wide consequence. Optimize movement, prevent deadlock, and build sustainable cities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/planner"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm font-sans shadow-xl shadow-emerald-500/25 transition transform active:scale-95"
            >
              <Navigation className="w-4 h-4 fill-slate-950" />
              PLAN MY JOURNEY
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm font-sans transition"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              LAUNCH GRIDLOCK ENGINE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
