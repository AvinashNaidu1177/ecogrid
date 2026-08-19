import { IntersectionGraph, BankerSafeStateResult } from '@/types';
import { detectDeadlockCycles } from './cycleDetection';

/**
 * Banker's Algorithm Safe-State Checker
 * Evaluates whether adding vehicle load or routing a stream through specific nodes
 * maintains a SAFE STATE (i.e. guarantees a deadlock-free clearing sequence).
 * 
 * @param graph Current Resource Allocation Graph
 * @param proposedPath Array of node IDs requested by a vehicle stream
 * @param vehicleCount Number of vehicle units requesting access (default 1)
 */
export function checkBankerSafeState(
  graph: IntersectionGraph,
  proposedPath: string[] = [],
  vehicleCount: number = 1
): BankerSafeStateResult {
  // Create a deep copy of the graph to simulate allocation
  const simulatedGraph: IntersectionGraph = JSON.parse(JSON.stringify(graph));

  // 1. Simulate granting load to requested path nodes
  for (const nodeKey of proposedPath) {
    if (simulatedGraph[nodeKey]) {
      simulatedGraph[nodeKey].currentLoad += vehicleCount;
    }
  }

  // 2. Run cycle detection on simulated graph
  const cycleResult = detectDeadlockCycles(simulatedGraph);

  // 3. Find bottleneck nodes (> 85% capacity utilization)
  const bottleneckNodes: string[] = [];
  Object.entries(simulatedGraph).forEach(([nodeId, node]) => {
    if (node.currentLoad / node.capacity >= 0.85) {
      bottleneckNodes.push(nodeId);
    }
  });

  // 4. Simulate Banker's safe sequence discovery
  // Find a topological/capacity clearing sequence where available capacity can service node demands
  const safeSequence: string[] = [];
  const remainingNodes = new Set(Object.keys(simulatedGraph));
  let progressMade = true;

  while (remainingNodes.size > 0 && progressMade) {
    progressMade = false;
    for (const nodeId of Array.from(remainingNodes)) {
      const node = simulatedGraph[nodeId];
      // A node can clear if it has no outbound blocking waits or its target nodes are already cleared
      const waitsUnresolved = node.waitsFor.some(target => remainingNodes.has(target));
      const isOverCapacity = node.currentLoad > node.capacity;

      if (!waitsUnresolved && !isOverCapacity) {
        safeSequence.push(nodeId);
        remainingNodes.delete(nodeId);
        progressMade = true;
      }
    }
  }

  const isSafe = !cycleResult.hasDeadlock && remainingNodes.size === 0;

  let explanation = isSafe
    ? `SAFE STATE: Valid clearing sequence found (${safeSequence.map(n => n.replace(/_/g, ' ')).join(' ➔ ')}). Network will not deadlock.`
    : `UNSAFE STATE: Allocation creates circular wait or capacity overflow at ${bottleneckNodes.map(n => n.replace(/_/g, ' ')).join(', ')}. Gridlock risk!`;

  return {
    isSafe,
    safeSequence,
    bottleneckNodes,
    maxCapacityThreshold: 85,
    explanation
  };
}
