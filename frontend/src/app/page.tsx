import SummaryCards from '@/components/SummaryCards'
import { SalesOverviewChart, TotalSubscriberChart } from '@/components/DashboardCharts'
import { Calendar, ChevronDown, Filter, DownloadCloud } from 'lucide-react'
import DashboardHeader from '@/components/DashboardHeader'

export default function Home() {
  return (
    <div className="py-6">
      <DashboardHeader />
      
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
