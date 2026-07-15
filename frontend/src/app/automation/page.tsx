'use client'

import { Workflow, Plus, Zap, ArrowRight, Save } from 'lucide-react'

export default function AutomationPage() {
  return (
    <div className="pt-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-nexus-text tracking-tight">Automation Rules</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-nexus-primary text-white rounded-lg shadow-sm text-sm font-medium hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Rule</span>
        </button>
      </header>

      <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm overflow-hidden mb-8 relative group cursor-pointer">
        <div className="absolute inset-0 bg-slate-900/80 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white font-bold tracking-wider uppercase text-lg">Pro Feature - Coming Soon</span>
        </div>
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-800">Auto-Categorize Subscriptions</h2>
          </div>
          <div className="flex items-center gap-2">
             <span className="relative inline-flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
             </span>
             <span className="text-xs font-semibold text-slate-500">Active</span>
          </div>
        </div>
        
        <div className="p-6">
           <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-medium text-slate-600">
             <div className="w-full md:w-auto px-4 py-3 bg-white border border-slate-200 rounded-lg flex items-center gap-3">
               <span className="text-slate-400">IF</span>
               <span className="text-indigo-600 font-bold">Description</span>
               <span>contains</span>
               <span className="bg-slate-100 px-2 py-1 rounded text-slate-800">Netflix</span>
             </div>
             
             <ArrowRight className="w-5 h-5 text-slate-300 hidden md:block" />
             <div className="h-4 w-[1px] bg-slate-300 md:hidden"></div>
             
             <div className="w-full md:w-auto px-4 py-3 bg-white border border-slate-200 rounded-lg flex items-center gap-3">
               <span className="text-slate-400">THEN SET</span>
               <span className="text-emerald-600 font-bold">Category</span>
               <span>to</span>
               <span className="bg-slate-100 px-2 py-1 rounded text-slate-800">Entertainment</span>
             </div>
           </div>
        </div>
      </div>
      
      <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm overflow-hidden opacity-60 relative group cursor-pointer">
        <div className="absolute inset-0 bg-slate-900/80 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white font-bold tracking-wider uppercase text-lg">Pro Feature - Coming Soon</span>
        </div>
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <Workflow className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-800">Flag Large Expenses</h2>
          </div>
          <div className="flex items-center gap-2">
             <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-300"></span>
             <span className="text-xs font-semibold text-slate-500">Disabled</span>
          </div>
        </div>
        
        <div className="p-6">
           <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-medium text-slate-600">
             <div className="w-full md:w-auto px-4 py-3 bg-white border border-slate-200 rounded-lg flex items-center gap-3">
               <span className="text-slate-400">IF</span>
               <span className="text-indigo-600 font-bold">Amount</span>
               <span>is greater than</span>
               <span className="bg-slate-100 px-2 py-1 rounded text-slate-800">$1,000</span>
             </div>
             
             <ArrowRight className="w-5 h-5 text-slate-300 hidden md:block" />
             <div className="h-4 w-[1px] bg-slate-300 md:hidden"></div>
             
             <div className="w-full md:w-auto px-4 py-3 bg-white border border-slate-200 rounded-lg flex items-center gap-3">
               <span className="text-slate-400">THEN SET</span>
               <span className="text-rose-600 font-bold">Tag</span>
               <span>to</span>
               <span className="bg-rose-50 text-rose-700 px-2 py-1 rounded font-bold">Needs Review</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
