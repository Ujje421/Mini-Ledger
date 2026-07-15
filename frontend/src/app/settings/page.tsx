'use client'

import { User, Bell, Shield, Moon, Save } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="pt-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-nexus-text tracking-tight">Settings</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-nexus-primary text-white rounded-lg shadow-sm text-sm font-medium hover:bg-indigo-700 transition-colors">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Navigation */}
        <div className="col-span-1 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-nexus-card text-indigo-700 font-semibold rounded-lg border border-indigo-100 shadow-sm text-sm">
             <User className="w-4 h-4" />
             Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-50 font-medium rounded-lg text-sm transition-colors">
             <Bell className="w-4 h-4" />
             Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-50 font-medium rounded-lg text-sm transition-colors">
             <Shield className="w-4 h-4" />
             Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-50 font-medium rounded-lg text-sm transition-colors">
             <Moon className="w-4 h-4" />
             Appearance
          </button>
        </div>
        
        {/* Form Area */}
        <div className="col-span-1 md:col-span-3 space-y-6">
           
           <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm p-6">
             <h2 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Personal Information</h2>
             
             <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-200">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Ujjwal&backgroundColor=e9ecef" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                   <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm mb-2">
                     Change Avatar
                   </button>
                   <p className="text-xs text-slate-400">JPG, GIF or PNG. 1MB max.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">First Name</label>
                 <input type="text" defaultValue="Ujjwal" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700" />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">Last Name</label>
                 <input type="text" defaultValue="Jagtap" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700" />
               </div>
               <div className="md:col-span-2">
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">Profession</label>
                 <input type="text" defaultValue="Software Engineer" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700" />
               </div>
               <div className="md:col-span-2">
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
                 <input type="email" defaultValue="ujjwal@example.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700" />
               </div>
             </div>
           </div>

           <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm p-6">
             <h2 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Currency & Region</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">Base Currency</label>
                 <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700 bg-white">
                   <option>USD ($)</option>
                   <option>EUR (€)</option>
                   <option>GBP (£)</option>
                   <option>INR (₹)</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">Timezone</label>
                 <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700 bg-white">
                   <option>UTC (Coordinated Universal Time)</option>
                   <option>EST (Eastern Standard Time)</option>
                   <option>IST (Indian Standard Time)</option>
                 </select>
               </div>
             </div>
           </div>
           
        </div>
      </div>
    </div>
  )
}
