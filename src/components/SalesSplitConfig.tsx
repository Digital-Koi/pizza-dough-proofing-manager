import { useDoughStore } from '../store/useDoughStore';
import { calculateTotalSalesSplit } from '../utils/doughMath';

export default function SalesSplitConfig() {
  const {
    projectedPizzas,
    setProjectedPizzas,
    salesSplits,
    updateLevel1Split,
    shiftSplits,
    updateLevel2Split
  } = useDoughStore();

  const totalSplits = calculateTotalSalesSplit(salesSplits, shiftSplits);

  // Sum checks
  const sumLevel1 = salesSplits.Lunch + salesSplits.Rush + salesSplits.Late;
  const sumLunchGroup = shiftSplits.Lunch + shiftSplits.Downtime;
  const sumRushGroup = shiftSplits.EarlyRush + shiftSplits.LateRush;
  const sumLateGroup = shiftSplits.LateNight + shiftSplits.Twilight;

  return (
    <div className="w-full border-2 border-[#0060a9]/60 bg-[#0f111a] rounded-xl overflow-hidden shadow-md space-y-4">
      {/* Title Header */}
      <div className="bg-[#0060a9] text-white text-center font-black py-2.5 border-b-2 border-[#e31837] text-sm tracking-wider uppercase flex justify-between px-4 items-center">
        <span>Sales Split Configurations</span>
        
        {/* Total Sales pizzas multiplier */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-bold text-slate-600">Projected Pizzas:</span>
          <input
            type="number"
            min="10"
            max="3000"
            value={projectedPizzas}
            onChange={(e) => setProjectedPizzas(Math.max(10, Number(e.target.value)))}
            className="w-16 bg-slate-900 border border-slate-650 text-white rounded text-center py-1 font-black text-sm"
          />
        </div>
      </div>

      <div className="p-4 space-y-6 text-xs text-center font-outfit">
        {/* 1. Sales Split % (Level 1) */}
        <div className="space-y-1">
          <div className="bg-slate-900 border border-slate-700 py-1.5 font-bold uppercase text-[10px] text-slate-350 tracking-wider">
            Sales Split %
          </div>
          <table className="w-full border border-slate-700 text-center text-slate-200">
            <thead>
              <tr className="bg-slate-800 border-b border-slate-700 text-[10px] font-bold text-slate-350">
                <th className="border-r border-slate-700 py-1.5 w-1/3">Lunch</th>
                <th className="border-r border-slate-700 py-1.5 w-1/3">Rush</th>
                <th className="py-1.5 w-1/3">Late</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r border-slate-700 p-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={salesSplits.Lunch}
                    onChange={(e) => updateLevel1Split('Lunch', Math.max(0, Number(e.target.value)))}
                    className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0 text-sm"
                  />
                </td>
                <td className="border-r border-slate-700 p-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={salesSplits.Rush}
                    onChange={(e) => updateLevel1Split('Rush', Math.max(0, Number(e.target.value)))}
                    className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0 text-sm"
                  />
                </td>
                <td className="p-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={salesSplits.Late}
                    onChange={(e) => updateLevel1Split('Late', Math.max(0, Number(e.target.value)))}
                    className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0 text-sm"
                  />
                </td>
              </tr>
              <tr className={`border-t border-slate-700 font-bold uppercase text-[9px] ${
                sumLevel1 === 100 ? 'text-emerald-400 bg-emerald-950/10' : 'text-red-400 bg-red-950/10'
              }`}>
                <td colSpan={3} className="py-1">
                  Total Split: {sumLevel1}% {sumLevel1 === 100 ? '(OK)' : '(Must equal 100%)'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2. Sales Divide (Level 2) */}
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-700 py-1.5 font-bold uppercase text-[10px] text-slate-350 tracking-wider">
            Sales Divide (Shift Splits)
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Lunch splits */}
            <div className="border border-slate-700 rounded overflow-hidden">
              <div className="bg-slate-800 border-b border-slate-700 py-1 font-bold text-slate-350">
                Lunch (Time splits)
              </div>
              <table className="w-full text-slate-200">
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 text-left pl-3 text-slate-400">10am - 1pm</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.Lunch}
                        onChange={(e) => updateLevel2Split('Lunch', Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 text-left pl-3 text-slate-400">1pm - 3pm</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.Downtime}
                        onChange={(e) => updateLevel2Split('Downtime', Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0"
                      />
                    </td>
                  </tr>
                  <tr className={`font-bold text-[9px] uppercase ${
                    sumLunchGroup === 100 ? 'text-emerald-400 bg-emerald-950/15' : 'text-red-400 bg-red-950/15'
                  }`}>
                    <td colSpan={2} className="py-1 text-center">
                      Sum: {sumLunchGroup}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Rush splits */}
            <div className="border border-slate-700 rounded overflow-hidden">
              <div className="bg-slate-800 border-b border-slate-700 py-1 font-bold text-slate-350">
                Rush (Time splits)
              </div>
              <table className="w-full text-slate-200">
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 text-left pl-3 text-slate-400">3pm - 6pm</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.EarlyRush}
                        onChange={(e) => updateLevel2Split('EarlyRush', Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 text-left pl-3 text-slate-400">6pm - 10pm</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.LateRush}
                        onChange={(e) => updateLevel2Split('LateRush', Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0"
                      />
                    </td>
                  </tr>
                  <tr className={`font-bold text-[9px] uppercase ${
                    sumRushGroup === 100 ? 'text-emerald-400 bg-emerald-950/15' : 'text-red-400 bg-red-950/15'
                  }`}>
                    <td colSpan={2} className="py-1 text-center">
                      Sum: {sumRushGroup}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Late splits */}
            <div className="border border-slate-700 rounded overflow-hidden">
              <div className="bg-slate-800 border-b border-slate-700 py-1 font-bold text-slate-350">
                Late (Time splits)
              </div>
              <table className="w-full text-slate-200">
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 text-left pl-3 text-slate-400">10pm - 1am</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.LateNight}
                        onChange={(e) => updateLevel2Split('LateNight', Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 text-left pl-3 text-slate-400">1am - 5am</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.Twilight}
                        onChange={(e) => updateLevel2Split('Twilight', Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0"
                      />
                    </td>
                  </tr>
                  <tr className={`font-bold text-[9px] uppercase ${
                    sumLateGroup === 100 ? 'text-emerald-400 bg-emerald-950/15' : 'text-red-400 bg-red-950/15'
                  }`}>
                    <td colSpan={2} className="py-1 text-center">
                      Sum: {sumLateGroup}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. Final Overall Shift split percentage */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Calculated Total Sales Splits per Shift
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {Object.entries(totalSplits).map(([shift, percent]) => (
              <div key={shift} className="bg-slate-900 border border-slate-800 rounded p-1.5">
                <div className="text-[9px] text-slate-450 font-bold">{shift}</div>
                <div className="text-xs text-white font-black">{percent}%</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
