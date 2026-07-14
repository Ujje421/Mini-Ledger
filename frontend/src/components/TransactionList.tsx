'use client'

import { useState, useEffect } from 'react'
import { fetchTransactions, Transaction } from '@/lib/api'
import { format, parseISO } from 'date-fns'

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions()
      setTransactions(data)
    } catch (error) {
      console.error('Failed to load transactions', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading transactions...</div>
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200 uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                    {format(parseISO(t.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      t.type === 'INCOME' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'bg-rose-50 text-rose-700'
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{t.category}</td>
                  <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{t.description || '-'}</td>
                  <td className={`px-6 py-4 text-right font-medium ${
                    t.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-700'
                  }`}>
                    {t.type === 'INCOME' ? '+' : '-'}${t.amount.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
