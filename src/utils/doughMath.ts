import { addMinutes, subMinutes, parse } from 'date-fns';
import { DOUGH_RULES, SHIFT_DETAILS, PIZZA_SIZES } from '../types';
import type { DoughRule, PizzaSize, Level1Splits, Level2Splits, DoughInventory } from '../types';

export function getRuleForAge(age: number): DoughRule {
  return DOUGH_RULES.find(r => r.day === age) || DOUGH_RULES[0];
}

export function getMaxOutMinutes(age: number): number {
  switch (age) {
    case 1: return 240; // 4 hours
    case 2: return 180; // 3 hours
    case 3: return 180; // 3 hours
    case 4: return 120; // 2 hours
    case 5: return 60;  // 60 mins
    case 6: return 30;  // 30 mins
    default: return 180;
  }
}

/**
 * Calculates the total sales split for each of the 6 shifts based on level 1 and level 2 splits.
 */
export function calculateTotalSalesSplit(level1: Level1Splits, level2: Level2Splits): Record<string, number> {
  return {
    'Lunch (11:00-13:00)': Math.round(level1.Lunch * (level2.Lunch11_13 / 100) * 10) / 10,
    'Lunch (13:00-15:00)': Math.round(level1.Lunch * (level2.Lunch13_15 / 100) * 10) / 10,
    'Rush (15:00-17:00)': Math.round(level1.Rush * (level2.Rush15_17 / 100) * 10) / 10,
    'Rush (17:00-19:00)': Math.round(level1.Rush * (level2.Rush17_19 / 100) * 10) / 10,
    'Late (19:00-21:00)': Math.round(level1.Late * (level2.Late19_21 / 100) * 10) / 10,
    'Late (21:00-23:00)': Math.round(level1.Late * (level2.Late21_23 / 100) * 10) / 10,
  };
}

export function getShiftReadyTime(_shiftName: string, startTime: string, dateStr: string): Date {
  const baseDate = parse(dateStr, 'yyyy-MM-dd', new Date());
  const [hours, minutes] = startTime.split(':');
  const readyTime = new Date(baseDate);
  readyTime.setHours(Number(hours), Number(minutes), 0, 0);
  return readyTime;
}

export function calculateTakeOutTime(readyTime: Date, age: number): Date {
  const rule = getRuleForAge(age);
  return subMinutes(readyTime, Math.round(rule.proofingHours * 60));
}

export function calculateExpiryTime(takeOutTime: Date, age: number): Date {
  const maxOutMins = getMaxOutMinutes(age);
  return addMinutes(takeOutTime, maxOutMins);
}

export interface AllocatedBatch {
  age: number;
  trays: number;
  takeOutTime: Date;
  expiryTime: Date;
}

export interface ShiftAllocationResult {
  traysNeeded: number;
  allocated: AllocatedBatch[];
  unfulfilled: number;
}

/**
 * Chronologically allocates dough requirements across shifts, depleting inventory oldest first (Day 6 down to Day 1).
 */
export function allocateInventoryForDay(
  dailyTotals: Record<PizzaSize, number>,
  shiftSplitsPercent: Record<string, number>, // shiftName -> percentage
  inventory: DoughInventory,
  dateStr: string
): Record<string, Record<PizzaSize, ShiftAllocationResult>> {
  const result = {} as Record<string, Record<PizzaSize, ShiftAllocationResult>>;
  
  // Deep clone inventory to track depletion chronologically
  const currentInventory = {} as DoughInventory;
  PIZZA_SIZES.forEach(size => {
    currentInventory[size] = { ...inventory[size] };
  });

  SHIFT_DETAILS.forEach(shift => {
    result[shift.name] = {} as Record<PizzaSize, ShiftAllocationResult>;
    const splitPercent = shiftSplitsPercent[shift.name] || 0;
    const readyTime = getShiftReadyTime(shift.name, shift.startTime, dateStr);

    PIZZA_SIZES.forEach(size => {
      const dailyTotal = dailyTotals[size] || 0;
      // Trays needed for this size during this shift
      const neededTrays = Math.round((dailyTotal * (splitPercent / 100)) * 10) / 10;
      
      const allocated: AllocatedBatch[] = [];
      let remaining = neededTrays;

      // Allocate oldest first (Day 6 down to 1) from the remaining currentInventory
      for (let age = 6; age >= 1; age--) {
        if (remaining <= 0) break;
        const available = currentInventory[size]?.[age] ?? 0;
        if (available > 0) {
          const traysToTake = Math.round(Math.min(remaining, available) * 10) / 10;
          if (traysToTake > 0) {
            const takeout = calculateTakeOutTime(readyTime, age);
            const expiry = calculateExpiryTime(takeout, age);
            allocated.push({
              age,
              trays: traysToTake,
              takeOutTime: takeout,
              expiryTime: expiry
            });
            currentInventory[size][age] = Math.round((currentInventory[size][age] - traysToTake) * 10) / 10;
            remaining = Math.round((remaining - traysToTake) * 10) / 10;
          }
        }
      }

      result[shift.name][size] = {
        traysNeeded: neededTrays,
        allocated,
        unfulfilled: remaining
      };
    });
  });

  return result;
}
