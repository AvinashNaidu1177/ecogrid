'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navigation, Bike, Train, ArrowRight, ShieldCheck, Zap, Fuel, Leaf, IndianRupee } from 'lucide-react';

export function QuickPlannerSection() {
  const [origin, setOrigin] = useState('VIT Chennai');
  const [destination, setDestination] = useState('OMR Sholinganallur');

  return (
    <section className="py-20 border-t border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-800">
              PRD SECTION 5 &amp; 6 • MULTIMODAL ROUTING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Smart Journey <span className="text-emerald-400">Multimodal Planner</span>
            </h2>
            <p className="text-slate-300 text-sm">
              Input your trip parameters. EcoGrid evaluates combinations of Metro, Bus, Carpool, and Micro-Mobility — filtered through Banker&apos;s Safe-State network constraints.
            </p>
          </div>

          <Link
            href="/planner"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition shadow-lg shadow-emerald-500/20"
          >
            OPEN FULL PLANNER APP <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Search Box Container */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
          
          {/* Quick Route Picker Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Starting Location:</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-bold focus:outline-none focus:border-emerald-500/80"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Destination:</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-bold focus:outline-none focus:border-emerald-500/80"
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-end">
              <Link
                href={`/planner?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-center transition flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 fill-slate-950" />
                CALCULATE SAFE ROUTE
              </Link>
            </div>
          </div>

          {/* Sample Recommended Multimodal Route Result */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                RECOMMENDED MULTIMODAL COMBINATION (PRD SPECIFIED):
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                ✓ BANKER&apos;S SAFE-STATE VERIFIED
              </span>
            </div>

            {/* Multimodal Flow Card */}
            <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Route Legs */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-white text-base">
                  <span>🚲 Bike</span>
                  <span className="text-slate-500">➔</span>
                  <span>🚇 Metro</span>
                  <span className="text-slate-500">➔</span>
                  <span>🚶 Walk</span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  VIT Chennai E-Bike Station ➔ Blue Line Metro Terminal ➔ 300m Walk to OMR Tech Corridor
                </p>
              </div>

              {/* Metrics Badge Group */}
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
                <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">TIME</span>
                  <span className="font-bold text-emerald-400 text-sm">38 minutes</span>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">COST</span>
                  <span className="font-bold text-slate-200 text-sm">₹35</span>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">CARBON</span>
                  <span className="font-bold text-cyan-400 text-sm">0.6 kg CO₂</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
