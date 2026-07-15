'use client'

import { BarChart2, TrendingUp, PieChart } from 'lucide-react'
import { SalesOverviewChart, TotalSubscriberChart } from '@/components/DashboardCharts'

export default function AnalyticsPage() {
  return (
    <div className="pt-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-nexus-text tracking-tight">Analytics Pro</h1>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">BETA</span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-nexus-card border border-nexus-border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-nexus-textMuted uppercase tracking-wider">Cash Flow</p>
            <p className="text-2xl font-bold text-nexus-text">+$4,250.00</p>
          </div>
        </div>
        <div className="bg-nexus-card border border-nexus-border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-nexus-textMuted uppercase tracking-wider">Top Expense</p>
            <p className="text-2xl font-bold text-nexus-text">Housing</p>
          </div>
        </div>
        <div className="bg-nexus-card border border-nexus-border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-nexus-textMuted uppercase tracking-wider">Savings Rate</p>
            <p className="text-2xl font-bold text-nexus-text">32.4%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm p-6 opacity-75 grayscale-[20%] transition-all hover:grayscale-0 hover:opacity-100 cursor-pointer">
           <h2 className="text-sm font-bold text-nexus-text mb-4">Revenue Trends</h2>
           <SalesOverviewChart />
        </div>
        <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm p-6 opacity-75 grayscale-[20%] transition-all hover:grayscale-0 hover:opacity-100 cursor-pointer">
           <h2 className="text-sm font-bold text-nexus-text mb-4">Subscription Burn</h2>
           <TotalSubscriberChart />
        </div>
      </div>

      <div className="mt-8 bg-indigo-900 rounded-xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BarChart2 className="w-32 h-32" />
        </div>
        <h2 className="text-xl font-bold mb-2 relative z-10">Unlock Advanced AI Insights</h2>
        <p className="text-indigo-200 text-sm max-w-lg mb-6 relative z-10">
          Upgrade to Mini-Ledger Pro to let our specialized FinTech AI analyze your spending patterns, automatically categorize historical data, and forecast your cash flow for the next 12 months.
        </p>
        <button className="px-6 py-2.5 bg-white text-indigo-900 rounded-lg font-bold shadow-sm hover:bg-slate-50 transition-colors relative z-10">
          Upgrade to Pro
        </button>
      </div>
    </div>
  )
}
