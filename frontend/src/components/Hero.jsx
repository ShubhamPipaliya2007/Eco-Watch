import React, { useState } from "react";

export default function Hero({ onTrack }) {
  const [tokenInput, setTokenInput] = useState("");

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    onTrack(tokenInput.trim() || "ECO-2025-089");
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="w-full bg-[#ffffff] px-6 lg:px-8 py-14 border-b border-[#e4dfd7]"
      id="quickTrackSection"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8 flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded bg-[#f8f3ee] border border-[#e4dfd7] text-[#182230] text-[11px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1f6e72]"></span> Fast
            &amp; Simple Citizen Reporting
          </div>
          <h1 className="text-4xl lg:text-5xl text-[#182230] font-extrabold tracking-tight leading-[1.15]">
            Report Water Pollution <br />
            <span className="text-[#1f6e72]">In 3 Easy Steps</span>
          </h1>
          <p className="text-base text-[#4a5568] max-w-2xl leading-relaxed">
            Spotted murky water, chemical smells, or floating waste? Help local
            environmental hydrology teams take swift action in under 2 minutes.
            No complicated forms or sign-up required.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1f6e72] text-[#ffffff] text-sm font-bold shadow-sm hover:bg-[#155255] transition-colors cursor-pointer"
              href="#reportFormSection"
              onClick={(e) => handleSmoothScroll(e, "reportFormSection")}
            >
              <span className="material-symbols-outlined text-[20px]">
                add_alert
              </span>
              Report Pollution Now
            </a>
            <a
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#e4dfd7] bg-[#f8f3ee] text-[#182230] hover:bg-[#ded9d4]/40 text-sm font-bold transition-colors cursor-pointer"
              href="#howItWorksSection"
              onClick={(e) => handleSmoothScroll(e, "howItWorksSection")}
            >
              <span className="material-symbols-outlined text-[18px] text-[#1f6e72]">
                play_circle
              </span>
              How It Works (60s)
            </a>
          </div>
        </div>

        {/* Quick Track Lookup Box */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-xl bg-[#f8f3ee] border border-[#e4dfd7] shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#182230] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#1f6e72] text-[20px]">
                  search_check
                </span>
                Check Report Status
              </span>
              <span className="text-[11px] text-[#1f6e72] font-bold flex items-center gap-1 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1f6e72]"></span>{" "}
                Active Updates
              </span>
            </div>
            <p className="text-xs text-[#4a5568] leading-relaxed">
              Have a report reference code? Track field inspections and clean-up
              progress anytime.
            </p>
            <form onSubmit={handleTrackSubmit} className="flex gap-2 mt-1">
              <input
                className="w-full bg-[#ffffff] px-3.5 py-2.5 rounded-lg text-sm text-[#182230] font-mono outline-none border border-[#e4dfd7] focus:border-[#1f6e72] transition-colors"
                id="quickTokenInput"
                placeholder="e.g. ECO-2025-089"
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
              />
              <button
                className="px-4 py-2.5 bg-[#182230] text-[#ffffff] rounded-lg text-xs font-bold hover:bg-[#182230]/90 transition-colors shrink-0"
                type="submit"
              >
                Track
              </button>
            </form>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#4a5568]">
              <span className="material-symbols-outlined text-[16px] text-[#1f6e72]">
                check_circle
              </span>
              <span>
                Average inspector dispatch:{" "}
                <strong className="text-[#182230]">32 minutes</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
