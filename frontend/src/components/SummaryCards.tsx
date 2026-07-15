'use client'

import { useSummary } from '@/lib/hooks'
import { Eye, FileText, Info, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function SummaryCards() {
  const { summary, isLoading: loading } = useSummary()

  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>)}
    </div>
  }

  // Format number to string like '12,450'
  const formatNum = (num: number) => num ? num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Total Income */}
      <div className="bg-nexus-card border border-nexus-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-nexus-textMuted">
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Total Income</span>
          </div>
          <Info className="w-4 h-4 text-nexus-textMuted/50 cursor-pointer hover:text-nexus-text transition-colors" />
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-nexus-text tracking-tight">${formatNum(summary?.total_income)}</span>
          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[11px] font-bold">
            <span>24.2%</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Total Expense */}
      <div className="bg-nexus-card border border-nexus-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-nexus-textMuted">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Total Expense</span>
          </div>
          <Info className="w-4 h-4 text-nexus-textMuted/50 cursor-pointer hover:text-nexus-text transition-colors" />
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-nexus-text tracking-tight">${formatNum(summary?.total_expense)}</span>
          <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md text-[11px] font-bold">
            <span>12.5%</span>
            <ArrowDownRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Net Balance */}
      <div className="bg-nexus-card border border-nexus-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-nexus-textMuted">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Net Balance</span>
          </div>
          <Info className="w-4 h-4 text-nexus-textMuted/50 cursor-pointer hover:text-nexus-text transition-colors" />
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-nexus-text tracking-tight">${formatNum(summary?.net_balance)}</span>
          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[11px] font-bold">
            <span>8.1%</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>

    </div>
  )
}
