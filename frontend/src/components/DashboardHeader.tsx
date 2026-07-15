'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronDown, Filter, DownloadCloud, Check } from 'lucide-react'
import { useTransactions } from '@/lib/hooks'
import { useFilters, DateRange, TransactionTypeFilter } from '@/lib/FilterContext'

export default function DashboardHeader() {
  const { transactions } = useTransactions()
  const { filters, setFilters } = useFilters()
  
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [dateMenuOpen, setDateMenuOpen] = useState(false)

  const hasActiveFilters = filters.type !== 'ALL' || filters.category !== ''

  const handleExport = () => {
    if (!transactions || transactions.length === 0) return
    
    // Create CSV content
    const headers = ['Date', 'Type', 'Category', 'Amount', 'Description']
    const rows = transactions.map(t => 
      `${t.date},${t.type},${t.category},${t.amount},"${t.description || ''}"`
    )
    const csvContent = [headers.join(','), ...rows].join('\n')
    
    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `ledger_export_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-[22px] font-bold text-nexus-text tracking-tight">Dashboard</h1>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Filter */}
          <div className="relative">
            <div className="flex items-center bg-nexus-card border border-nexus-border rounded-lg shadow-sm text-sm font-medium text-nexus-text">
              <button 
                onClick={() => {
                  setDateMenuOpen(!dateMenuOpen)
                  setFilterMenuOpen(false)
                }}
                className="flex items-center gap-2 px-3 py-2 border-r border-nexus-border hover:bg-slate-50 transition-colors rounded-l-lg"
              >
                <Calendar className="w-4 h-4 text-nexus-textMuted" />
                <span>{filters.dateRange === 'ALL' ? 'All Time' : filters.dateRange === 'THIS_MONTH' ? 'This Month' : 'This Week'}</span>
              </button>
              <button 
                onClick={() => {
                  setDateMenuOpen(!dateMenuOpen)
                  setFilterMenuOpen(false)
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 transition-colors rounded-r-lg"
              >
                <span>Range</span>
                <ChevronDown className="w-4 h-4 text-nexus-textMuted" />
              </button>
            </div>
            {dateMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-nexus-border rounded-lg shadow-lg py-1 z-50">
                {(['ALL', 'THIS_MONTH', 'THIS_WEEK'] as DateRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setFilters({ ...filters, dateRange: range })
                      setDateMenuOpen(false)
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm text-left ${filters.dateRange === range ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    {range === 'ALL' ? 'All Time' : range === 'THIS_MONTH' ? 'This Month' : 'This Week'}
                    {filters.dateRange === range && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Type/Category Filter */}
          <div className="relative">
            <button 
              onClick={() => {
                setFilterMenuOpen(!filterMenuOpen)
                setDateMenuOpen(false)
              }}
              className={`flex items-center gap-2 px-3 py-2 border rounded-lg shadow-sm text-sm font-medium transition-colors ${hasActiveFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-nexus-card border-nexus-border text-nexus-text hover:bg-slate-50'}`}
            >
              <Filter className={`w-4 h-4 ${hasActiveFilters ? 'text-indigo-500' : 'text-nexus-textMuted'}`} />
              <span>Filter {hasActiveFilters && '(Active)'}</span>
            </button>
            
            {filterMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-nexus-border rounded-lg shadow-lg py-2 z-50">
                <div className="px-3 pb-2 mb-2 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</span>
                </div>
                {(['ALL', 'INCOME', 'EXPENSE'] as TransactionTypeFilter[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilters({ ...filters, type })}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm text-left ${filters.type === type ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    {type === 'ALL' ? 'All Types' : type === 'INCOME' ? 'Income Only' : 'Expenses Only'}
                    {filters.type === type && <Check className="w-4 h-4" />}
                  </button>
                ))}
                
                <div className="px-3 pt-3 pb-2 mb-2 mt-2 border-t border-b border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</span>
                </div>
                <div className="px-3">
                  <input 
                    type="text" 
                    placeholder="e.g. Groceries"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                
                {hasActiveFilters && (
                  <div className="px-3 mt-3">
                    <button 
                      onClick={() => {
                        setFilters({ ...filters, type: 'ALL', category: '' })
                        setFilterMenuOpen(false)
                      }}
                      className="w-full text-center text-xs font-semibold text-rose-500 hover:text-rose-600 py-1"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          

          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 bg-nexus-card border border-nexus-border rounded-lg shadow-sm text-sm font-medium text-nexus-text hover:bg-slate-50 transition-colors"
          >
            <DownloadCloud className="w-4 h-4 text-nexus-textMuted" />
            <span>Export</span>
          </button>

        </div>
      </header>
    </>
  )
}
