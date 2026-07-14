'use client'

import { useState } from 'react'
import TransactionForm from '@/components/TransactionForm'
import TransactionList from '@/components/TransactionList'

export default function TransactionsPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleTransactionAdded = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
      </header>

      <TransactionForm onSuccess={handleTransactionAdded} />
      
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-700">Recent Transactions</h2>
      </div>
      
      {/* We use key to force re-mount and re-fetch when a transaction is added */}
      <TransactionList key={refreshKey} />
    </div>
  )
}
