'use client'

import { useState } from 'react'
import { createTransaction } from '@/lib/api'
import { format } from 'date-fns'

export default function TransactionForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    amount: '',
    type: 'EXPENSE',
    category: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd')
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!formData.amount || isNaN(Number(formData.amount))) {
        throw new Error('Please enter a valid amount')
      }
      if (!formData.category.trim()) {
        throw new Error('Category is required')
      }

      await createTransaction({
        ...formData,
        amount: Number(formData.amount),
        type: formData.type as 'INCOME' | 'EXPENSE',
      })
      
      setFormData({
        ...formData,
        amount: '',
        description: '',
      })
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to create transaction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-8">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Add Transaction</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
          <select 
            value={formData.type}
            onChange={e => setFormData({...formData, type: e.target.value})}
            className="w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
          <input 
            type="number" step="0.01" min="0" placeholder="0.00"
            value={formData.amount}
            onChange={e => setFormData({...formData, amount: e.target.value})}
            className="w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <input 
            type="text" placeholder="e.g. Groceries"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
            className="w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
          <input 
            type="date"
            value={formData.date}
            onChange={e => setFormData({...formData, date: e.target.value})}
            className="w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
          <input 
            type="text" placeholder="Details..."
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </div>
    </form>
  )
}
