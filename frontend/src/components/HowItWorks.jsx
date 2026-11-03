import React from "react";

export default function HowItWorks() {
  return (
    <section
      className="w-full px-6 lg:px-8 py-14 bg-[#ffffff] border-t border-[#e4dfd7]"
      id="howItWorksSection"
    >
      <div id="guidelinesSection" aria-hidden="true" className="relative -top-20" />
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1f6e72]">
            Clear &amp; Accountable
          </span>
          <h2 className="text-2xl lg:text-3xl text-[#182230] font-bold mt-1 tracking-tight">
            What Happens After You Report?
          </h2>
          <p className="text-sm text-[#4a5568] mt-2 leading-relaxed">
            Every alert is tracked transparently until water testing confirms
            safe baseline levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-xl bg-[#f8f3ee] border border-[#e4dfd7] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#182230] text-[#ffffff] flex items-center justify-center font-bold text-base mb-3">
                1
              </div>
              <h3 className="text-base font-bold text-[#182230]">
                You Submit in 60s
              </h3>
              <p className="text-xs text-[#4a5568] leading-relaxed">
                Your phone's GPS coordinates and photo instantly log an
                encrypted ticket with the regional water board.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#e4dfd7] flex items-center justify-between text-xs text-[#4a5568]">
              <span>Step Time: ~1 Min</span>
              <span className="text-[#1f6e72] font-bold">
                Auto-Token Generated
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-xl bg-[#f8f3ee] border border-[#e4dfd7] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#1f6e72] text-[#ffffff] flex items-center justify-center font-bold text-base mb-3">
                2
              </div>
              <h3 className="text-base font-bold text-[#182230]">
                Inspectors Dispatched
              </h3>
              <p className="text-xs text-[#4a5568] leading-relaxed">
                Mobile water patrol units test turbidity, pH, and dissolved
                oxygen on-site within 45 minutes for urgent hazards.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#e4dfd7] flex items-center justify-between text-xs text-[#4a5568]">
              <span>Response: &lt; 45 Mins</span>
              <span className="text-[#182230] font-bold">
                Containment Deployed
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-xl bg-[#f8f3ee] border border-[#e4dfd7] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#182230] text-[#ffffff] flex items-center justify-center font-bold text-base mb-3">
                3
              </div>
              <h3 className="text-base font-bold text-[#182230]">
                Resolved &amp; Updated
              </h3>
              <p className="text-xs text-[#4a5568] leading-relaxed">
                Remediation barrier installed, outfalls shut off, and you
                receive an SMS update showing lab test results.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#e4dfd7] flex items-center justify-between text-xs text-[#4a5568]">
              <span>Closure Proof Sent</span>
              <span className="text-[#1f6e72] font-bold">
                Water Safeguarded
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
