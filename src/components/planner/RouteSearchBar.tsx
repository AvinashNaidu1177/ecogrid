'use client';

import React from 'react';
import { HOTSPOT_LOCATIONS } from '@/lib/mockData';
import { RoutePriority } from '@/types';
import { MapPin, Navigation, Sparkles, ArrowRightLeft, Sliders } from 'lucide-react';

interface SearchBarProps {
  origin: string;
  destination: string;
  priority: RoutePriority;
  onOriginChange: (val: string) => void;
  onDestinationChange: (val: string) => void;
  onPriorityChange: (priority: RoutePriority) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function RouteSearchBar({
  origin,
  destination,
  priority,
  onOriginChange,
  onDestinationChange,
  onPriorityChange,
  onSearch,
  isLoading
}: SearchBarProps) {
  const swapLocations = () => {
    onOriginChange(destination);
    onDestinationChange(origin);
  };

  const priorities: { id: RoutePriority; label: string }[] = [
    { id: 'balanced', label: '⚡ Balanced (Recommended)' },
    { id: 'fastest', label: '🚀 Fastest' },
    { id: 'cheapest', label: '💰 Cheapest' },
    { id: 'greenest', label: '🌱 Greenest (Lowest CO₂)' }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-slate-100 font-sans">Smart Journey Route Planner</h3>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
          Google Maps Platform &amp; Gemini AI
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Origin */}
        <div className="md:col-span-5 relative">
          <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
            Start Location (Origin)
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={origin}
              onChange={(e) => onOriginChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 font-sans focus:outline-none focus:border-emerald-500 transition appearance-none"
            >
              {HOTSPOT_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-2 flex justify-center pt-4 md:pt-0">
          <button
            onClick={swapLocations}
            className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
            title="Swap Origin and Destination"
          >
            <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Destination */}
        <div className="md:col-span-5 relative">
          <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
            End Destination
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 font-sans focus:outline-none focus:border-cyan-500 transition appearance-none"
            >
              {HOTSPOT_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Priority Toggle Filters per PRD Section 7 */}
      <div className="pt-2 border-t border-slate-800/80 space-y-2 font-mono text-xs">
        <label className="text-slate-400 flex items-center gap-1.5 uppercase">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          User Ranking Factor Preference (PRD Section 7):
        </label>
        <div className="flex flex-wrap gap-2">
          {priorities.map((p) => (
            <button
              key={p.id}
              onClick={() => onPriorityChange(p.id)}
              className={`px-3.5 py-1.5 rounded-full border transition ${
                priority === p.id
                  ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onSearch}
          disabled={isLoading}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition transform active:scale-95 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 fill-slate-950" />
          {isLoading ? 'Computing Gemini AI Reroutes...' : 'Find Eco-Optimal Routes'}
        </button>
      </div>
    </div>
  );
}
