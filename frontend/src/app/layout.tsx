import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Mini-Ledger',
  description: 'AI-powered personal finance ledger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-nexus-bg text-nexus-text flex min-h-screen`}>
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-screen relative w-full">
          {/* Top Navbar */}
          <header className="h-[72px] flex items-center justify-between px-4 md:px-8 shrink-0 z-40 border-b border-nexus-border/50 bg-nexus-bg sticky top-0">
            {/* Search Bar */}
            <div className="relative w-64 md:w-96 hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-nexus-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="text" className="w-full pl-10 pr-12 py-2 bg-nexus-card border border-nexus-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-nexus-primary shadow-sm" placeholder="Search" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-xs text-nexus-textMuted font-mono tracking-widest">⌘+F</span>
              </div>
            </div>
            
            <div className="sm:hidden font-bold text-nexus-primary">Mini Ledger</div>
            
            {/* Right Actions */}
            <div className="flex items-center gap-4 md:gap-6">
               <div className="hidden md:flex items-center gap-4 text-nexus-textMuted">
                 <button className="hover:text-nexus-text transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg></button>
                 <button className="hover:text-nexus-text transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
                 <button className="hover:text-nexus-text transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></button>
               </div>
               <div className="flex items-center gap-3 border-l border-nexus-border pl-4 md:pl-6 cursor-pointer hover:opacity-80 transition-opacity">
                 <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Ujjwal&backgroundColor=e9ecef" alt="Ujjwal Jagtap" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-xs font-semibold text-nexus-text">Ujjwal Jagtap</span>
                   <span className="text-[10px] text-nexus-textMuted">Software Engineer</span>
                 </div>
               </div>
            </div>
          </header>
          
          <div className="flex-1 px-4 md:px-8 pb-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
