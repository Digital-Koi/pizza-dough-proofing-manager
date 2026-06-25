import { useDoughStore } from '../store/useDoughStore';
import { calculateTotalSalesSplit, allocateInventoryForDay, getRuleForAge } from '../utils/doughMath';
import { format } from 'date-fns';
import type { PizzaSize } from '../types';

export default function HourlyBreakdown() {
  const { date, inventory, dailyTotals, salesSplits, shiftSplits } = useDoughStore();

  const totalSplits = calculateTotalSalesSplit(salesSplits, shiftSplits);
  const allocationResult = allocateInventoryForDay(dailyTotals, totalSplits, inventory, date);

  interface TakeoutItem {
    time: string;
    size: PizzaSize;
    age: number;
    trays: number;
    dateTime: Date;
  }

  const items: TakeoutItem[] = [];

  Object.entries(allocationResult).forEach(([_, shiftAlloc]) => {
    Object.entries(shiftAlloc).forEach(([size, result]) => {
      result.allocated.forEach((batch) => {
        items.push({
          time: format(batch.takeOutTime, 'HH:mm'),
          size: size as PizzaSize,
          age: batch.age,
          trays: batch.trays,
          dateTime: batch.takeOutTime,
        });
      });
    });
  });

  // Sort items by exact time ascending
  items.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

  // Hours range from 06:00 to 21:00
  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6 to 21

  return (
    <div className="w-full border-2 border-[#e31837]/50 bg-[#0f111a] rounded-xl overflow-hidden shadow-md">
      {/* Title Header */}
      <div className="bg-[#e31837] text-white text-center font-black py-2.5 border-b-2 border-slate-700 text-sm tracking-wider uppercase">
        Hourly Dough Takeout Breakdown
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs text-left">
          <thead>
            <tr className="bg-slate-800/80 border-b-2 border-slate-700 text-slate-200 font-bold text-center">
              <th className="py-2.5 px-4 w-28 border-r border-slate-700">Hour</th>
              <th className="py-2.5 px-4 w-32 border-r border-slate-700">Takeout Time</th>
              <th className="py-2.5 px-4 w-32 border-r border-slate-700">Dough Size</th>
              <th className="py-2.5 px-4 w-32 border-r border-slate-700">Trays to Pull</th>
              <th className="py-2.5 px-4 w-36 border-r border-slate-700">Dough Age</th>
              <th className="py-2.5 px-4 text-left">Proofing Target & Core Temp</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => {
              const hourStr = `${hour.toString().padStart(2, '0')}:00`;
              // Get all items that fall within this hour (e.g. 10:00 to 10:59)
              const hourItems = items.filter((item) => item.dateTime.getHours() === hour);

              if (hourItems.length === 0) {
                return (
                  <tr key={hour} className="border-b border-slate-700 hover:bg-white/[0.01]">
                    <td className="py-3 px-4 font-black text-slate-400 text-center border-r border-slate-700 bg-slate-950/10">
                      {hourStr}
                    </td>
                    <td colSpan={5} className="py-3 px-4 text-slate-500 italic font-semibold text-center sm:text-left">
                      None
                    </td>
                  </tr>
                );
              }

              return hourItems.map((item, idx) => {
                const rule = getRuleForAge(item.age);
                return (
                  <tr key={`${hour}-${item.size}-${item.age}-${idx}`} className="border-b border-slate-700 hover:bg-white/[0.01]">
                    {idx === 0 ? (
                      <td
                        rowSpan={hourItems.length}
                        className="py-3 px-4 font-black text-white text-center border-r border-slate-700 bg-slate-950/20 align-middle text-sm"
                      >
                        {hourStr}
                      </td>
                    ) : null}
                    <td className="py-3 px-4 font-extrabold text-yellow-400 text-sm text-center border-r border-slate-700">
                      {item.time}
                    </td>
                    <td className="py-3 px-4 font-black text-[#e6f0fa] text-center border-r border-slate-700">
                      {item.size}
                    </td>
                    <td className="py-3 px-4 font-black text-emerald-400 text-sm text-center border-r border-slate-700">
                      {item.trays.toFixed(1)} Trays
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-300 text-center border-r border-slate-700">
                      Day {item.age}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-semibold text-left">
                      {rule.proofingLabel} proofing (Target: {rule.coreTemp}°C)
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
