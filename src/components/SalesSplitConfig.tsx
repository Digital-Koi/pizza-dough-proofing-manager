import { useDoughStore } from '../store/useDoughStore';
import { calculateTotalSalesSplit } from '../utils/doughMath';

export default function SalesSplitConfig() {
  const {
    salesSplits,
    updateLevel1Split,
    shiftSplits,
    updateLevel2Split
  } = useDoughStore();

  const totalSplits = calculateTotalSalesSplit(salesSplits, shiftSplits);

  // Sum checks
  const sumLevel1 = salesSplits.Lunch + salesSplits.Rush + salesSplits.Late;
  const sumLunchGroup = shiftSplits.Lunch11_13 + shiftSplits.Lunch13_15;
  const sumRushGroup = shiftSplits.Rush15_17 + shiftSplits.Rush17_19;
  const sumLateGroup = shiftSplits.Late19_21 + shiftSplits.Late21_23;

  return (
    <div className="w-full border-2 border-[#e31837]/50 bg-[#0f111a] rounded-xl overflow-hidden shadow-md space-y-4">
      {/* Title Header */}
      <div className="bg-[#e31837] text-white text-center font-black py-2.5 border-b border-[#e31837]/30 text-sm tracking-wider uppercase flex justify-center px-4 items-center">
        <span>Sales Split Configurations</span>
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
                    value={salesSplits.Lunch ?? 0}
                    onChange={(e) => updateLevel1Split('Lunch', Math.max(0, Number(e.target.value)))}
                    className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0 text-sm"
                  />
                </td>
                <td className="border-r border-slate-700 p-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={salesSplits.Rush ?? 0}
                    onChange={(e) => updateLevel1Split('Rush', Math.max(0, Number(e.target.value)))}
                    className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0 text-sm"
                  />
                </td>
                <td className="p-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={salesSplits.Late ?? 0}
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
                    <td className="py-2 text-left pl-3 text-slate-400">11:00-13:00</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.Lunch11_13 ?? 0}
                        onChange={(e) => updateLevel2Split('Lunch11_13', Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 text-left pl-3 text-slate-400">13:00-15:00</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.Lunch13_15 ?? 0}
                        onChange={(e) => updateLevel2Split('Lunch13_15', Math.max(0, Number(e.target.value)))}
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
                    <td className="py-2 text-left pl-3 text-slate-400">15:00-17:00</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.Rush15_17 ?? 0}
                        onChange={(e) => updateLevel2Split('Rush15_17', Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 text-left pl-3 text-slate-400">17:00-19:00</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.Rush17_19 ?? 0}
                        onChange={(e) => updateLevel2Split('Rush17_19', Math.max(0, Number(e.target.value)))}
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
                    <td className="py-2 text-left pl-3 text-slate-400">19:00-21:00</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.Late19_21 ?? 0}
                        onChange={(e) => updateLevel2Split('Late19_21', Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent text-white font-extrabold text-center border-none focus:outline-none focus:ring-0"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 text-left pl-3 text-slate-400">21:00-23:00</td>
                    <td className="w-16 p-0.5 border-l border-slate-800">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={shiftSplits.Late21_23 ?? 0}
                        onChange={(e) => updateLevel2Split('Late21_23', Math.max(0, Number(e.target.value)))}
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
          <div className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">
            Calculated Total Sales Splits per Shift
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {Object.entries(totalSplits).map(([shift, percent]) => (
              <div key={shift} className="bg-slate-900 border border-slate-800 rounded p-1.5">
                <div className="text-[9px] text-slate-450 font-bold leading-tight">{shift}</div>
                <div className="text-xs text-white font-black">{percent}%</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
