'use client'

import { useState, useEffect, useMemo } from 'react'
import { Filter, ArrowUpDown, MoreHorizontal, ArrowUpRight, Users, ChevronDown, AlertCircle } from 'lucide-react'
import { parseISO, format, subDays, startOfDay, isAfter } from 'date-fns'
import { useTransactions, useSummary } from '@/lib/hooks'

export function SalesOverviewChart() {
  const { transactions, isLoading: txLoading } = useTransactions()
  const { summary, isLoading: sumLoading } = useSummary()
  
  const totalExpense = summary?.total_expense || 0
  const loading = txLoading || sumLoading

  const chartData = useMemo(() => {
    if (!transactions || !transactions.length) return null
    
    const today = new Date()
    const monthsData = [
      { date: new Date(today.getFullYear(), today.getMonth() - 2, 1), label: '', total: 0, categories: {} as Record<string, number> },
      { date: new Date(today.getFullYear(), today.getMonth() - 1, 1), label: '', total: 0, categories: {} as Record<string, number> },
      { date: new Date(today.getFullYear(), today.getMonth(), 1), label: '', total: 0, categories: {} as Record<string, number> }
    ]

    const expenses = transactions.filter(t => t.type === 'EXPENSE')
    const catTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
      return acc
    }, {} as Record<string, number>)
    
    const topCategories = Object.entries(catTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(e => e[0])

    // Pad with placeholders if less than 3 categories exist
    while (topCategories.length < 3) {
      topCategories.push(`Category ${topCategories.length + 1}`)
    }

    monthsData.forEach(m => {
      m.label = format(m.date, 'MMM')
      const monthTx = expenses.filter(t => {
        const d = parseISO(t.date)
        return d.getMonth() === m.date.getMonth() && d.getFullYear() === m.date.getFullYear()
      })
      
      let top1 = 0, top2 = 0, top3 = 0, other = 0
      monthTx.forEach(t => {
        const amt = Number(t.amount)
        m.total += amt
        if (t.category === topCategories[0]) top1 += amt
        else if (t.category === topCategories[1]) top2 += amt
        else if (t.category === topCategories[2]) top3 += amt
        else other += amt
      })
      
      m.categories = { top1, top2, top3, other }
    })

    const maxTotal = Math.max(...monthsData.map(m => m.total), 1)
    
    return {
      months: monthsData.map(m => ({
        name: m.label,
        // Calculate heights dynamically, max height ~110px. Add small minimum height (2px) for visibility if > 0
        h1: m.categories.top1 > 0 ? Math.max(4, (m.categories.top1 / maxTotal) * 110) : 0,
        h2: m.categories.top2 > 0 ? Math.max(4, (m.categories.top2 / maxTotal) * 110) : 0,
        h3: m.categories.top3 > 0 ? Math.max(4, (m.categories.top3 / maxTotal) * 110) : 0,
        h4: m.categories.other > 0 ? Math.max(4, (m.categories.other / maxTotal) * 110) : 0,
        label: `$${m.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      })),
      topCategories
    }
  }, [transactions])

  if (loading) {
    return <div className="p-6 h-full flex items-center justify-center text-nexus-textMuted animate-pulse">Loading chart data...</div>
  }

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
            <span className="text-[28px] font-bold text-nexus-text tracking-tight">
              ${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
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
      
      {!chartData ? (
        <div className="flex-1 flex flex-col items-center justify-center text-nexus-textMuted">
           <AlertCircle className="w-6 h-6 mb-2 opacity-50" />
           <span className="text-sm">No expense data available</span>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-end mt-4 relative">
          <div className="absolute inset-x-0 bottom-6 top-0 flex flex-col justify-between pointer-events-none">
            <div className="w-full border-b border-slate-100"></div>
            <div className="w-full border-b border-slate-100"></div>
            <div className="w-full border-b border-slate-100"></div>
            <div className="w-full border-b border-slate-100"></div>
          </div>
          
          <div className="w-full h-56 flex items-end justify-around relative px-4">
             {chartData.months.map((month: any) => (
               <div key={month.name} className="flex flex-col items-center gap-2 md:gap-4 z-10 w-16 sm:w-24 md:w-32 group cursor-pointer">
                  <div className="w-full flex flex-col gap-1 sm:gap-1.5 justify-end h-full group-hover:-translate-y-1 transition-transform">
                    <div className="text-center mb-1 sm:mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] sm:text-[11px] font-bold text-nexus-text">{month.label}</span>
                    </div>
                    {month.h1 > 0 && <div className="w-full rounded-md bg-teal-400 hover:brightness-110 transition-all" style={{height: `${month.h1}px`}}></div>}
                    {month.h2 > 0 && <div className="w-full rounded-md bg-blue-500 hover:brightness-110 transition-all" style={{height: `${month.h2}px`}}></div>}
                    {month.h3 > 0 && <div className="w-full rounded-md bg-[#8B5CF6] hover:brightness-110 transition-all" style={{height: `${month.h3}px`}}></div>}
                    {month.h4 > 0 && <div className="w-full rounded-md bg-nexus-primary hover:brightness-110 transition-all" style={{height: `${month.h4}px`}}></div>}
                  </div>
                  <span className="text-[10px] sm:text-xs text-nexus-textMuted font-medium">{month.name}</span>
               </div>
             ))}
          </div>
          <div className="flex justify-center flex-wrap gap-4 md:gap-6 mt-6">
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-teal-400"></div><span className="text-[10px] text-nexus-textMuted font-bold tracking-wide uppercase">{chartData.topCategories[0]}</span></div>
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500"></div><span className="text-[10px] text-nexus-textMuted font-bold tracking-wide uppercase">{chartData.topCategories[1]}</span></div>
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-[#8B5CF6]"></div><span className="text-[10px] text-nexus-textMuted font-bold tracking-wide uppercase">{chartData.topCategories[2]}</span></div>
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-nexus-primary"></div><span className="text-[10px] text-nexus-textMuted font-bold tracking-wide uppercase">Other</span></div>
          </div>
        </div>
      )}
    </div>
  )
}

export function TotalSubscriberChart() {
  const { transactions, isLoading } = useTransactions()

  const weekData = useMemo(() => {
    if (!transactions || !transactions.length) return null
    
    const days: { day: string; date: Date; count: number }[] = []
    const today = startOfDay(new Date())
    
    for (let i = 6; i >= 0; i--) {
      const d = subDays(today, i)
      days.push({
        day: format(d, 'EEE'),
        date: d,
        count: 0
      })
    }
    
    const last7DaysStart = subDays(today, 6)
    let totalWeekTx = 0
    
    transactions.forEach(t => {
      const txDate = startOfDay(parseISO(t.date))
      if (isAfter(txDate, last7DaysStart) || txDate.getTime() === last7DaysStart.getTime()) {
        const dayDiff = Math.floor((today.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24))
        if (dayDiff >= 0 && dayDiff < 7) {
          days[6 - dayDiff].count += 1
          totalWeekTx += 1
        }
      }
    })
    
    const maxCount = Math.max(...days.map(d => d.count), 1)
    
    return {
      totalWeekTx,
      days: days.map((d, i) => ({
        day: d.day,
        height: Math.max(10, (d.count / maxCount) * 100), // Min 10% height for visibility
        active: i === 6,
        count: d.count
      }))
    }
  }, [transactions])

  if (isLoading) {
    return <div className="p-6 h-full flex items-center justify-center text-nexus-textMuted animate-pulse">Loading chart data...</div>
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-nexus-textMuted" />
            <h3 className="text-sm font-medium text-nexus-text">Total Transactions</h3>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] font-bold text-nexus-text tracking-tight">{transactions?.length || 0}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] text-nexus-textMuted font-medium">All Time Volume</span>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-3 py-1.5 border border-nexus-border rounded-lg text-xs font-medium text-nexus-text hover:bg-slate-50 transition-colors shadow-sm">
          Weekly <ChevronDown className="w-3 h-3 text-nexus-textMuted" />
        </button>
      </div>
      
      {!weekData ? (
        <div className="flex-1 flex flex-col items-center justify-center text-nexus-textMuted">
           <AlertCircle className="w-6 h-6 mb-2 opacity-50" />
           <span className="text-sm">No transaction data available</span>
        </div>
      ) : (
        <div className="flex-1 flex items-end justify-between mt-8 relative px-2">
           {weekData.days.map((col: any, i: number) => (
             <div key={col.day + i} className="flex flex-col items-center gap-4 z-10 w-8 group">
                <div className="w-full flex flex-col justify-end h-40">
                  {(col.active || col.count > 0) && (
                    <div className="text-center mb-2 -mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold text-nexus-text">{col.count}</span>
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
      )}
    </div>
  )
}
