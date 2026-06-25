export type DoughStatus = 'PROOFING' | 'READY' | 'LATE' | 'OVERDUE';

export interface DoughRule {
  day: number;
  proofingHours: number;
  proofingLabel: string;
  coreTemp: string;
  lastOut: string;
}

export const DOUGH_RULES: DoughRule[] = [
  {
    day: 1,
    proofingHours: 5,
    proofingLabel: "5+ hours",
    coreTemp: "14-16",
    lastOut: "3-4 hours"
  },
  {
    day: 2,
    proofingHours: 4,
    proofingLabel: "4 hours",
    coreTemp: "10-13",
    lastOut: "2-3 hours"
  },
  {
    day: 3,
    proofingHours: 2,
    proofingLabel: "2 hours",
    coreTemp: "6-9",
    lastOut: "2-3 hours"
  },
  {
    day: 4,
    proofingHours: 1,
    proofingLabel: "30-60 mins",
    coreTemp: "3-5",
    lastOut: "1-2 hours"
  },
  {
    day: 5,
    proofingHours: 0.25, // 15 mins
    proofingLabel: "15 mins",
    coreTemp: "1-3",
    lastOut: "30-60 mins"
  },
  {
    day: 6,
    proofingHours: 0.08, // 5 mins
    proofingLabel: "1-3", // matches coreTemp
    coreTemp: "1-3",
    lastOut: "15-30 mins"
  }
];

export const PIZZA_SIZES = ['13"', '11"', '9"', '6"'] as const;
export type PizzaSize = typeof PIZZA_SIZES[number];

export type DoughInventory = Record<PizzaSize, Record<number, number>>;

export interface ShiftDetail {
  name: string;
  timeRange: string;
  startTime: string; // "10:00"
}

export const SHIFT_DETAILS: ShiftDetail[] = [
  { name: 'Lunch (11:00-13:00)', timeRange: '11:00-13:00', startTime: '11:00' },
  { name: 'Lunch (13:00-15:00)', timeRange: '13:00-15:00', startTime: '13:00' },
  { name: 'Rush (15:00-17:00)', timeRange: '15:00-17:00', startTime: '15:00' },
  { name: 'Rush (17:00-19:00)', timeRange: '17:00-19:00', startTime: '17:00' },
  { name: 'Late (19:00-21:00)', timeRange: '19:00-21:00', startTime: '19:00' },
  { name: 'Late (21:00-23:00)', timeRange: '21:00-23:00', startTime: '21:00' }
];

export type ShiftName = typeof SHIFT_DETAILS[number]['name'];

// Sales Split config
export interface Level1Splits {
  Lunch: number; // e.g. 20
  Rush: number; // e.g. 60
  Late: number; // e.g. 20
}

export interface Level2Splits {
  Lunch11_13: number;
  Lunch13_15: number;
  Rush15_17: number;
  Rush17_19: number;
  Late19_21: number;
  Late21_23: number;
}
