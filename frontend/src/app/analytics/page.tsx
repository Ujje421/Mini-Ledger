'use client'

import { BarChart2, TrendingUp, PieChart, Loader2 } from 'lucide-react'
import { SalesOverviewChart, TotalSubscriberChart } from '@/components/DashboardCharts'
import { useTransactions } from '@/lib/hooks'
import { useMemo } from 'react'

export default function AnalyticsPage() {
  const { transactions, isLoading } = useTransactions()

  const { cashFlow, topExpense, savingsRate } = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { cashFlow: 0, topExpense: 'None', savingsRate: 0 }
    }

    let income = 0
    let expense = 0
    const expenseCategories: Record<string, number> = {}

    transactions.forEach(t => {
      if (t.type === 'INCOME') {
        income += t.amount
      } else {
        expense += t.amount
        if (!expenseCategories[t.category]) {
          expenseCategories[t.category] = 0
        }
        expenseCategories[t.category] += t.amount
      }
    })

    const cFlow = income - expense
    
    let tExpense = 'None'
    let maxExp = 0
    for (const [cat, amt] of Object.entries(expenseCategories)) {
      if (amt > maxExp) {
        maxExp = amt
        tExpense = cat
      }
    }

    const sRate = income > 0 ? ((income - expense) / income) * 100 : 0

    return {
      cashFlow: cFlow,
      topExpense: tExpense,
      savingsRate: sRate
    }
  }, [transactions])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (isLoading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
  }

  return (
    <div className="pt-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-nexus-text tracking-tight">Analytics Pro</h1>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">BETA</span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-nexus-card border border-nexus-border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${cashFlow >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-nexus-textMuted uppercase tracking-wider">Cash Flow</p>
            <p className={`text-2xl font-bold ${cashFlow >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {cashFlow >= 0 ? '+' : ''}{formatCurrency(cashFlow)}
            </p>
          </div>
        </div>
        <div className="bg-nexus-card border border-nexus-border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-nexus-textMuted uppercase tracking-wider">Top Expense</p>
            <p className="text-2xl font-bold text-nexus-text">{topExpense}</p>
          </div>
        </div>
        <div className="bg-nexus-card border border-nexus-border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${savingsRate > 20 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-nexus-textMuted uppercase tracking-wider">Savings Rate</p>
            <p className="text-2xl font-bold text-nexus-text">{savingsRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm p-6 relative group overflow-hidden">
           <div className="absolute inset-0 bg-slate-900/80 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <span className="text-white font-bold tracking-wider uppercase">Pro Feature - Coming Soon</span>
           </div>
           <h2 className="text-sm font-bold text-nexus-text mb-4">Revenue Trends</h2>
           <SalesOverviewChart />
        </div>
        <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm p-6 relative group overflow-hidden">
           <div className="absolute inset-0 bg-slate-900/80 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <span className="text-white font-bold tracking-wider uppercase">Pro Feature - Coming Soon</span>
           </div>
           <h2 className="text-sm font-bold text-nexus-text mb-4">Subscription Burn</h2>
           <TotalSubscriberChart />
        </div>
      </div>

      <div className="mt-8 bg-indigo-900 rounded-xl p-8 text-white relative overflow-hidden shadow-lg group cursor-pointer">
        <div className="absolute inset-0 bg-slate-900/90 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white font-bold tracking-wider uppercase text-lg">Pro Version Coming in Phase 3</span>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BarChart2 className="w-32 h-32" />
        </div>
        <h2 className="text-xl font-bold mb-2 relative z-10">Unlock Advanced AI Insights</h2>
        <p className="text-indigo-200 text-sm max-w-lg mb-6 relative z-10">
          Upgrade to Mini-Ledger Pro to let our specialized FinTech AI analyze your spending patterns, automatically categorize historical data, and forecast your cash flow for the next 12 months.
        </p>
        <button className="px-6 py-2.5 bg-white text-indigo-900 rounded-lg font-bold shadow-sm transition-colors relative z-10">
          Upgrade to Pro
        </button>
      </div>
    </div>
  )
}
