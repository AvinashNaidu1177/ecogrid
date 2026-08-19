'use client';

import React, { useState } from 'react';
import { RouteSearchBar } from '@/components/planner/RouteSearchBar';
import { MultimodalCards } from '@/components/planner/MultimodalCards';
import { GeminiInsightBanner } from '@/components/planner/GeminiInsightBanner';
import { GoogleMapVisualizer } from '@/components/planner/GoogleMapVisualizer';
import { GeminiRerouteResponse, RouteOption, RoutePriority } from '@/types';
import { MOCK_ROUTE_OPTIONS, INITIAL_INTERSECTION_GRAPH } from '@/lib/mockData';
import { detectDeadlockCycles } from '@/lib/cycleDetection';
import { checkBankerSafeState } from '@/lib/bankersAlgorithm';
import { generateRerouteInsight } from '@/lib/gemini';

export default function PlannerPage() {
  const [origin, setOrigin] = useState<string>('OMR_Sholinganallur');
  const [destination, setDestination] = useState<string>('Velachery_Jn');
  const [priority, setPriority] = useState<RoutePriority>('balanced');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [insight, setInsight] = useState<GeminiRerouteResponse | null>(null);

  // Compute live deadlock state for map hazard warnings
  const deadlockAnalysis = detectDeadlockCycles(INITIAL_INTERSECTION_GRAPH);

  // Filter & sort routes based on selected priority
  const sortedRoutes = [...MOCK_ROUTE_OPTIONS].sort((a, b) => {
    if (priority === 'fastest') return a.durationMin - b.durationMin;
    if (priority === 'cheapest') return a.costInr - b.costInr;
    if (priority === 'greenest') return b.co2SavedKg - a.co2SavedKg;
    return b.ecoPointsEarned - a.ecoPointsEarned;
  });

  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(sortedRoutes[0]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/gemini/reroute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.insight) {
          setInsight(data.insight);
          return;
        }
      }
    } catch (err) {
      console.warn("API route notice (switching to client-side Gemini engine):", err);
    }

    try {
      const localInsight = await generateRerouteInsight(
        origin,
        destination,
        deadlockAnalysis.deadlockedNodes,
        deadlockAnalysis.cycles,
        INITIAL_INTERSECTION_GRAPH
      );
      setInsight(localInsight);
    } catch (err) {
      console.warn("Client Gemini synthesis notice:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="pb-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">
              Smart Journey <span className="text-cyan-400">Multimodal Planner</span>
            </h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
              Google Maps API &amp; Gemini AI
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Compare travel time, carbon emissions, and Banker&apos;s Safe-State gridlock risk across driving, metro, and carpooling.
          </p>
        </div>

        {/* Route Search Inputs */}
        <RouteSearchBar
          origin={origin}
          destination={destination}
          priority={priority}
          onOriginChange={setOrigin}
          onDestinationChange={setDestination}
          onPriorityChange={setPriority}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* Gemini AI Dynamic Directive Banner */}
        <GeminiInsightBanner insight={insight} isLoading={isLoading} />

        {/* Google Maps API Path Visualizer */}
        <GoogleMapVisualizer
          selectedRoute={selectedRoute}
          originId={origin}
          destinationId={destination}
          deadlockedNodes={deadlockAnalysis.deadlockedNodes}
        />

        {/* Multimodal Alternative Cards */}
        <MultimodalCards
          routes={sortedRoutes}
          onSelectRoute={(route) => setSelectedRoute(route)}
        />

      </div>
    </div>
  );
}
