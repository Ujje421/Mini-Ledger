'use client'

import { useState, useEffect } from 'react'
import { fetchSummary } from '@/lib/api'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

export default function SummaryCards() {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSummary()
  }, [])

  const loadSummary = async () => {
    try {
      const data = await fetchSummary()
      setSummary(data)
    } catch (error) {
      console.error('Failed to load summary', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-pulse">
      {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>)}
    </div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Total Income</p>
          <p className="text-2xl font-bold text-slate-800">${summary?.total_income?.toFixed(2) || '0.00'}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
          <TrendingDown className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Total Expense</p>
          <p className="text-2xl font-bold text-slate-800">${summary?.total_expense?.toFixed(2) || '0.00'}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
          <DollarSign className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Net Balance</p>
          <p className="text-2xl font-bold text-slate-800">${summary?.net_balance?.toFixed(2) || '0.00'}</p>
        </div>
      </div>
    </div>
  )
}
