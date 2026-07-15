'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type DateRange = 'ALL' | 'THIS_MONTH' | 'THIS_WEEK'
export type TransactionTypeFilter = 'ALL' | 'INCOME' | 'EXPENSE'

interface FilterState {
  dateRange: DateRange
  type: TransactionTypeFilter
  category: string
}

interface FilterContextType {
  filters: FilterState
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'ALL',
    type: 'ALL',
    category: ''
  })

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}
