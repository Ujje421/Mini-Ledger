'use client'

import { Filter, ArrowUpDown, MoreHorizontal, ArrowUpRight, Users, ChevronDown } from 'lucide-react'

export function SalesOverviewChart() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-[4px] bg-indigo-50 flex items-center justify-center">
              <div className="w-2.5 h-2.5 border-2 border-indigo-500 rounded-sm"></div>
            </div>
            <h3 className="text-sm font-medium text-nexus-text">Spend Overview</h3>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] font-bold text-nexus-text tracking-tight">$ 9,257.51</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide">
                15.8% <ArrowUpRight className="w-3 h-3" strokeWidth={3} />
              </span>
              <span className="text-xs text-nexus-textMuted font-medium">+ $143.50 increased</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-3 py-1.5 border border-nexus-border rounded-lg text-xs font-medium text-nexus-text hover:bg-slate-50 transition-colors shadow-sm">
             <Filter className="w-3 h-3 text-nexus-textMuted" /> Filter
           </button>
           <button className="flex items-center gap-2 px-3 py-1.5 border border-nexus-border rounded-lg text-xs font-medium text-nexus-text hover:bg-slate-50 transition-colors shadow-sm">
             <ArrowUpDown className="w-3 h-3 text-nexus-textMuted" /> Sort
           </button>
           <button className="flex items-center justify-center w-8 h-8 border border-nexus-border rounded-lg text-nexus-text hover:bg-slate-50 transition-colors shadow-sm">
             <MoreHorizontal className="w-4 h-4 text-nexus-textMuted" />
           </button>
        </div>
      </div>
      
      {/* Mock Chart Area */}
      <div className="flex-1 flex flex-col justify-end mt-4 relative">
        <div className="absolute inset-x-0 bottom-6 top-0 flex flex-col justify-between pointer-events-none">
          <div className="w-full border-b border-slate-100"></div>
          <div className="w-full border-b border-slate-100"></div>
          <div className="w-full border-b border-slate-100"></div>
          <div className="w-full border-b border-slate-100"></div>
        </div>
        
        <div className="w-full h-56 flex items-end justify-around relative px-4">
           {[
             { name: 'Oct', h1: 15, h2: 30, h3: 35, h4: 30, label: '$2,988.20' },
             { name: 'Nov', h1: 20, h2: 25, h3: 20, h4: 15, label: '$1,765.09' },
             { name: 'Dec', h1: 15, h2: 35, h3: 45, h4: 40, label: '$4,005.65' }
           ].map((month, i) => (
             <div key={month.name} className="flex flex-col items-center gap-2 md:gap-4 z-10 w-16 sm:w-24 md:w-32 group cursor-pointer">
                <div className="w-full flex flex-col gap-1 sm:gap-1.5 justify-end h-full group-hover:-translate-y-1 transition-transform">
                  <div className="text-center mb-1 sm:mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] sm:text-[11px] font-bold text-nexus-text">{month.label}</span>
                  </div>
                  <div className="w-full rounded-md bg-teal-400 hover:brightness-110 transition-all" style={{height: `${month.h1}px`}}></div>
                  <div className="w-full rounded-md bg-blue-500 hover:brightness-110 transition-all" style={{height: `${month.h2}px`}}></div>
                  <div className="w-full rounded-md bg-[#8B5CF6] hover:brightness-110 transition-all" style={{height: `${month.h3}px`}}></div>
                  <div className="w-full rounded-md bg-nexus-primary hover:brightness-110 transition-all" style={{height: `${month.h4}px`}}></div>
                </div>
                <span className="text-[10px] sm:text-xs text-nexus-textMuted font-medium">{month.name}</span>
             </div>
           ))}
        </div>
        <div className="flex justify-center gap-6 mt-6">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-nexus-primary"></div><span className="text-[10px] text-nexus-textMuted font-bold tracking-wide uppercase">Housing</span></div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-[#8B5CF6]"></div><span className="text-[10px] text-nexus-textMuted font-bold tracking-wide uppercase">Food</span></div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500"></div><span className="text-[10px] text-nexus-textMuted font-bold tracking-wide uppercase">Transport</span></div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-teal-400"></div><span className="text-[10px] text-nexus-textMuted font-bold tracking-wide uppercase">Other</span></div>
        </div>
      </div>
    </div>
  )
}

export function TotalSubscriberChart() {
  const data = [
    { day: 'Sun', height: 20, active: false },
    { day: 'Mon', height: 35, active: false },
    { day: 'Tue', height: 100, active: true },
    { day: 'Wed', height: 25, active: false },
    { day: 'Thu', height: 60, active: false },
    { day: 'Fri', height: 45, active: false },
    { day: 'Sat', height: 75, active: false },
  ]
  
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-nexus-textMuted" />
            <h3 className="text-sm font-medium text-nexus-text">Total Transactions</h3>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] font-bold text-nexus-text tracking-tight">24,473</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide">
              8.3% <ArrowUpRight className="w-3 h-3" strokeWidth={3} />
            </span>
            <span className="text-[11px] text-nexus-textMuted font-medium">+ 749 increased</span>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-3 py-1.5 border border-nexus-border rounded-lg text-xs font-medium text-nexus-text hover:bg-slate-50 transition-colors shadow-sm">
          Weekly <ChevronDown className="w-3 h-3 text-nexus-textMuted" />
        </button>
      </div>
      
      <div className="flex-1 flex items-end justify-between mt-8 relative">
         {data.map((col, i) => (
           <div key={col.day} className="flex flex-col items-center gap-4 z-10 w-8 group">
              <div className="w-full flex flex-col justify-end h-40">
                {col.active && (
                  <div className="text-center mb-2 -mt-6">
                    <span className="text-[10px] font-bold text-nexus-text">3,874</span>
                  </div>
                )}
                <div 
                  className={`w-full rounded-md transition-all ${col.active ? 'bg-[#8B5CF6] shadow-sm' : 'bg-slate-100 group-hover:bg-slate-200'}`} 
                  style={{height: `${col.height}%`}}
                ></div>
              </div>
              <span className={`text-[10px] font-bold ${col.active ? 'text-nexus-text' : 'text-nexus-textMuted'}`}>{col.day}</span>
           </div>
         ))}
      </div>
    </div>
  )
}
