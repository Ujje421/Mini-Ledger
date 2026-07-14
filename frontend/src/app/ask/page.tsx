'use client'

import AskLedgerPanel from '@/components/AskLedgerPanel'

export default function AskPage() {
  return (
    <div className="p-8 h-full flex flex-col">
      <header className="mb-8 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Ask Your Ledger</h1>
          <p className="text-sm text-slate-500 mt-1">Ask questions about your finances in natural language.</p>
        </div>
      </header>

      <div className="flex-1 min-h-0 max-w-4xl w-full mx-auto">
        <AskLedgerPanel />
      </div>
    </div>
  )
}
