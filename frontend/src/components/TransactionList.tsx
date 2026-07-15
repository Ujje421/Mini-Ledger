'use client'

import { useTransactions } from '@/lib/hooks'
import { deleteTransaction } from '@/lib/api'
import { format, parseISO } from 'date-fns'
import { MoreHorizontal, AlertCircle, Trash2 } from 'lucide-react'

export default function TransactionList() {
  const { transactions, isLoading: loading, isError, mutate } = useTransactions()
  const error = isError ? "We're having trouble retrieving your transactions right now. Please try again in a moment." : null

  const loadTransactions = () => mutate()

  // Helper to generate a consistent color and initial based on category string
  const getIconData = (category: string) => {
    const colors = [
      'bg-indigo-500', 'bg-teal-400', 'bg-rose-500', 'bg-blue-500', 'bg-amber-500', 'bg-emerald-500'
    ]
    const char = category ? category.charAt(0).toUpperCase() : 'T'
    const color = colors[(category?.length || 0) % colors.length]
    return { char, color }
  }

  if (loading) {
    return <div className="p-8 text-center text-nexus-textMuted animate-pulse">Loading transactions...</div>
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-8 h-8 text-rose-500 mb-3" />
        <h3 className="text-rose-800 font-semibold mb-1">Unable to Load Data</h3>
        <p className="text-rose-600 text-sm max-w-md">{error}</p>
        <button onClick={loadTransactions} className="mt-4 px-4 py-2 bg-white border border-rose-200 rounded-lg text-sm font-medium text-rose-700 shadow-sm hover:bg-rose-50 transition-colors">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-nexus-border">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-[3px] bg-slate-100 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </div>
          <h2 className="text-[15px] font-semibold text-nexus-text">Recent Transactions</h2>
        </div>
        <a href="#" className="text-xs font-semibold text-nexus-primary hover:text-indigo-700 transition-colors">See All</a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] text-sm text-left">
          <thead>
            <tr>
              <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300 text-nexus-primary focus:ring-nexus-primary" /></th>
              <th className="px-4 py-4 text-[10px] font-bold text-nexus-textMuted uppercase tracking-wider">Transaction</th>
              <th className="px-4 py-4 text-[10px] font-bold text-nexus-textMuted uppercase tracking-wider">Type</th>
              <th className="px-4 py-4 text-[10px] font-bold text-nexus-textMuted uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-nexus-textMuted uppercase tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nexus-border/50">
            {!transactions || transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="text-nexus-textMuted text-sm font-medium">No transactions found.</div>
                </td>
              </tr>
            ) : (
              transactions.map((t) => {
                const iconData = getIconData(t.category)
                return (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-slate-300 text-nexus-primary focus:ring-nexus-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${iconData.color} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>
                          {iconData.char}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-nexus-text">{t.category}</span>
                          {t.description && <span className="text-[11px] text-nexus-textMuted truncate max-w-[150px]">{t.description}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${t.type === 'INCOME' ? 'text-nexus-textMuted' : 'text-nexus-textMuted'}`}>
                        {t.type === 'INCOME' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {/* Mock progress bar to match the "Rate" visual from image */}
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className={`h-full rounded-full ${t.type === 'INCOME' ? 'bg-emerald-400' : 'bg-[#8B5CF6]'}`} style={{width: `${Math.max(20, (Number(t.amount) % 100))}%`}}></div>
                        </div>
                        <span className="text-[11px] font-semibold text-nexus-textMuted">
                          {format(parseISO(t.date), 'MMM dd')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                       <div className="flex items-center justify-end gap-3">
                          <span className={`font-semibold ${t.type === 'INCOME' ? 'text-nexus-text' : 'text-nexus-text'}`}>
                            {t.type === 'INCOME' ? '+' : '-'}${Number(t.amount).toFixed(2)}
                          </span>
                          <button 
                            onClick={async () => {
                              try {
                                await deleteTransaction(t.id);
                                mutate();
                              } catch (e) {
                                console.error('Failed to delete transaction', e);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete transaction"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
