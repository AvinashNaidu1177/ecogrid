'use client';

import React from 'react';
import { IntersectionGraph } from '@/types';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface VisualizerProps {
  graph: IntersectionGraph;
  deadlockedNodes: string[];
  cycles: string[][];
  onNodeSelect?: (nodeId: string) => void;
}

export function IntersectionGraphVisualizer({ graph, deadlockedNodes, cycles, onNodeSelect }: VisualizerProps) {
  const isNodeDeadlocked = (nodeId: string) => deadlockedNodes.includes(nodeId);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      {/* Visualizer Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Resource Allocation Graph (RAG) Map
          </h3>
          <p className="text-xs text-slate-400">Intersections (Nodes) & Directed Waits-For Dependencies (Edges)</p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Normal Flow
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/80 text-red-400 border border-red-800 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            Circular Wait Cycle
          </span>
        </div>
      </div>

      {/* Intersections Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(graph).map(([nodeId, node]) => {
          const deadlocked = isNodeDeadlocked(nodeId);
          const loadPercent = Math.min(100, Math.round((node.currentLoad / node.capacity) * 100));

          return (
            <div
              key={nodeId}
              onClick={() => onNodeSelect && onNodeSelect(nodeId)}
              className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                deadlocked
                  ? 'bg-gradient-to-b from-red-950/40 to-slate-950 border-red-500/80 shadow-lg shadow-red-500/20 ring-2 ring-red-500/30'
                  : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/60'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                    {deadlocked ? (
                      <ShieldAlert className="w-4 h-4 text-red-400 animate-bounce" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {nodeId.replace(/_/g, ' ')}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">Node ID: {nodeId}</span>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    deadlocked
                      ? 'bg-red-950 text-red-300 border border-red-800'
                      : loadPercent > 80
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {deadlocked ? 'CIRCULAR WAIT' : `${loadPercent}% LOAD`}
                </span>
              </div>

              {/* Load Capacity Bar */}
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Capacity Utilization</span>
                  <span className="font-bold text-slate-200">{node.currentLoad} / {node.capacity} Vehicles</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      deadlocked
                        ? 'bg-gradient-to-r from-red-500 to-violet-500'
                        : loadPercent > 80
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${loadPercent}%` }}
                  />
                </div>
              </div>

              {/* WaitsFor Directed Edges */}
              <div className="pt-3 border-t border-slate-800/80">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Directed Edge (waitsFor):
                </p>
                {node.waitsFor && node.waitsFor.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {node.waitsFor.map((target) => (
                      <span
                        key={target}
                        className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded ${
                          deadlocked && deadlockedNodes.includes(target)
                            ? 'bg-red-950/80 text-red-300 border border-red-700/60 animate-pulse'
                            : 'bg-slate-900 text-slate-300 border border-slate-800'
                        }`}
                      >
                        <span>➔</span>
                        <span>{target.replace(/_/g, ' ')}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[11px] font-mono text-emerald-400/80">None (Free Traffic Flow)</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cycle Graph Summary */}
      {cycles.length > 0 && (
        <div className="mt-6 p-4 rounded-2xl bg-red-950/30 border border-red-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-red-300 font-mono uppercase">Detected Circular Wait Chains:</p>
              <p className="text-xs font-mono text-red-400 mt-0.5">
                {cycles.map(c => c.join(' ➔ ')).join(' | ')}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono bg-red-900/60 text-red-200 px-3 py-1 rounded-full border border-red-700">
            Deadlock Active
          </span>
        </div>
      )}
    </div>
  );
}
