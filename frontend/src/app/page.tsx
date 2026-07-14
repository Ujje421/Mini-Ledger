import SummaryCards from '@/components/SummaryCards'
import { SalesOverviewChart, TotalSubscriberChart } from '@/components/DashboardCharts'
import { Calendar, ChevronDown, Filter, DownloadCloud } from 'lucide-react'

export default function Home() {
  return (
    <div className="py-6">
      {/* Header Area */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-nexus-text tracking-tight">Dashboard</h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-nexus-card border border-nexus-border rounded-lg shadow-sm text-sm font-medium text-nexus-text">
            <button className="flex items-center gap-2 px-3 py-2 border-r border-nexus-border hover:bg-slate-50 transition-colors rounded-l-lg">
              <Calendar className="w-4 h-4 text-nexus-textMuted" />
              <span>Oct 18 - Nov 18</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 transition-colors rounded-r-lg">
              <span>Monthly</span>
              <ChevronDown className="w-4 h-4 text-nexus-textMuted" />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-3 py-2 bg-nexus-card border border-nexus-border rounded-lg shadow-sm text-sm font-medium text-nexus-text hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 text-nexus-textMuted" />
            <span>Filter</span>
          </button>
          
          <button className="flex items-center gap-2 px-3 py-2 bg-nexus-card border border-nexus-border rounded-lg shadow-sm text-sm font-medium text-nexus-text hover:bg-slate-50 transition-colors">
            <DownloadCloud className="w-4 h-4 text-nexus-textMuted" />
            <span>Export</span>
          </button>
        </div>
      </header>
      
      {/* Main Content Grid */}
      <div className="space-y-6">
        <SummaryCards />
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 bg-nexus-card border border-nexus-border rounded-xl shadow-sm min-h-[400px]">
              <SalesOverviewChart />
           </div>
           <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm min-h-[400px]">
              <TotalSubscriberChart />
           </div>
        </div>
      </div>
    </div>
  )
}
