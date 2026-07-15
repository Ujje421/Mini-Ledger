'use client'

import { HelpCircle, Mail, MessageSquare, BookOpen, ChevronDown } from 'lucide-react'

export default function HelpPage() {
  return (
    <div className="pt-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-nexus-text tracking-tight">Help & Support</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-indigo-100 rounded-xl p-6 shadow-sm flex flex-col items-center text-center group relative overflow-hidden cursor-pointer hover:border-indigo-300 transition-colors">
          <div className="absolute inset-0 bg-slate-900/80 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white font-bold tracking-wider uppercase text-xs">Coming Soon</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 mb-1 relative z-10">Documentation</h2>
          <p className="text-xs text-slate-500 relative z-10">Read our detailed guides</p>
        </div>
        <div className="bg-white border border-indigo-100 rounded-xl p-6 shadow-sm flex flex-col items-center text-center group relative overflow-hidden cursor-pointer hover:border-indigo-300 transition-colors">
          <div className="absolute inset-0 bg-slate-900/80 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white font-bold tracking-wider uppercase text-xs">Coming Soon</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 mb-1 relative z-10">Community Forum</h2>
          <p className="text-xs text-slate-500 relative z-10">Connect with other users</p>
        </div>
        <div className="bg-white border border-indigo-100 rounded-xl p-6 shadow-sm flex flex-col items-center text-center group relative overflow-hidden cursor-pointer hover:border-indigo-300 transition-colors">
          <div className="absolute inset-0 bg-slate-900/80 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white font-bold tracking-wider uppercase text-xs">Coming Soon</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 mb-1 relative z-10">Contact Us</h2>
          <p className="text-xs text-slate-500 relative z-10">Get help from our team</p>
        </div>
      </div>

      <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-800">Frequently Asked Questions</h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {[
            { q: "How do I connect my bank account?", a: "Bank connection features are part of the Automation Pro package. You can set up manual imports via CSV in the meantime." },
            { q: "Is my financial data secure?", a: "Yes, we use bank-level 256-bit AES encryption to store all financial data. Your passwords are never stored in plain text." },
            { q: "Can I export my data to TurboTax?", a: "Yes, you can use the 'Export' button on the Dashboard to download a CSV which is compatible with major tax software." },
            { q: "How does the AI Assistant work?", a: "Our Ask Ledger feature uses advanced Natural Language Processing to read your transaction history. Just ask it 'How much did I spend on food this month?' and it calculates it instantly." }
          ].map((faq, i) => (
            <div key={i} className="p-6 hover:bg-slate-50/50 transition-colors cursor-pointer group">
               <div className="flex justify-between items-center">
                 <h3 className="text-sm font-semibold text-slate-800">{faq.q}</h3>
                 <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
               </div>
               <p className="text-sm text-slate-500 mt-2 pr-8">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
