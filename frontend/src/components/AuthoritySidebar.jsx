import React from 'react';

export default function AuthoritySidebar({ onNavigate, activeTab = 'overview', setActiveTab }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-slate-900 text-slate-400 z-50 flex flex-col border-r border-slate-800">
      {/* Brand / Authority Title */}
      <div className="px-6 pt-6 pb-4 flex flex-col gap-2.5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-teal-brand flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[20px]">water</span>
          </div>
          <span className="font-bold tracking-tight text-white text-2xl">Eco-Watch</span>
        </div>
        <div className="inline-flex items-center px-2 py-1 bg-slate-850/80 border border-slate-700/60 rounded text-[11px] tracking-wider font-semibold text-slate-300 uppercase">
          <span className="material-symbols-outlined text-[14px] mr-1.5 text-teal-subtle">shield</span>
          ENVIRONMENTAL PROTECTION AUTHORITY
        </div>
      </div>

      {/* Live Telemetry Status Bar */}
      <div className="px-5 py-3 border-b border-slate-800/80">
        <div className="w-full flex items-center justify-between px-3 py-2 bg-slate-850/70 border border-slate-800 rounded">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-subtle animate-pulse"></span>
            <span className="text-xs text-slate-300 font-medium">Sensors Online</span>
          </div>
          <span className="text-xs font-mono font-semibold text-white">98.4%</span>
        </div>
      </div>

      {/* Navigation Menus */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5 text-sm">
        {/* Operations */}
        <div className="flex flex-col gap-1">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Operations</span>
          <nav className="flex flex-col gap-1 mt-1">
            <button
              onClick={() => setActiveTab && setActiveTab('overview')}
              className={`flex items-center w-full px-3 py-2 rounded text-left transition-colors font-medium ${
                activeTab === 'overview'
                  ? 'bg-teal-brand text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined mr-3 text-[19px]">dashboard</span>Overview
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('monitoring')}
              className={`flex items-center w-full px-3 py-2 rounded text-left transition-colors ${
                activeTab === 'monitoring'
                  ? 'bg-teal-brand text-white shadow-xs font-medium'
                  : 'text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined mr-3 text-[19px]">water_ec</span>Water Monitoring
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('incidents')}
              className={`flex items-center w-full px-3 py-2 rounded text-left transition-colors ${
                activeTab === 'incidents'
                  ? 'bg-teal-brand text-white shadow-xs font-medium'
                  : 'text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined mr-3 text-[19px]">warning</span>Incident Reports
            </button>
          </nav>
        </div>

        {/* Forensics & Triage */}
        <div className="flex flex-col gap-1">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Forensics &amp; Triage</span>
          <nav className="flex flex-col gap-1 mt-1">
            <button
              onClick={() => setActiveTab && setActiveTab('deepdive')}
              className={`flex items-center w-full px-3 py-2 rounded text-left transition-colors ${
                activeTab === 'deepdive'
                  ? 'bg-teal-brand text-white shadow-xs font-medium'
                  : 'text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined mr-3 text-[19px]">travel_explore</span>Incident Deep Dive
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('aianalysis')}
              className={`flex items-center w-full px-3 py-2 rounded text-left transition-colors ${
                activeTab === 'aianalysis'
                  ? 'bg-teal-brand text-white shadow-xs font-medium'
                  : 'text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined mr-3 text-[19px]">psychology</span>AI Analysis
            </button>
          </nav>
        </div>

        {/* Statutory Compliance */}
        <div className="flex flex-col gap-1">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Statutory Compliance</span>
          <nav className="flex flex-col gap-1 mt-1">
            <button
              onClick={() => setActiveTab && setActiveTab('compliance')}
              className={`flex items-center w-full px-3 py-2 rounded text-left transition-colors ${
                activeTab === 'compliance'
                  ? 'bg-teal-brand text-white shadow-xs font-medium'
                  : 'text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined mr-3 text-[19px]">description</span>Compliance Documents
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('actions')}
              className={`flex items-center w-full px-3 py-2 rounded text-left transition-colors ${
                activeTab === 'actions'
                  ? 'bg-teal-brand text-white shadow-xs font-medium'
                  : 'text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined mr-3 text-[19px]">task_alt</span>Action Tracker
            </button>
          </nav>
        </div>
      </div>

      {/* Sidebar Bottom Footer */}
      <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate && onNavigate('citizen-dashboard')}
            className="text-teal-subtle hover:text-white transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">dashboard</span>Citizen Dashboard
          </button>
          <button
            onClick={() => onNavigate && onNavigate('landing')}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">home</span>Home
          </button>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>EPA-DISPATCH-V2</span>
          <span>AUTHORITY ONLY</span>
        </div>
      </div>
    </aside>
  );
}

