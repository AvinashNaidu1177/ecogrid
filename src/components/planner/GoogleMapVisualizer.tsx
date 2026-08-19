'use client';

import React, { useState, useEffect } from 'react';
import { RouteOption } from '@/types';
import { HOTSPOT_LOCATIONS } from '@/lib/mockData';
import { MapPin, Navigation, ShieldAlert, Compass, ExternalLink } from 'lucide-react';

interface MapProps {
  selectedRoute: RouteOption;
  originId: string;
  destinationId: string;
  deadlockedNodes: string[];
}

export function GoogleMapVisualizer({ selectedRoute, originId, destinationId, deadlockedNodes }: MapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const originSpot = HOTSPOT_LOCATIONS.find(h => h.id === originId) || HOTSPOT_LOCATIONS[0];
  const destSpot = HOTSPOT_LOCATIONS.find(h => h.id === destinationId) || HOTSPOT_LOCATIONS[3];

  useEffect(() => {
    const win = window as unknown as { google?: unknown };
    if (apiKey && typeof window !== 'undefined' && !win.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      document.head.appendChild(script);
    } else if (win.google) {
      setIsScriptLoaded(true);
    }
  }, [apiKey]);

  const isDeadlockedRoute = selectedRoute.passesThroughDeadlock;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
      {/* Map Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            Google Maps API Optimal Path Visualizer
          </h3>
          <p className="text-xs text-slate-400">Live GIS vector polyline routing &amp; deadlocked intersection hazards</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {apiKey || isScriptLoaded ? 'Google Maps JS API Active' : 'EcoGrid GIS Engine Active'}
          </span>
        </div>
      </div>

      {/* Vector GIS Map Container */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col justify-between p-6">
        
        {/* Background Grid Map Pattern */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Map Top Bar */}
        <div className="relative z-10 flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">From: <strong className="text-white">{originSpot.name}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">To: <strong className="text-white">{destSpot.name}</strong></span>
          </div>
        </div>

        {/* Interactive SVG Polyline Route Renderer */}
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 400">
            {/* Background Road Connection Lines */}
            <path
              d="M 120 280 Q 400 350 680 120"
              fill="none"
              stroke="#1e293b"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 120 280 Q 300 100 680 120"
              fill="none"
              stroke="#1e293b"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Selected Route Polyline Path */}
            {isDeadlockedRoute ? (
              // Deadlocked Car Route (Red Pulsing Warning Path)
              <path
                d="M 120 280 Q 400 350 680 120"
                fill="none"
                stroke="url(#deadlockGradient)"
                strokeWidth="8"
                strokeDasharray="12 8"
                className="animate-pulse"
              />
            ) : (
              // Optimal Metro / Eco Route (Glowing Emerald Path)
              <path
                d="M 120 280 Q 300 100 680 120"
                fill="none"
                stroke="url(#optimalGradient)"
                strokeWidth="8"
                strokeLinecap="round"
              />
            )}

            {/* SVG Gradients */}
            <defs>
              <linearGradient id="optimalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="deadlockGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Map Node Pins */}
          {/* 1. Origin Pin */}
          <div className="absolute left-[12%] bottom-[25%] transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce">
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="mt-1 font-mono text-[10px] font-bold bg-slate-900/90 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
              {originSpot.id}
            </span>
          </div>

          {/* 2. Deadlocked Intersection Hazard Marker */}
          {deadlockedNodes.length > 0 && (
            <div className="absolute left-[48%] bottom-[15%] transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
              <div className="w-11 h-11 rounded-2xl bg-red-500/30 border-2 border-red-500 flex items-center justify-center shadow-xl shadow-red-500/40 animate-pulse">
                <ShieldAlert className="w-6 h-6 text-red-400" />
              </div>
              <span className="mt-1 font-mono text-[10px] font-bold bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-700">
                CIRCULAR WAIT HAZARD
              </span>
            </div>
          )}

          {/* 3. Destination Pin */}
          <div className="absolute right-[12%] top-[25%] transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Navigation className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="mt-1 font-mono text-[10px] font-bold bg-slate-900/90 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
              {destSpot.id}
            </span>
          </div>
        </div>

        {/* Map Bottom Legend Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-800 gap-2">
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-slate-300">Optimal Path ({selectedRoute.title})</span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-slate-300">Deadlocked Road Segment</span>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${originSpot.lat},${originSpot.lng}&destination=${destSpot.lat},${destSpot.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
