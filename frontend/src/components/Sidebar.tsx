'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, CreditCard, Users, MessageSquare, 
  Package, FileText, BarChart2, Workflow,
  Settings, Shield, HelpCircle,
  ChevronLeft, ChevronDown, Check, Diamond
} from 'lucide-react'
import Image from 'next/image'

export default function Sidebar() {
  const pathname = usePathname()

  const sections = [
    {
      title: 'GENERAL',
      items: [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Transactions', href: '/transactions', icon: CreditCard },
        { name: 'Ask Ledger', href: '/ask', icon: MessageSquare, badge: '8' },
      ]
    },
    {
      title: 'TOOLS',
      items: [
        { name: 'Analytics', href: '#', icon: BarChart2, disabled: true },
        { name: 'Automation', href: '#', icon: Workflow, disabled: true, tag: 'BETA' },
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { name: 'Settings', href: '#', icon: Settings, disabled: true },
        { name: 'Help', href: '#', icon: HelpCircle, disabled: true },
      ]
    }
  ]

  return (
    <div className="w-[260px] bg-nexus-bg border-r border-nexus-border/50 h-full flex flex-col shrink-0">
      
      {/* Brand */}
      <div className="h-[72px] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Mini Ledger" width={28} height={28} />
          <span className="font-bold text-nexus-text text-xl tracking-tight">Mini Ledger</span>
        </div>
        <button className="w-8 h-8 rounded-md border border-nexus-border flex items-center justify-center text-nexus-textMuted hover:bg-slate-100 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
      
      {/* Scrollable Nav */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 no-scrollbar">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-[11px] font-semibold text-nexus-textMuted uppercase tracking-wider mb-3 px-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                      isActive 
                        ? 'bg-nexus-card text-nexus-text shadow-sm border border-nexus-border/50 font-medium' 
                        : 'text-nexus-textMuted hover:bg-slate-100 hover:text-nexus-text'
                    } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={(e) => item.disabled && e.preventDefault()}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${isActive ? 'text-nexus-primary' : 'text-nexus-textMuted'}`} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                    {item.tag && (
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-wide">
                        {item.tag}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="p-4 space-y-3 shrink-0">
        <div className="bg-nexus-card border border-nexus-border rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-400 flex items-center justify-center text-white">
              <Diamond className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-nexus-textMuted font-medium uppercase tracking-wider">Team</span>
              <span className="text-sm font-semibold text-nexus-text">Marketing</span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-nexus-textMuted" />
        </div>
        
        <button className="w-full py-2.5 rounded-xl border border-nexus-border text-sm font-semibold text-nexus-text hover:bg-slate-100 transition-colors bg-white shadow-sm">
          Upgrade Plan
        </button>
        
        <div className="text-center pt-2">
          <span className="text-[10px] text-nexus-textMuted">© 2026 miniledger.io, Inc.</span>
        </div>
      </div>
      
    </div>
  )
}
