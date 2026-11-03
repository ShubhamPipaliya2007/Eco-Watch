import React from "react";

export default function SosBanner() {
  return (
    <div className="w-full bg-[#fbeae8] text-[#691b14] px-6 py-2.5 border-b border-[#e4dfd7] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined text-[18px] text-[#b85042]">
            emergency
          </span>
          <span>
            Spotted a hazardous chemical emergency? Call the 24/7 hotline
            directly:{" "}
            <a
              className="font-bold underline text-[#b85042] hover:text-[#182230]"
              href="tel:18002782767"
            >
              1800-ECO-WATCH
            </a>
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded border border-[#e4dfd7] bg-[#ffffff] text-[#b85042] font-bold text-[11px] tracking-wider uppercase">
          Toll-Free Immediate Dispatch
        </span>
      </div>
    </div>
  );
}
