'use client'

import TransactionList from '@/components/TransactionList'

export default function TransactionsPage() {
  return (
    <div className="pt-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-nexus-text tracking-tight">Transactions</h1>
      </header>
      
      <TransactionList />
    </div>
  )
}
