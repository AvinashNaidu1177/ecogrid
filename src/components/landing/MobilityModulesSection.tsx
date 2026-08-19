'use client';

import React from 'react';
import { Train, Car, ParkingSquare, Leaf, Trophy, ShieldAlert, ChevronRight, Zap } from 'lucide-react';

export function MobilityModulesSection() {
  const modules = [
    {
      icon: Train,
      title: 'Public Transit Intelligence',
      badge: 'LIVE TRANSIT FEEDS',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/30',
      desc: 'Real-time occupancy tracking for buses and metro trains. Provides delay predictions and seamless multimodal transfer synchronization.'
    },
    {
      icon: Car,
      title: 'Private & Shared Fleet Layer',
      badge: 'HOV & CARPOOL',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      desc: 'Smart routing for private EVs and shared shuttles. Integrates HOV priority lanes to bypass high-density intersection clusters.'
    },
    {
      icon: ParkingSquare,
      title: 'Smart Parking Reservation',
      badge: 'PARK-AND-RIDE',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      desc: 'Predictive parking space availability at metro hubs. Reserve spots in advance to reduce circling time by up to 35%.'
    },
    {
      icon: Leaf,
      title: 'Pollution Intelligence & CO₂ Matrix',
      badge: 'EMISSIONS MONITORING',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      desc: 'Visualizes carbon footprint per mode. Direct driving emits 4.8 kg CO₂, while bus emits 1.2 kg and e-bike/metro emits 0.4 kg.'
    },
    {
      icon: Trophy,
      title: 'Sustainability Gamification',
      badge: 'ECO-POINTS TIERS',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      desc: 'Earn Eco-Points for choosing deadlock-safe and low-emission routes. Unlock commuter badges and public transit fare discounts.'
    },
    {
      icon: ShieldAlert,
      title: 'Emergency & Disruption Dispatch',
      badge: 'DISPATCH CONTROL',
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/30',
      desc: 'Receives gridlock cycle alerts directly from the DFS RAG engine alongside accidents and monsoon waterlogging warnings.'
    }
  ];

  return (
    <section className="py-20 border-t border-slate-800/80 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3.5 py-1 rounded-full border border-cyan-800">
            PRD SECTIONS 15–22 • ECOSYSTEM LAYERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Integrated Mobility Infrastructure
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Connecting public transit, EV shuttles, smart parking, carbon tracking, and emergency intelligence into a unified urban layer.
          </p>
        </div>

        {/* Grid of 6 Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-6 rounded-3xl space-y-4 shadow-xl transition group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${mod.bg}`}>
                      <Icon className={`w-6 h-6 ${mod.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                      {mod.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
                      {mod.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 flex items-center gap-1 text-xs font-mono text-slate-400 group-hover:text-emerald-400 transition">
                  <span>Explore Layer</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
