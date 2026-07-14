import SummaryCards from '@/components/SummaryCards'

export default function Home() {
  return (
    <div className="p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      </header>
      
      <h2 className="text-lg font-semibold text-slate-700 mb-4">Financial Summary</h2>
      <SummaryCards />
    </div>
  )
}
