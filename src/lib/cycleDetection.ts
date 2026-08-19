import { IntersectionGraph, DeadlockCycleResult } from '@/types';

/**
 * Depth-First Search (DFS) Cycle Detection in a Resource Allocation Graph (RAG)
 * Models city traffic intersections as nodes and directed `waitsFor` dependencies as edges.
 */
export function detectDeadlockCycles(graph: IntersectionGraph): DeadlockCycleResult {
  const visited = new Set<string>();
  const recStack = new Set<string>();
  const path: string[] = [];
  const detectedCycles: string[][] = [];

  function dfs(node: string) {
    visited.add(node);
    recStack.add(node);
    path.push(node);

    const currentNode = graph[node];
    if (currentNode && currentNode.waitsFor) {
      for (const neighbor of currentNode.waitsFor) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        } else if (recStack.has(neighbor)) {
          // Found a cycle! Extract cycle path from neighbor onwards
          const cycleStartIndex = path.indexOf(neighbor);
          if (cycleStartIndex !== -1) {
            const cyclePath = path.slice(cycleStartIndex);
            // Check if this cycle is already captured (avoid duplicate permutations)
            const isDuplicate = detectedCycles.some(existingCycle => 
              existingCycle.length === cyclePath.length &&
              cyclePath.every(n => existingCycle.includes(n))
            );
            if (!isDuplicate) {
              detectedCycles.push(cyclePath);
            }
          }
        }
      }
    }

    recStack.delete(node);
    path.pop();
  }

  // Run DFS for all nodes in graph
  for (const nodeKey of Object.keys(graph)) {
    if (!visited.has(nodeKey)) {
      dfs(nodeKey);
    }
  }

  const deadlockedNodes = Array.from(
    new Set(detectedCycles.flat())
  );

  const hasDeadlock = detectedCycles.length > 0;

  // Calculate gridlock severity score & speed degradation
  let totalCapacity = 0;
  let totalLoad = 0;

  Object.values(graph).forEach(node => {
    totalCapacity += node.capacity;
    totalLoad += node.currentLoad;
  });

  const loadRatio = totalCapacity > 0 ? (totalLoad / totalCapacity) : 0;
  const baseSeverity = Math.min(100, Math.round(loadRatio * 75));
  const deadlockBonus = hasDeadlock ? (detectedCycles.length * 20) : 0;
  const severityScore = Math.min(100, baseSeverity + deadlockBonus);

  // Speed calculation: Normal 45 km/h, degraded drastically by circular wait
  const normalSpeed = 45;
  const speedReduction = hasDeadlock 
    ? (0.80 + (severityScore / 100) * 0.15) 
    : (loadRatio * 0.40);
  
  const averageSpeedKmH = Math.max(3.5, Math.round((normalSpeed * (1 - speedReduction)) * 10) / 10);

  return {
    hasDeadlock,
    cycles: detectedCycles,
    deadlockedNodes,
    severityScore,
    averageSpeedKmH,
    timestamp: new Date().toISOString()
  };
}
