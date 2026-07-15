'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTransactions } from '@/lib/hooks'
import { createTransaction } from '@/lib/api'

interface GlobalHeaderProps {
  setMobileOpen: (open: boolean) => void;
}

export default function GlobalHeader({ setMobileOpen }: GlobalHeaderProps) {
  const { mutate } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    amount: '',
    type: 'EXPENSE',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await createTransaction({
        amount: Number(formData.amount),
        type: formData.type as 'INCOME' | 'EXPENSE',
        category: formData.category,
        description: formData.description,
        date: formData.date
      })
      await mutate()
      setIsModalOpen(false)
      setFormData({
        amount: '',
        type: 'EXPENSE',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      })
    } catch (err) {
      console.error('Failed to create transaction', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <header className="h-[72px] flex items-center justify-between px-4 md:px-8 shrink-0 z-30 border-b border-nexus-border/50 bg-nexus-bg sticky top-0">
        
        {/* Left Section (Mobile Menu & Search) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -ml-2 text-nexus-textMuted hover:text-nexus-text transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          
          <div className="sm:hidden font-bold text-nexus-primary">Mini Ledger</div>

          <div className="relative w-64 md:w-96 hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-nexus-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="text" className="w-full pl-10 pr-12 py-2 bg-nexus-card border border-nexus-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-nexus-primary shadow-sm" placeholder="Search" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-xs text-nexus-textMuted font-mono tracking-widest">⌘+F</span>
            </div>
          </div>
        </div>
        
        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-6">
           <div className="hidden md:flex items-center gap-4 text-nexus-textMuted">
             <button className="hover:text-nexus-text transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg></button>
             <button className="hover:text-nexus-text transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
             <button className="hover:text-nexus-text transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></button>
           </div>
           
           <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center justify-center w-8 h-8 md:w-auto md:px-4 md:py-2 bg-nexus-primary text-white rounded-lg shadow-sm text-sm font-medium hover:bg-indigo-700 transition-colors"
           >
             <Plus className="w-4 h-4 md:mr-2" />
             <span className="hidden md:inline">Add</span>
           </button>

           <div className="flex items-center gap-3 border-l border-nexus-border pl-3 md:pl-6 cursor-pointer hover:opacity-80 transition-opacity">
             <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Ujjwal&backgroundColor=e9ecef" alt="Ujjwal Jagtap" />
             </div>
             <div className="hidden md:flex flex-col">
               <span className="text-xs font-semibold text-nexus-text">Ujjwal Jagtap</span>
               <span className="text-[10px] text-nexus-textMuted">Software Engineer</span>
             </div>
           </div>
        </div>
      </header>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">New Transaction</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="type" value="EXPENSE" checked={formData.type === 'EXPENSE'} onChange={(e) => setFormData({...formData, type: e.target.value})} className="peer sr-only" />
                  <div className="text-center px-4 py-2 rounded-lg border-2 border-slate-100 peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-700 font-medium text-sm transition-all text-slate-500">Expense</div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="type" value="INCOME" checked={formData.type === 'INCOME'} onChange={(e) => setFormData({...formData, type: e.target.value})} className="peer sr-only" />
                  <div className="text-center px-4 py-2 rounded-lg border-2 border-slate-100 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 font-medium text-sm transition-all text-slate-500">Income</div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-medium">$</span>
                  </div>
                  <input required type="number" step="0.01" min="0.01" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="block w-full pl-7 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800" placeholder="0.00" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Category</label>
                <input required type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800" placeholder="e.g. Groceries, Salary, Rent" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date</label>
                <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description (Optional)</label>
                <input type="text" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800" placeholder="Brief note..." />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                  {isSubmitting ? <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : null}
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
