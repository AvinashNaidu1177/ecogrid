import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiRerouteResponse, IntersectionGraph } from '@/types';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function generateRerouteInsight(
  origin: string,
  destination: string,
  deadlockedNodes: string[],
  cycles: string[][],
  graph: IntersectionGraph
): Promise<GeminiRerouteResponse> {
  const hasActiveDeadlock = deadlockedNodes.length > 0;
  const cycleDesc = cycles.map(c => c.join(' ➔ ')).join(' | ');

  const systemPrompt = `You are EcoGrid's AI Traffic Operating System engine.
You treat urban gridlock strictly as an Operating System Deadlock (Circular Wait in a Resource Allocation Graph).
Analyze the traffic condition:
- Origin: ${origin}
- Destination: ${destination}
- Active Circular Wait Cycles: ${hasActiveDeadlock ? cycleDesc : 'None detected'}
- Deadlocked Intersections: ${deadlockedNodes.join(', ') || 'None'}

Generate a short, high-impact JSON response with key fields:
1. alertHeadline (e.g. "CRITICAL DEADLOCK ALERT: OMR Sholinganallur Circular Wait")
2. deadlockExplanation (Explain the OS deadlock circular wait between nodes in concise technical terms)
3. recommendedAction (Specify exact multimodal alternative e.g. "Gemini recommends Park-and-Ride Metro via Velachery Terminal")
4. timeSavingsMinutes (number e.g. 45)
5. co2SavingsKg (number e.g. 2.4)
6. gamifiedBadge (e.g. "⚡ Deadlock Evader +150 PTS")

Respond ONLY with valid JSON without markdown wrapping.`;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const response = await model.generateContent(systemPrompt);

      const text = response.response.text() || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      return {
        alertHeadline: parsed.alertHeadline || "ECOGRID AI MULTIMODAL DIRECTIVE",
        deadlockExplanation: parsed.deadlockExplanation || "Circular wait detected between OMR_Sholinganallur and Kelambakkam_Jn.",
        recommendedAction: parsed.recommendedAction || "Switch to Park-and-Ride Metro at Velachery Terminal.",
        timeSavingsMinutes: Number(parsed.timeSavingsMinutes) || 45,
        co2SavingsKg: Number(parsed.co2SavingsKg) || 2.4,
        gamifiedBadge: parsed.gamifiedBadge || "⚡ Deadlock Evader +150 PTS"
      };
    } catch (err) {
      console.warn("Gemini API call notice (falling back to EcoGrid Engine synthesis):", err);
    }
  }

  // Smart Fallback Synthesis when API key is pending
  return {
    alertHeadline: hasActiveDeadlock 
      ? `CRITICAL CIRCULAR WAIT ALERT: ${deadlockedNodes[0] || 'OMR'} CORRIDOR`
      : `ECOGRID OPTIMAL Eco-ROUTE DIRECTIVE`,
    deadlockExplanation: hasActiveDeadlock
      ? `Resource Allocation Graph shows Circular Wait: ${cycleDesc || 'OMR_Sholinganallur ➔ Kelambakkam_Jn ➔ Vengaivasal_Rd ➔ OMR_Sholinganallur'}. Intersection capacity exhausted.`
      : `Traffic graph flow is nominal. Capacity load operating within standard limits.`,
    recommendedAction: hasActiveDeadlock
      ? `Gemini AI recommends avoiding ${deadlockedNodes[0] || 'OMR'} by taking the Park-and-Ride Metro from Velachery Station.`
      : `Take Direct Drive or Green Carpool for lowest travel friction.`,
    timeSavingsMinutes: hasActiveDeadlock ? 42 : 12,
    co2SavingsKg: hasActiveDeadlock ? 2.6 : 0.8,
    gamifiedBadge: hasActiveDeadlock ? "⚡ Deadlock Evader +150 PTS" : "🌱 Eco Pioneer +50 PTS"
  };
}
