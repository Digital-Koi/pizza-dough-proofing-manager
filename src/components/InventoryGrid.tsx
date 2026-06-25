import { useDoughStore } from '../store/useDoughStore';
import { PIZZA_SIZES } from '../types';

export default function InventoryGrid() {
  const { inventory, updateInventory } = useDoughStore();

  const ageColors = {
    1: 'text-red-500',
    2: 'text-amber-500',
    3: 'text-emerald-500',
    4: 'text-cyan-500',
    5: 'text-green-600',
    6: 'text-orange-500',
  };

  return (
    <div className="w-full border-2 border-[#e31837]/50 bg-[#0f111a] rounded-xl overflow-hidden shadow-md">
      {/* Title Header */}
      <div className="bg-[#e31837] text-white text-center font-black py-2.5 border-b border-[#e31837]/30 text-sm tracking-wider uppercase">
        Dough Available In Store
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs text-center">
          <thead>
            {/* Age Group Spanning Header */}
            <tr className="bg-slate-900 border-b border-slate-700 text-[10px] font-black uppercase text-slate-400">
              <th className="border-r border-slate-700 w-24"></th>
              <th colSpan={6} className="py-1 tracking-widest text-center text-slate-300">
                Dough Age (Days)
              </th>
            </tr>
            {/* Days header row */}
            <tr className="bg-slate-800/80 border-b-2 border-slate-700 text-slate-200 font-bold">
              <th className="border-r border-slate-700 py-2 w-24">Dough Size</th>
              {[1, 2, 3, 4, 5, 6].map((age) => (
                <th key={age} className={`border-r border-slate-700 py-2 w-16 text-base ${ageColors[age as keyof typeof ageColors] || 'text-white'}`}>
                  {age}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PIZZA_SIZES.map((size) => (
              <tr key={size} className="border-b border-slate-700 hover:bg-white/[0.01]">
                {/* Size Row Header */}
                <td className="bg-[#e6f0fa] text-[#0060a9] font-black border-r border-slate-700 py-3 w-24 text-sm">
                  {size}
                </td>
                {/* Inventory Cells */}
                {[1, 2, 3, 4, 5, 6].map((age) => {
                  const val = inventory[size]?.[age] ?? 0;
                  return (
                    <td key={age} className="border-r border-slate-700 p-1 w-16">
                      <input
                        type="number"
                        min="0"
                        max="200"
                        value={val === 0 ? '' : val}
                        placeholder="-"
                        onChange={(e) => {
                          const num = e.target.value === '' ? 0 : Math.max(0, Number(e.target.value));
                          updateInventory(size, age, num);
                        }}
                        className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0 text-sm py-1.5 placeholder-slate-600"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
