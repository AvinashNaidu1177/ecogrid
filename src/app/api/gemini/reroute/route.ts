import { NextRequest, NextResponse } from 'next/server';
import { generateRerouteInsight } from '@/lib/gemini';
import { INITIAL_INTERSECTION_GRAPH } from '@/lib/mockData';
import { detectDeadlockCycles } from '@/lib/cycleDetection';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { origin = 'OMR_Sholinganallur', destination = 'Velachery_Jn', graph = INITIAL_INTERSECTION_GRAPH } = body;

    const deadlockAnalysis = detectDeadlockCycles(graph);

    const insight = await generateRerouteInsight(
      origin,
      destination,
      deadlockAnalysis.deadlockedNodes,
      deadlockAnalysis.cycles,
      graph
    );

    return NextResponse.json({
      success: true,
      insight,
      deadlockAnalysis
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
