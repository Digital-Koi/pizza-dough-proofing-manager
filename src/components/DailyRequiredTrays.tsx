import { useDoughStore } from '../store/useDoughStore';
import { PIZZA_SIZES } from '../types';

export default function DailyRequiredTrays() {
  const { dailyTotals, updateDailyTotal } = useDoughStore();

  return (
    <div className="w-full border-2 border-[#e31837]/40 bg-[#0f111a] rounded-xl overflow-hidden shadow-md">
      {/* Title Header */}
      <div className="bg-[#e31837] text-white text-center font-black py-2.5 border-b-2 border-[#0060a9] text-sm tracking-wider uppercase">
        Daily Required Trays
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs text-center">
          <thead>
            <tr className="bg-slate-800/80 border-b-2 border-slate-700 text-slate-200 font-bold">
              <th className="border-r border-slate-700 py-2 w-1/2">Pizza Size</th>
              <th className="py-2 w-1/2">Total Needed for Day (Trays)</th>
            </tr>
          </thead>
          <tbody>
            {PIZZA_SIZES.map((size) => {
              const val = dailyTotals[size] ?? 0;
              return (
                <tr key={size} className="border-b border-slate-700 hover:bg-white/[0.01]">
                  {/* Size Row Header */}
                  <td className="bg-[#e6f0fa] text-[#0060a9] font-black border-r border-slate-700 py-3 text-sm">
                    {size}
                  </td>
                  {/* Daily Required Input Cell */}
                  <td className="p-1">
                    <input
                      type="number"
                      min="0"
                      max="500"
                      value={val === 0 ? '' : val}
                      placeholder="-"
                      onChange={(e) => {
                        const num = e.target.value === '' ? 0 : Math.max(0, Number(e.target.value));
                        updateDailyTotal(size, num);
                      }}
                      className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0 text-base py-1 placeholder-slate-650"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
