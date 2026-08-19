'use client';

import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { INITIAL_INTERSECTION_GRAPH } from '@/lib/mockData';
import { detectDeadlockCycles } from '@/lib/cycleDetection';
import { IntersectionGraph, DeadlockCycleResult } from '@/types';
import { IntersectionGraphVisualizer } from '@/components/dashboard/IntersectionGraphVisualizer';
import { DeadlockAlertBanner } from '@/components/dashboard/DeadlockAlertBanner';
import { SpeedMatrixCard } from '@/components/dashboard/SpeedMatrixCard';
import { SimulationControls } from '@/components/dashboard/SimulationControls';
import { BankerSafeStateCard } from '@/components/dashboard/BankerSafeStateCard';
import { Activity, Radio, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const [graph, setGraph] = useState<IntersectionGraph>(INITIAL_INTERSECTION_GRAPH);
  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [preventedCount, setPreventedCount] = useState<number>(47);

  // Compute DFS cycle detection reactively
  const deadlockResult: DeadlockCycleResult = detectDeadlockCycles(graph);

  // Subscribe to real-time Firestore sync via onSnapshot
  useEffect(() => {
    if (!db) return;

    try {
      const docRef = doc(db, 'gridlock_state', 'current');
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists() && docSnap.data()?.intersectionGraph) {
            setGraph(docSnap.data().intersectionGraph);
            setIsFirestoreConnected(true);
          }
        },
        (error) => {
          console.warn("Firestore onSnapshot notice (local reactive mode active):", error.message);
          setIsFirestoreConnected(false);
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.warn("Firestore connection notice:", e);
    }
  }, []);

  // Helper to sync graph changes to Firestore
  const updateGraphState = async (newGraph: IntersectionGraph) => {
    setGraph(newGraph);
    if (db) {
      try {
        const docRef = doc(db, 'gridlock_state', 'current');
        const deadlockData = detectDeadlockCycles(newGraph);
        await setDoc(docRef, {
          intersectionGraph: newGraph,
          deadlockedNodes: deadlockData.deadlockedNodes,
          hasDeadlock: deadlockData.hasDeadlock,
          severityScore: deadlockData.severityScore,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        setIsFirestoreConnected(true);
      } catch (err) {
        console.warn("Firestore update notice:", err);
      }
    }
  };

  // 1. Trigger Mock Circular Wait Deadlock Cycle
  const handleTriggerDeadlock = () => {
    const deadlockGraph: IntersectionGraph = {
      ...graph,
      "OMR_Sholinganallur": { capacity: 40, currentLoad: 34, waitsFor: ["Kelambakkam_Jn"] },
      "Kelambakkam_Jn":     { capacity: 30, currentLoad: 28, waitsFor: ["Vengaivasal_Rd"] },
      "Vengaivasal_Rd":     { capacity: 25, currentLoad: 24, waitsFor: ["OMR_Sholinganallur"] }
    };
    updateGraphState(deadlockGraph);
  };

  // 2. Break Deadlock Cycle via Preemption
  const handleBreakDeadlock = () => {
    const resolvedGraph: IntersectionGraph = {
      ...graph,
      "Vengaivasal_Rd": { capacity: 25, currentLoad: 10, waitsFor: [] },
      "OMR_Sholinganallur": { capacity: 40, currentLoad: 18, waitsFor: [] },
      "Kelambakkam_Jn": { capacity: 30, currentLoad: 14, waitsFor: [] }
    };
    setPreventedCount(prev => prev + 1);
    updateGraphState(resolvedGraph);
  };

  // 3. Add Traffic Load
  const handleAddTraffic = () => {
    const updatedGraph = { ...graph };
    const targetNode = selectedNode || "OMR_Sholinganallur";
    if (updatedGraph[targetNode]) {
      updatedGraph[targetNode] = {
        ...updatedGraph[targetNode],
        currentLoad: Math.min(updatedGraph[targetNode].capacity + 10, updatedGraph[targetNode].currentLoad + 6)
      };
      updateGraphState(updatedGraph);
    }
  };

  // 4. Reset Graph
  const handleResetGraph = () => {
    updateGraphState(INITIAL_INTERSECTION_GRAPH);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">
                The <span className="text-emerald-400">Gridlock Engine</span> Dashboard
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-emerald-400 border border-emerald-800">
                <Radio className="w-3 h-3 animate-pulse" />
                {isFirestoreConnected ? 'Firestore Realtime Online' : 'Local RxJS Reactive Mode'}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Simulating urban traffic Resource Allocation Graph (RAG) and detecting circular wait deadlocks dynamically.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Gridlock Cycles Prevented Today:</span>
            <span className="font-bold text-amber-400 text-sm">{preventedCount}</span>
          </div>
        </div>

        {/* Deadlock Alert Banner */}
        <DeadlockAlertBanner
          result={deadlockResult}
          onBreakDeadlock={handleBreakDeadlock}
        />

        {/* Speed Matrix Metrics */}
        <SpeedMatrixCard result={deadlockResult} />

        {/* Banker's Safe State Simulator Card */}
        <BankerSafeStateCard graph={graph} />

        {/* Graph Visualizer Component */}
        <IntersectionGraphVisualizer
          graph={graph}
          deadlockedNodes={deadlockResult.deadlockedNodes}
          cycles={deadlockResult.cycles}
          onNodeSelect={setSelectedNode}
        />

        {/* Interactive Controls */}
        <SimulationControls
          onTriggerDeadlock={handleTriggerDeadlock}
          onBreakDeadlock={handleBreakDeadlock}
          onAddTraffic={handleAddTraffic}
          onResetGraph={handleResetGraph}
        />

      </div>
    </div>
  );
}
