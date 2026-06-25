import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PIZZA_SIZES } from '../types';
import type { PizzaSize, DoughInventory, Level1Splits, Level2Splits } from '../types';

interface DoughState {
  date: string;
  dayOfWeek: string;
  projectedPizzas: number;
  inventory: DoughInventory;
  dailyTotals: Record<PizzaSize, number>;
  salesSplits: Level1Splits;
  shiftSplits: Level2Splits;
  isKitchenMode: boolean;
  
  // Actions
  setDate: (date: string) => void;
  setDayOfWeek: (day: string) => void;
  setProjectedPizzas: (count: number) => void;
  updateInventory: (size: PizzaSize, age: number, count: number) => void;
  updateDailyTotal: (size: PizzaSize, count: number) => void;
  updateLevel1Split: (field: keyof Level1Splits, val: number) => void;
  updateLevel2Split: (field: keyof Level2Splits, val: number) => void;
  toggleKitchenMode: () => void;
  clearAll: () => void;
}

const getInitialInventory = (): DoughInventory => {
  const inv = {} as any;
  PIZZA_SIZES.forEach(size => {
    inv[size] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  });
  return inv;
};

const getInitialDailyTotals = (): Record<PizzaSize, number> => {
  return {
    '6"': 0,
    '9"': 0,
    '11"': 0,
    '13"': 0
  };
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  const dayIndex = date.getDay(); // 0 is Sunday, 1 is Monday...
  const mapped = dayIndex === 0 ? 6 : dayIndex - 1;
  return daysOfWeek[mapped] || 'Monday';
};

export const useDoughStore = create<DoughState>()(
  persist(
    (set) => ({
      date: new Date().toISOString().split('T')[0],
      dayOfWeek: getDayName(new Date().toISOString().split('T')[0]),
      projectedPizzas: 500,
      isKitchenMode: false,
      inventory: getInitialInventory(),
      dailyTotals: getInitialDailyTotals(),
      salesSplits: {
        Lunch: 20,
        Rush: 60,
        Late: 20
      },
      shiftSplits: {
        Lunch: 90,
        Downtime: 10,
        EarlyRush: 40,
        LateRush: 60,
        LateNight: 70,
        Twilight: 30
      },

      setDate: (date) => set({
        date,
        dayOfWeek: getDayName(date)
      }),

      setDayOfWeek: (dayOfWeek) => set({ dayOfWeek }),

      setProjectedPizzas: (projectedPizzas) => set({ projectedPizzas }),

      updateInventory: (size, age, count) => set((state) => {
        const sizeInv = { ...state.inventory[size] };
        sizeInv[age] = count;
        return {
          inventory: {
            ...state.inventory,
            [size]: sizeInv
          }
        };
      }),

      updateDailyTotal: (size, count) => set((state) => {
        return {
          dailyTotals: {
            ...state.dailyTotals,
            [size]: count
          }
        };
      }),

      updateLevel1Split: (field, val) => set((state) => ({
        salesSplits: {
          ...state.salesSplits,
          [field]: val
        }
      })),

      updateLevel2Split: (field, val) => set((state) => ({
        shiftSplits: {
          ...state.shiftSplits,
          [field]: val
        }
      })),

      toggleKitchenMode: () => set((state) => ({ isKitchenMode: !state.isKitchenMode })),

      clearAll: () => set({
        projectedPizzas: 500,
        inventory: getInitialInventory(),
        dailyTotals: getInitialDailyTotals(),
        salesSplits: {
          Lunch: 20,
          Rush: 60,
          Late: 20
        },
        shiftSplits: {
          Lunch: 90,
          Downtime: 10,
          EarlyRush: 40,
          LateRush: 60,
          LateNight: 70,
          Twilight: 30
        }
      })
    }),
    {
      name: 'dough-sheets-storage'
    }
  )
);
