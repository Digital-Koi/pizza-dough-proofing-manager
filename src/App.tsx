import { useState, useEffect } from 'react';
import { useDoughStore } from './store/useDoughStore';
import InventoryGrid from './components/InventoryGrid';
import DailyRequiredTrays from './components/DailyRequiredTrays';
import SalesSplitConfig from './components/SalesSplitConfig';
import ShiftPlansList from './components/ShiftPlansList';
import { RefreshCcw, Wifi, WifiOff, LayoutGrid, Info } from 'lucide-react';

export default function App() {
  const { date, setDate, dayOfWeek, setDayOfWeek, clearAll } = useDoughStore();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-red-500 selection:text-white pb-8 font-outfit">
      
      {/* Top Header Navbar */}
      <header className="bg-[#0b0c10]/90 border-b border-slate-800 px-4 py-3 sm:px-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            {/* Styled CSS Double-Tile Domino Logo */}
            <div className="flex space-x-1.5 transform -rotate-12 select-none scale-105">
              {/* Red Tile (left) with 1 white dot */}
              <div className="w-6 h-6 bg-[#e31837] rounded flex items-center justify-center shadow-lg border border-[#e31837]/30">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              {/* Blue Tile (right) with 2 white dots */}
              <div className="w-6 h-6 bg-[#0060a9] rounded flex flex-col justify-between p-1 shadow-lg border border-[#0060a9]/30">
                <div className="w-1.5 h-1.5 bg-white rounded-full self-start"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full self-end"></div>
              </div>
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-white flex items-center">
                DoughFlow
                <span className="ml-2 text-[8px] bg-[#0060a9]/20 text-[#b4c6e7] font-extrabold border border-[#0060a9]/30 px-1.5 py-0.5 rounded-full uppercase">
                  Sheet Editor
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {/* Online Status */}
            <div className={`px-2.5 py-1 rounded-lg border flex items-center space-x-1.5 ${
              isOnline ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400' : 'bg-red-950/20 border-red-500/20 text-red-400'
            }`}>
              {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </div>

            {/* Print trigger */}
            <button
              onClick={() => window.print()}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold rounded-lg transition cursor-pointer select-none"
            >
              Print Plan
            </button>
            
            {/* Reset button */}
            <button
              onClick={clearAll}
              className="p-1 bg-red-950/20 hover:bg-red-950/50 border border-red-500/20 hover:border-red-500/40 rounded-lg text-red-400 transition cursor-pointer"
              title="Reset All Data"
            >
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 w-full mt-6 space-y-6 flex-1">
        
        {/* Spreadsheet Header "Dough Plan" banner matching user image */}
        <div className="w-full border-2 border-[#0060a9]/60 rounded-xl overflow-hidden shadow-md">
          <div className="bg-[#0060a9] text-white text-center font-black py-4 border-b-2 border-[#e31837] text-2xl tracking-wide uppercase">
            Dough Plan
          </div>
          
          {/* Day / Date Selector row */}
          <div className="bg-[#0f111a] p-4 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-8 text-xs font-bold">
            {/* Day Selector */}
            <div className="flex items-center space-x-3">
              <span className="bg-[#e6f0fa] text-[#0060a9] px-5 py-2 border-2 border-[#0060a9]/45 rounded text-sm uppercase font-black">
                Day
              </span>
              <div className="flex items-center">
                <select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  className="bg-slate-900 border border-slate-650 text-white rounded px-3 py-2 text-sm font-semibold cursor-pointer focus:outline-none focus:border-yellow-500"
                >
                  {daysOfWeek.map(d => (
                    <option key={d} value={d} className="bg-[#0f111a]">{d}</option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-400 ml-2 font-normal">← Please select today's day</span>
              </div>
            </div>

            {/* Calendar Date selector */}
            <div className="flex items-center space-x-3">
              <span className="text-slate-400">Target Date:</span>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-slate-900 border border-slate-650 text-white rounded px-3 py-2 text-sm font-semibold focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Dough Available in Store */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2">
            <InventoryGrid />
          </div>
          
          {/* HOW IT WORKS instruction panel */}
          <div className="border-2 border-slate-700 bg-[#0f111a] rounded-xl p-4 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center space-x-2 text-[#b4c6e7] font-extrabold text-sm mb-3">
                <Info className="h-4 w-4 text-[#e31837]" />
                <span>HOW IT WORKS</span>
              </div>
              <ul className="text-slate-300 text-xs space-y-2.5 leading-relaxed font-semibold">
                <li className="flex items-start">
                  <span className="text-[#e31837] mr-1.5">•</span>
                  Enter the trays of dough available in the store (by size and age day).
                </li>
                <li className="flex items-start">
                  <span className="text-[#e31837] mr-1.5">•</span>
                  Enter the daily required tray totals for each size.
                </li>
                <li className="flex items-start">
                  <span className="text-[#e31837] mr-1.5">•</span>
                  Adjust your sales splits to divide the daily requirements across shifts.
                </li>
                <li className="flex items-start">
                  <span className="text-[#e31837] mr-1.5">•</span>
                  The system automatically calculates shift allocations and takeout times (oldest first).
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 & 3: Daily Required Trays and Sales Split Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <DailyRequiredTrays />
          <SalesSplitConfig />
        </div>

        {/* Section 4: Takeout Planner & Chronological Schedules */}
        <div className="space-y-4 pt-4 border-t border-slate-850">
          <h3 className="text-sm font-extrabold text-white tracking-wide uppercase flex items-center">
            <LayoutGrid className="h-4 w-4 text-[#0060a9] mr-1.5" />
            Dough Takeout Schedule (Shifts)
          </h3>
          <ShiftPlansList />
        </div>

      </main>

      {/* Footer details */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 w-full mt-10 border-t border-slate-850 pt-4 text-center text-xs text-slate-500 font-semibold">
        <p>© {new Date().getFullYear()} DoughFlow Scheduler. Built to match physical kitchen board workflows.</p>
      </footer>
    </div>
  );
}
