import React from "react";

const RECENT_ITEMS = [
  {
    token: "ECO-2025-088",
    status: "Neutralized",
    title: "Canal Reach 3A Outfall",
    desc: "Dark effluent neutralized with containment berm. Water dissolved oxygen restored to safe 6.1 mg/L.",
    time: "Resolved 1 hr ago",
    tag: "EPA Verified",
  },
  {
    token: "ECO-2025-087",
    status: "Lab Tested",
    title: "Power Plant Silt Gate Runoff",
    desc: "High temperature cooling outflow sampled; filters replaced by operator under official notice.",
    time: "Tested 2.5 hrs ago",
    tag: "Lab Batch #441",
  },
  {
    token: "ECO-2025-086",
    status: "In Progress",
    title: "Agricultural Drainage Ditch",
    desc: "Unusual discoloration checked; local weir buffer engaged to protect downstream drinking basin.",
    time: "Reported 4 hrs ago",
    tag: "Crews On Site",
  },
];

export default function RecentAlerts() {
  return (
    <section
      className="w-full px-6 lg:px-8 py-14 bg-surface border-t border-[#e4dfd7]"
      id="recentAlertsSection"
    >
      <div id="waterQualityMapSection" aria-hidden="true" className="relative -top-20" />
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1f6e72]">
              Community Transparency
            </span>
            <h2 className="text-2xl lg:text-3xl text-[#182230] font-bold tracking-tight">
              Recent Water Alerts Handled
            </h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#ffffff] border border-[#e4dfd7] text-xs font-semibold text-[#182230]">
            <span className="w-2 h-2 rounded-full bg-[#1f6e72]"></span>
            <span>8 Field Crews Actively In Service</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECENT_ITEMS.map((item) => (
            <div
              key={item.token}
              className="p-5 rounded-xl bg-[#ffffff] border border-[#e4dfd7] shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#182230]">
                    {item.token}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#f8f3ee] border border-[#e4dfd7] text-[#1f6e72] font-mono font-bold text-[10px] uppercase">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#182230]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#4a5568] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-[#e4dfd7] text-xs text-[#4a5568] flex justify-between">
                <span>{item.time}</span>
                <span className="text-[#182230] font-semibold">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
