'use client'

import { useState, useEffect } from 'react'
import { User, Bell, Shield, Moon, Save, Loader2 } from 'lucide-react'
import { useSettings } from '@/lib/hooks'
import api from '@/lib/api'

export default function SettingsPage() {
  const { settings, mutate, isLoading } = useSettings()
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    profession: '',
    email: '',
    base_currency: 'USD ($)',
    timezone: 'UTC (Coordinated Universal Time)'
  })
  
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (settings) {
      setFormData({
        first_name: settings.first_name || '',
        last_name: settings.last_name || '',
        profession: settings.profession || '',
        email: settings.email || '',
        base_currency: settings.base_currency || 'USD ($)',
        timezone: settings.timezone || 'UTC (Coordinated Universal Time)'
      })
    }
  }, [settings])

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put('/settings', formData)
      await mutate()
      // Optionally show a toast here
    } catch (error) {
      console.error("Failed to save settings", error)
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
  }

  return (
    <div className="pt-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-nexus-text tracking-tight">Settings</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-nexus-primary text-white rounded-lg shadow-sm text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Navigation */}
        <div className="col-span-1 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-nexus-card text-indigo-700 font-semibold rounded-lg border border-indigo-100 shadow-sm text-sm">
             <User className="w-4 h-4" />
             Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-50 font-medium rounded-lg text-sm transition-colors group relative overflow-hidden">
             <Bell className="w-4 h-4" />
             Notifications
             <div className="absolute inset-0 bg-slate-900/80 text-white flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
               Coming Soon
             </div>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-50 font-medium rounded-lg text-sm transition-colors group relative overflow-hidden">
             <Shield className="w-4 h-4" />
             Security
             <div className="absolute inset-0 bg-slate-900/80 text-white flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
               Coming Soon
             </div>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-50 font-medium rounded-lg text-sm transition-colors group relative overflow-hidden">
             <Moon className="w-4 h-4" />
             Appearance
             <div className="absolute inset-0 bg-slate-900/80 text-white flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
               Coming Soon
             </div>
          </button>
        </div>
        
        {/* Form Area */}
        <div className="col-span-1 md:col-span-3 space-y-6">
           
           <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm p-6">
             <h2 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Personal Information</h2>
             
             <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-200">
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${formData.first_name || 'User'}&backgroundColor=e9ecef`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                   <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm mb-2 relative group overflow-hidden">
                     Change Avatar
                     <div className="absolute inset-0 bg-slate-900/80 text-white flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                       Coming Soon
                     </div>
                   </button>
                   <p className="text-xs text-slate-400">JPG, GIF or PNG. 1MB max.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">First Name</label>
                 <input 
                   type="text" 
                   value={formData.first_name} 
                   onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700" 
                 />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">Last Name</label>
                 <input 
                   type="text" 
                   value={formData.last_name}
                   onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700" 
                 />
               </div>
               <div className="md:col-span-2">
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">Profession</label>
                 <input 
                   type="text" 
                   value={formData.profession}
                   onChange={(e) => setFormData({...formData, profession: e.target.value})}
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700" 
                 />
               </div>
               <div className="md:col-span-2">
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
                 <input 
                   type="email" 
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700" 
                 />
               </div>
             </div>
           </div>

           <div className="bg-nexus-card border border-nexus-border rounded-xl shadow-sm p-6">
             <h2 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Currency & Region</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">Base Currency</label>
                 <select 
                   value={formData.base_currency}
                   onChange={(e) => setFormData({...formData, base_currency: e.target.value})}
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700 bg-white"
                 >
                   <option value="USD ($)">USD ($)</option>
                   <option value="EUR (€)">EUR (€)</option>
                   <option value="GBP (£)">GBP (£)</option>
                   <option value="INR (₹)">INR (₹)</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5">Timezone</label>
                 <select 
                   value={formData.timezone}
                   onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700 bg-white"
                 >
                   <option value="UTC (Coordinated Universal Time)">UTC (Coordinated Universal Time)</option>
                   <option value="EST (Eastern Standard Time)">EST (Eastern Standard Time)</option>
                   <option value="IST (Indian Standard Time)">IST (Indian Standard Time)</option>
                 </select>
               </div>
             </div>
           </div>
           
        </div>
      </div>
    </div>
  )
}
