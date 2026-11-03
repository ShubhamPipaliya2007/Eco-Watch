import React from "react";

export default function AuthorityHeader({ searchTerm, onSearchChange }) {
  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/95 backdrop-blur border-b border-sand-border z-40 px-8 flex items-center justify-between gap-6">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search contaminants, sensor IDs, basins..."
            className="w-full pl-10 pr-4 py-2 bg-sand-100 rounded border border-sand-border text-xs text-slate-850 placeholder:text-slate-400 focus:outline-none focus:border-teal-brand focus:bg-white transition-all"
          />
        </div>
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-sand-100 border border-sand-border rounded text-slate-700 text-xs font-medium cursor-pointer">
          <span className="material-symbols-outlined text-teal-brand text-[16px]">
            layers
          </span>
          <span>Basin Sector 4 - North Reach</span>
          <span className="material-symbols-outlined text-[16px] text-slate-400">
            arrow_drop_down
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="relative p-2 text-slate-600 hover:text-slate-850 hover:bg-sand-200 rounded transition-colors"
          type="button"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-[20px]">
            notifications
          </span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-terra-solid"></span>
        </button>

        <div className="h-6 w-px bg-sand-border"></div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-slate-850 text-white flex items-center justify-center font-bold text-xs">
            EV
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="text-xs font-semibold text-slate-900 leading-tight">
              Dr. Elena Vance
            </span>
            <span className="text-[11px] text-slate-500">
              Chief Hydrological Officer
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
