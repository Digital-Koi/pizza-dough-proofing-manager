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

export const PIZZA_SIZES = ['6"', '9"', '11"', '13"'] as const;
export type PizzaSize = typeof PIZZA_SIZES[number];

export type DoughInventory = Record<PizzaSize, Record<number, number>>;

export interface ShiftDetail {
  name: string;
  timeRange: string;
  startTime: string; // "10:00"
}

export const SHIFT_DETAILS: ShiftDetail[] = [
  { name: 'Lunch', timeRange: '10am - 1pm', startTime: '10:00' },
  { name: 'Downtime', timeRange: '1pm - 3pm', startTime: '13:00' },
  { name: 'Early Rush', timeRange: '3pm - 6pm', startTime: '15:00' },
  { name: 'Late Rush', timeRange: '6pm - 10pm', startTime: '18:00' },
  { name: 'Late Night', timeRange: '10pm - 1am', startTime: '22:00' },
  { name: 'Twilight', timeRange: '1am - 5am', startTime: '01:00' }
];

export type ShiftName = typeof SHIFT_DETAILS[number]['name'];

// Sales Split config
export interface Level1Splits {
  Lunch: number; // e.g. 20
  Rush: number; // e.g. 60
  Late: number; // e.g. 20
}

export interface Level2Splits {
  Lunch: number; // 90
  Downtime: number; // 10
  EarlyRush: number; // 40
  LateRush: number; // 60
  LateNight: number; // 70
  Twilight: number; // 30
}
