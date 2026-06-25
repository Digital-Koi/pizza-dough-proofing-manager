import { useState, useEffect } from 'react';
import { useDoughStore } from './store/useDoughStore';
import InventoryGrid from './components/InventoryGrid';
import DailyRequiredTrays from './components/DailyRequiredTrays';
import SalesSplitConfig from './components/SalesSplitConfig';
import ShiftPlansList from './components/ShiftPlansList';
import { RefreshCcw, Wifi, WifiOff } from 'lucide-react';

export default function App() {
  const { clearAll } = useDoughStore();
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

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-red-500 selection:text-white pb-8 font-outfit">
      
      {/* Top Header Navbar */}
      <header className="bg-[#0b0c10]/90 border-b border-slate-800 px-4 py-3 sm:px-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            {/* Styled CSS Double-Tile Domino Logo */}
            <div className="flex space-x-1.5 transform -rotate-12 select-none">
              {/* Red Tile (left) with 1 white dot */}
              <div className="w-5.5 h-5.5 bg-[#e31837] rounded flex items-center justify-center shadow">
                <div className="w-1.2 h-1.2 bg-white rounded-full"></div>
              </div>
              {/* Blue Tile (right) with 2 white dots */}
              <div className="w-5.5 h-5.5 bg-[#0060a9] rounded flex flex-col justify-between p-0.5 shadow">
                <div className="w-1.2 h-1.2 bg-white rounded-full self-start"></div>
                <div className="w-1.2 h-1.2 bg-white rounded-full self-end"></div>
              </div>
            </div>
            <h1 className="text-base font-black tracking-wider text-white uppercase font-outfit">
              DOUGHFLOW
            </h1>
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
        <div className="w-full border-2 border-[#e31837]/60 rounded-xl overflow-hidden shadow-md">
          <div className="bg-[#e31837] text-white text-center font-black py-4 border-b border-[#e31837]/35 text-2xl tracking-wide uppercase">
            Dough Plan
          </div>
        </div>

        {/* Section 1: Dough Available in Store */}
        <div className="w-full">
          <InventoryGrid />
        </div>

        {/* Section 2 & 3: Daily Required Trays and Sales Split Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <DailyRequiredTrays />
          <SalesSplitConfig />
        </div>

        {/* Section 4: Takeout Planner & Chronological Schedules */}
        <div className="space-y-4 pt-4 border-t border-slate-850">
          <h3 className="text-sm font-black text-white tracking-wider uppercase">
            Dough Takeout Schedule (Shifts)
          </h3>
          <ShiftPlansList />
        </div>

      </main>

      {/* Footer details */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 w-full mt-10 border-t border-slate-850 pt-4 text-center text-xs text-slate-500 font-semibold">
        <p>© {new Date().getFullYear()} DoughFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}
