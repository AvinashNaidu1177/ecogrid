'use client';

import React, { useState } from 'react';
import { IntersectionGraph, BankerSafeStateResult } from '@/types';
import { checkBankerSafeState } from '@/lib/bankersAlgorithm';
import { ShieldCheck, ShieldAlert, Cpu, ArrowRight, Play } from 'lucide-react';

interface BankerCardProps {
  graph: IntersectionGraph;
}

export function BankerSafeStateCard({ graph }: BankerCardProps) {
  const [vehicleAllocation, setVehicleAllocation] = useState<number>(10);
  const [selectedPath, setSelectedPath] = useState<string[]>(['OMR_Sholinganallur', 'Kelambakkam_Jn']);

  const safeResult: BankerSafeStateResult = checkBankerSafeState(graph, selectedPath, vehicleAllocation);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 font-sans">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Banker&apos;s Algorithm Safe-State Checker
          </h3>
          <p className="text-xs text-slate-400">
            Simulates granting capacity to requested vehicle flows before surfacing routes to commuters.
          </p>
        </div>

        <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
          safeResult.isSafe
            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
            : 'bg-red-950 text-red-300 border-red-800 animate-pulse'
        }`}>
          {safeResult.isSafe ? '✓ STATE IS SAFE' : '🔴 STATE IS UNSAFE'}
        </span>
      </div>

      {/* Simulator Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="space-y-1.5">
          <label className="text-slate-400">Simulated Vehicle Flow Stream (+units):</label>
          <div className="flex items-center gap-2">
            {[5, 10, 25, 40].map((count) => (
              <button
                key={count}
                onClick={() => setVehicleAllocation(count)}
                className={`px-3 py-1.5 rounded-lg border transition ${
                  vehicleAllocation === count
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                +{count} Vehicles
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-slate-400">Target Intersection Corridor:</label>
          <select
            value={selectedPath.join(',')}
            onChange={(e) => setSelectedPath(e.target.value.split(','))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="OMR_Sholinganallur,Kelambakkam_Jn">OMR Corridor ➔ Kelambakkam</option>
            <option value="Kelambakkam_Jn,Vengaivasal_Rd">Kelambakkam ➔ Vengaivasal</option>
            <option value="Guindy_Hub,Velachery_Jn">Guindy Hub ➔ Velachery Metro</option>
            <option value="Medavakkam_Jn,Velachery_Jn">Medavakkam ➔ Velachery</option>
          </select>
        </div>
      </div>

      {/* Analysis Result Banner */}
      <div className={`p-4 rounded-2xl border font-mono text-xs space-y-2 ${
        safeResult.isSafe
          ? 'bg-emerald-950/30 border-emerald-900/60 text-emerald-300'
          : 'bg-red-950/30 border-red-900/60 text-red-300'
      }`}>
        <div className="flex items-center gap-2 font-bold uppercase">
          {safeResult.isSafe ? (
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-red-400" />
          )}
          <span>{safeResult.explanation}</span>
        </div>

        {safeResult.isSafe && safeResult.safeSequence.length > 0 && (
          <p className="text-[11px] text-emerald-400/90">
            Discovered Safe Clearing Sequence: {safeResult.safeSequence.map(n => n.replace(/_/g, ' ')).join(' ➔ ')}
          </p>
        )}
      </div>

    </div>
  );
}
