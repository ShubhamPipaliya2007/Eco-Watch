import React from "react";

export default function TrackingModal({ report, onClose }) {
  if (!report) return null;

  const analysis = report.backendAnalysis || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#182230]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#ffffff] rounded-xl max-w-lg w-full p-6 shadow-xl relative animate-in zoom-in-95 duration-200 border border-[#e4dfd7]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e4dfd7]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1f6e72] text-[22px]">
              verified
            </span>
            <span className="text-base text-[#182230] font-bold">
              Report Status:{" "}
              <span className="text-[#1f6e72] font-mono">
                {report.token || "ECO-2025-089"}
              </span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#f8f3ee] hover:bg-[#ded9d4] text-[#182230] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Backend Analysis Banner */}
          {analysis.status && (
            <div className="p-4 rounded-lg bg-[#f0fdf4] border border-[#bbf7d0] text-emerald-900 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Backend Analysis Dispatch
                </span>
                {analysis.severity && (
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold uppercase tracking-wider text-[10px]">
                    {analysis.severity} Priority
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold">{analysis.message}</p>
              {analysis.rule_broken && (
                <div className="text-xs text-emerald-800 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">
                    gavel
                  </span>
                  <span>
                    <strong>Statutory Norm:</strong> {analysis.rule_broken}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Assigned Team */}
          <div className="p-4 rounded-lg bg-[#f8f3ee] border border-[#e4dfd7] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#4a5568] uppercase font-mono">
                Assigned Team
              </div>
              <div className="text-sm font-bold text-[#182230]">
                Rapid Hydrology Response Team 4
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#ffffff] border border-[#e4dfd7] text-[#1f6e72] text-[10px] font-bold uppercase tracking-wider">
              Inspectors En Route
            </span>
          </div>

          {/* Reported Title & Details */}
          {report.title && (
            <div className="p-3 rounded-lg bg-[#f8f3ee] border border-[#e4dfd7] text-xs text-[#182230] space-y-1">
              <div className="font-semibold text-slate-900">{report.title}</div>
              <p className="text-[#4a5568] line-clamp-2">
                {report.description}
              </p>
            </div>
          )}

          {/* SMS Notice */}
          <div className="p-3 rounded-lg bg-[#f8f3ee] border border-[#e4dfd7] text-xs text-[#182230] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#1f6e72]">
              sms
            </span>
            <span>
              {report.phone && !report.isAnonymous
                ? `SMS notification dispatched to ${report.phone} with live field updates.`
                : "Anonymous tracking reference activated. Save your token above for status lookup."}
            </span>
          </div>

          {/* Action */}
          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#182230] text-[#ffffff] rounded-lg text-xs font-bold hover:bg-[#182230]/90 transition-colors"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
