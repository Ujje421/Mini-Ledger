'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import GlobalHeader from '@/components/GlobalHeader'
import { FilterProvider } from '@/lib/FilterContext'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <FilterProvider>
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="flex-1 flex flex-col min-h-screen relative w-full overflow-hidden">
        <GlobalHeader setMobileOpen={setMobileOpen} />
        <div className="flex-1 px-4 md:px-8 pb-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </FilterProvider>
  )
}
