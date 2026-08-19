'use client';

import React from 'react';
import { RouteOption } from '@/types';
import { Car, Train, Users, Bus, Bike, Footprints, ShieldAlert, Award, Leaf, CheckCircle2, IndianRupee } from 'lucide-react';

interface MultimodalProps {
  routes: RouteOption[];
  onSelectRoute?: (route: RouteOption) => void;
}

export function MultimodalCards({ routes, onSelectRoute }: MultimodalProps) {
  const getIcon = (mode: RouteOption['mode']) => {
    switch (mode) {
      case 'metro': return Train;
      case 'carpool': return Users;
      case 'bus': return Bus;
      case 'bike': return Bike;
      case 'walk': return Footprints;
      default: return Car;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-100 font-sans flex items-center justify-between">
        <span>Multimodal Route Alternatives</span>
        <span className="text-xs font-mono text-slate-400 font-normal">Ranked by Time, Cost, CO₂ &amp; Banker&apos;s Safe State</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {routes.map((route) => {
          const Icon = getIcon(route.mode);
          return (
            <div
              key={route.id}
              onClick={() => onSelectRoute && onSelectRoute(route)}
              className={`relative p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                route.isRecommended
                  ? 'bg-gradient-to-b from-emerald-950/50 via-slate-950 to-slate-950 border-emerald-500/80 shadow-2xl shadow-emerald-500/15 ring-2 ring-emerald-500/40'
                  : route.passesThroughDeadlock
                  ? 'bg-slate-950/90 border-red-500/50 hover:border-red-400'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Recommended Badge */}
              {route.isRecommended && (
                <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-[10px] font-bold font-mono px-3 py-1 rounded-full shadow-lg">
                  ★ RECOMMENDED ECO-CHOICE
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                    route.isRecommended
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-400'
                      : route.passesThroughDeadlock
                      ? 'bg-red-500/20 border-red-500/60 text-red-400 animate-pulse'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-extrabold font-mono text-slate-100">{route.durationMin}</span>
                    <span className="text-xs text-slate-400 font-mono ml-1">mins</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-slate-100">{route.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{route.subTitle}</p>

                {/* Safe State vs Deadlock Badge */}
                <div className="mt-3">
                  {route.isBankerSafeState ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Banker&apos;s Safe-State Verified
                    </span>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/60 flex items-center gap-2 text-xs text-red-300">
                      <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span>{route.deadlockWarning || "Trapped in circular wait deadlock"}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Stats */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Est. Cost:</span>
                  <span className="font-bold text-slate-200">₹{route.costInr || 35}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" /> CO₂ Saved:
                  </span>
                  <span className="font-bold text-emerald-400">+{route.co2SavedKg} kg</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> Eco Points:
                  </span>
                  <span className="font-bold text-amber-400">+{route.ecoPointsEarned} PTS</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
