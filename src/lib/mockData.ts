import { IntersectionGraph, RouteOption, EmergencyAlert } from '@/types';

// Initial Mock Intersection Graph as specced in PRD Section 8A & Section 30
export const INITIAL_INTERSECTION_GRAPH: IntersectionGraph = {
  "OMR_Sholinganallur": { id: "OMR_Sholinganallur", capacity: 40, currentLoad: 34, waitsFor: ["Kelambakkam_Jn"] },
  "Kelambakkam_Jn":     { id: "Kelambakkam_Jn", capacity: 30, currentLoad: 28, waitsFor: ["Vengaivasal_Rd"] },
  "Vengaivasal_Rd":     { id: "Vengaivasal_Rd", capacity: 25, currentLoad: 24, waitsFor: ["OMR_Sholinganallur"] }, // Triggers circular wait cycle
  "Velachery_Jn":       { id: "Velachery_Jn", capacity: 50, currentLoad: 15, waitsFor: [] },
  "Guindy_Hub":         { id: "Guindy_Hub", capacity: 60, currentLoad: 20, waitsFor: ["Velachery_Jn"] },
  "Medavakkam_Jn":      { id: "Medavakkam_Jn", capacity: 35, currentLoad: 18, waitsFor: [] }
};

export const RESOLVED_INTERSECTION_GRAPH: IntersectionGraph = {
  "OMR_Sholinganallur": { id: "OMR_Sholinganallur", capacity: 40, currentLoad: 18, waitsFor: [] },
  "Kelambakkam_Jn":     { id: "Kelambakkam_Jn", capacity: 30, currentLoad: 14, waitsFor: [] },
  "Vengaivasal_Rd":     { id: "Vengaivasal_Rd", capacity: 25, currentLoad: 10, waitsFor: [] },
  "Velachery_Jn":       { id: "Velachery_Jn", capacity: 50, currentLoad: 15, waitsFor: [] },
  "Guindy_Hub":         { id: "Guindy_Hub", capacity: 60, currentLoad: 20, waitsFor: [] },
  "Medavakkam_Jn":      { id: "Medavakkam_Jn", capacity: 35, currentLoad: 18, waitsFor: [] }
};

export const HOTSPOT_LOCATIONS = [
  { id: 'OMR_Sholinganallur', name: 'OMR Sholinganallur Tech Corridor', lat: 12.9010, lng: 80.2279 },
  { id: 'Kelambakkam_Jn', name: 'Kelambakkam Junction', lat: 12.7845, lng: 80.2223 },
  { id: 'Vengaivasal_Rd', name: 'Vengaivasal Main Road', lat: 12.9098, lng: 80.1702 },
  { id: 'Velachery_Jn', name: 'Velachery Metro Terminal', lat: 12.9782, lng: 80.2206 },
  { id: 'Guindy_Hub', name: 'Guindy Multimodal Transit Hub', lat: 13.0067, lng: 80.2021 },
  { id: 'Medavakkam_Jn', name: 'Medavakkam Expressway', lat: 12.9174, lng: 80.1923 }
];

export const MOCK_ROUTE_OPTIONS: RouteOption[] = [
  {
    id: 'route-bike-metro-walk',
    mode: 'metro',
    title: '🚲 Bike ➔ 🚇 Metro ➔ 🚶 Walk (Recommended)',
    subTitle: 'First-mile e-bike to Sholinganallur Station • Express Blue Line • 300m Walk',
    durationMin: 38,
    co2SavedKg: 4.2,
    co2EmittedKg: 0.6,
    costInr: 35,
    ecoPointsEarned: 180,
    isRecommended: true,
    passesThroughDeadlock: false,
    isBankerSafeState: true,
    walkingDistanceMeters: 400,
    transfersCount: 1,
    path: ['Medavakkam_Jn', 'Velachery_Jn', 'Guindy_Hub']
  },
  {
    id: 'route-eco-carpool',
    mode: 'carpool',
    title: '⚡ Shared EV Shuttle Express',
    subTitle: 'Dedicated HOV Lane via Medavakkam Expressway',
    durationMin: 42,
    co2SavedKg: 3.1,
    co2EmittedKg: 1.2,
    costInr: 60,
    ecoPointsEarned: 110,
    isRecommended: false,
    passesThroughDeadlock: false,
    isBankerSafeState: true,
    walkingDistanceMeters: 150,
    transfersCount: 0,
    path: ['Medavakkam_Jn', 'Velachery_Jn']
  },
  {
    id: 'route-direct-car',
    mode: 'car',
    title: '🚗 Direct Driving (Private Car)',
    subTitle: 'Via OMR Expressway Main Arterial • Single Occupancy Petrol Vehicle',
    durationMin: 74,
    co2SavedKg: 0,
    co2EmittedKg: 4.8,
    costInr: 140,
    ecoPointsEarned: 0,
    isRecommended: false,
    passesThroughDeadlock: true,
    isBankerSafeState: false,
    deadlockWarning: '🔴 WARNING: Trapped in OMR Sholinganallur Circular Wait Loop (OMR ➔ Kelambakkam ➔ Vengaivasal ➔ OMR)',
    path: ['OMR_Sholinganallur', 'Kelambakkam_Jn', 'Vengaivasal_Rd']
  },
  {
    id: 'route-express-bus',
    mode: 'bus',
    title: '🚌 Bus Rapid Transit (BRT-4)',
    subTitle: 'Low-emission AC City Bus via Dedicated Bus Lane',
    durationMin: 46,
    co2SavedKg: 2.8,
    co2EmittedKg: 1.4,
    costInr: 25,
    ecoPointsEarned: 95,
    isRecommended: false,
    passesThroughDeadlock: false,
    isBankerSafeState: true,
    walkingDistanceMeters: 250,
    transfersCount: 0,
    path: ['Guindy_Hub', 'Velachery_Jn']
  }
];

export const INITIAL_EMERGENCY_ALERTS: EmergencyAlert[] = [
  {
    id: 'alert-1',
    type: 'gridlock_cycle',
    title: 'Circular Wait Deadlock Cycle Detected',
    location: 'OMR ➔ Kelambakkam Rd ➔ Sholinganallur Jn',
    severity: 'critical',
    affectedNodes: ['OMR_Sholinganallur', 'Kelambakkam_Jn', 'Vengaivasal_Rd'],
    suggestedAction: 'Deny new route allocations on OMR Corridor & trigger signal retiming phase #4 (Release Valve)',
    timestamp: 'Just Now',
    status: 'active'
  },
  {
    id: 'alert-2',
    type: 'accident',
    title: 'Multi-vehicle Minor Collision',
    location: 'Medavakkam Flyover Ramp South',
    severity: 'high',
    affectedNodes: ['Medavakkam_Jn'],
    suggestedAction: 'Dispatch towing unit & divert bus line #19B to inner service lane',
    timestamp: '12 min ago',
    status: 'active'
  },
  {
    id: 'alert-3',
    type: 'flooding',
    title: 'Monsoon Waterlogging Early Warning',
    location: 'Velachery Railway Underpass',
    severity: 'moderate',
    affectedNodes: ['Velachery_Jn'],
    suggestedAction: 'Activate stormwater pumps & alert commuters to use elevated metro walkway',
    timestamp: '25 min ago',
    status: 'mitigated'
  }
];
