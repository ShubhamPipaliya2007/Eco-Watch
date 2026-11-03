import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#ffffff] border-t border-[#e4dfd7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#182230] flex items-center justify-center text-[#ffffff]">
                <span className="material-symbols-outlined text-[20px]">
                  water_drop
                </span>
              </div>
              <span className="text-2xl font-bold text-[#182230] tracking-tight">
                Eco-Watch
              </span>
            </div>
            <p className="text-xs text-[#4a5568] max-w-md leading-relaxed">
              Turning Water Data Into Environmental Action. A public-private
              environmental telemetry and incident reporting infrastructure
              connecting citizens with municipal environmental protection
              authorities.
            </p>
            <div className="flex items-center gap-1.5 text-[#1f6e72] text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              <span className="uppercase tracking-wider text-[10px]">
                Official State Hydrology Monitoring Affiliate
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider text-[#182230] font-bold mb-1">
              Emergency Helplines
            </span>
            <span className="text-xs text-[#182230] font-semibold">
              24/7 Spill Emergency: 1-800-ECO-WATCH
            </span>
            <span className="text-xs text-[#4a5568]">
              Municipal Water Advisory Desk: 1-800-555-0199
            </span>
            <span className="text-xs text-[#4a5568]">
              Toxic Containment Dispatch: Ext. 404
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider text-[#182230] font-bold mb-1">
              Statutory &amp; Open Data
            </span>
            <a
              className="text-xs text-[#4a5568] hover:text-[#1f6e72] transition-colors"
              href="#"
            >
              Public Watershed API
            </a>
            <a
              className="text-xs text-[#4a5568] hover:text-[#1f6e72] transition-colors"
              href="#"
            >
              Safe Drinking Water Act Guidelines
            </a>
            <a
              className="text-xs text-[#4a5568] hover:text-[#1f6e72] transition-colors"
              href="#"
            >
              Environmental Protection Act Disclaimers
            </a>
            <a
              className="text-xs text-[#4a5568] hover:text-[#1f6e72] transition-colors"
              href="#"
            >
              Privacy &amp; Anonymity Policy
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-[#e4dfd7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4a5568]">
          <p>
            © 2025 Eco-Watch Environmental Protection Division. All citizen data
            encrypted under EPA Sec-4 Standard.
          </p>
          <p className="font-mono text-[11px]">SYS-VER: 4.18.2-PROD</p>
        </div>
      </div>
    </footer>
  );
}
