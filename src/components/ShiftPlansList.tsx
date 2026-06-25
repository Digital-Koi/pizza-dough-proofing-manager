import { useDoughStore } from '../store/useDoughStore';
import { PIZZA_SIZES, SHIFT_DETAILS } from '../types';
import { calculateTotalSalesSplit, allocateInventoryForDay } from '../utils/doughMath';
import { format } from 'date-fns';

export default function ShiftPlansList() {
  const { date, inventory, dailyTotals, salesSplits, shiftSplits } = useDoughStore();

  const totalSplits = calculateTotalSalesSplit(salesSplits, shiftSplits);
  const allocationResult = allocateInventoryForDay(dailyTotals, totalSplits, inventory, date);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {SHIFT_DETAILS.map((shift) => {
        const shiftAlloc = allocationResult[shift.name] || {};

        return (
          <div key={shift.name} className="w-full border-2 border-[#0060a9]/50 bg-[#0f111a] rounded-xl overflow-hidden shadow-md">
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs text-center">
                <thead>
                  {/* Header Row showing the Shift time range on the left and sizes */}
                  <tr className="bg-[#0060a9] text-white font-black text-sm">
                    {/* Shift Time Range on the left */}
                    <th className="border-r border-slate-750 py-3 w-28 text-[#0060a9] bg-[#e6f0fa] font-black uppercase text-xs">
                      {shift.timeRange}
                    </th>
                    {PIZZA_SIZES.map((size) => (
                      <th key={size} className="border-r border-slate-750 py-3 w-24">
                        {size.replace('"', '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  
                  {/* Row 1: trays */}
                  <tr className="border-b border-slate-750">
                    <td className="bg-slate-950/20 text-[#1f4e79] font-extrabold border-r border-slate-750 py-3 text-xs uppercase tracking-wider">
                      trays
                    </td>
                    {PIZZA_SIZES.map((size) => {
                      const result = shiftAlloc[size] || { traysNeeded: 0 };
                      return (
                        <td key={size} className="border-r border-slate-750 py-3 font-extrabold text-slate-100 text-sm">
                          {result.traysNeeded > 0 ? result.traysNeeded.toFixed(1) : '0.0'}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row 2: age */}
                  <tr className="border-b border-slate-750">
                    <td className="bg-slate-950/20 text-[#1f4e79] font-extrabold border-r border-slate-750 py-3 text-xs uppercase tracking-wider">
                      age
                    </td>
                    {PIZZA_SIZES.map((size) => {
                      const result = shiftAlloc[size] || { allocated: [] };
                      let ageText = '-';
                      if (result.allocated.length > 0) {
                        ageText = result.allocated
                          .map((b) => result.allocated.length > 1 ? `Day ${b.age} (${b.trays})` : `Day ${b.age}`)
                          .join(', ');
                      }
                      return (
                        <td key={size} className="border-r border-slate-750 py-3 font-bold text-slate-350 text-xs">
                          {ageText}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row 3: time out */}
                  <tr className="border-b border-slate-750">
                    <td className="bg-slate-950/20 text-[#1f4e79] font-extrabold border-r border-slate-750 py-3 text-xs uppercase tracking-wider">
                      time out
                    </td>
                    {PIZZA_SIZES.map((size) => {
                      const result = shiftAlloc[size] || { allocated: [] };
                      let timeText = '-';
                      if (result.allocated.length > 0) {
                        timeText = result.allocated.map((b) => format(b.takeOutTime, 'HH:mm')).join(', ');
                      }
                      return (
                        <td key={size} className="border-r border-slate-750 py-3 font-extrabold text-yellow-400 text-sm">
                          {timeText}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row 4: ready at */}
                  <tr>
                    <td className="bg-slate-950/20 text-[#1f4e79] font-extrabold border-r border-slate-750 py-3 text-xs uppercase tracking-wider">
                      ready at
                    </td>
                    {PIZZA_SIZES.map((size) => {
                      const result = shiftAlloc[size] || { traysNeeded: 0 };
                      return (
                        <td key={size} className="border-r border-slate-750 py-3 font-bold text-slate-300 text-xs">
                          {result.traysNeeded > 0 ? shift.startTime : '-'}
                        </td>
                      );
                    })}
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        );
      })}
    </div>
  );
}
