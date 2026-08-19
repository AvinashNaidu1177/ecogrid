export interface IntersectionNode {
  id?: string;
  capacity: number;
  currentLoad: number;
  waitsFor: string[];
}

export type IntersectionGraph = Record<string, IntersectionNode>;

export interface DeadlockCycleResult {
  hasDeadlock: boolean;
  cycles: string[][];
  deadlockedNodes: string[];
  severityScore: number; // 0 to 100
  averageSpeedKmH: number; // Normal ~45km/h, degrades during deadlock
  timestamp: string;
}

export interface BankerSafeStateResult {
  isSafe: boolean;
  safeSequence: string[];
  bottleneckNodes: string[];
  maxCapacityThreshold: number;
  explanation: string;
}

export type RoutePriority = 'fastest' | 'cheapest' | 'greenest' | 'balanced';

export interface CommuterUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isDemo?: boolean;
  ecoPoints: number;
  co2SavedKg: number;
  commuterTier: string;
}

export interface RouteOption {
  id: string;
  mode: 'car' | 'metro' | 'carpool' | 'bus' | 'bike' | 'walk';
  title: string;
  subTitle: string;
  durationMin: number;
  co2SavedKg: number;
  ecoPointsEarned: number;
  isRecommended: boolean;
  passesThroughDeadlock: boolean;
  isBankerSafeState: boolean;
  deadlockWarning?: string;
  path: string[];
  co2EmittedKg: number;
  costInr: number;
  walkingDistanceMeters?: number;
  transfersCount?: number;
}

export interface EmergencyAlert {
  id: string;
  type: 'gridlock_cycle' | 'accident' | 'road_closure' | 'flooding';
  title: string;
  location: string;
  severity: 'high' | 'critical' | 'moderate';
  affectedNodes: string[];
  suggestedAction: string;
  timestamp: string;
  status: 'active' | 'mitigated' | 'resolving';
}

export interface GeminiRerouteResponse {
  alertHeadline: string;
  deadlockExplanation: string;
  recommendedAction: string;
  timeSavingsMinutes: number;
  co2SavingsKg: number;
  gamifiedBadge: string;
}
