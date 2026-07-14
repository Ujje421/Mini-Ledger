'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Receipt, Settings, PieChart, MessageSquare } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: Receipt },
  { name: 'Ask Ledger', href: '/ask', icon: MessageSquare },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-slate-50 border-r border-slate-200 h-full flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-200">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">SL</span>
        </div>
        <span className="font-semibold text-slate-800 text-lg">Smart Ledger</span>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</div>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          )
        })}
      </div>
      
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-sm font-medium text-slate-700">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-700">User</span>
            <span className="text-xs text-slate-500">user@ledger.app</span>
          </div>
        </div>
      </div>
    </div>
  )
}
