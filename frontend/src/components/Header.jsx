import React from "react";

export default function Header({ onNavigate, activePage = "citizen" }) {
  const scrollToSection = (e, targetId) => {
    e.preventDefault();

    const performScroll = () => {
      const element =
        document.getElementById(targetId) ||
        (targetId === "waterQualityMapSection" && document.getElementById("recentAlertsSection")) ||
        (targetId === "guidelinesSection" && document.getElementById("howItWorksSection"));

      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    if (activePage !== "citizen" && onNavigate) {
      onNavigate("citizen");
      setTimeout(performScroll, 150);
    } else {
      performScroll();
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#e4dfd7]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            if (activePage !== "citizen" && onNavigate) {
              onNavigate("citizen");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-10 h-10 rounded-lg bg-[#182230] flex items-center justify-center text-[#ffffff] shadow-sm">
            <span className="material-symbols-outlined text-[24px]">
              water_drop
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl lg:text-3xl text-[#182230] tracking-tight leading-none">
              Eco-Watch
            </span>
            <span className="text-[11px] font-semibold text-[#4a5568] tracking-widest uppercase mt-1">
              Citizen Water Safety Portal
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#reportFormSection"
            onClick={(e) => scrollToSection(e, "reportFormSection")}
            className={`text-sm font-bold pb-1 transition-colors cursor-pointer ${
              activePage === "citizen"
                ? "text-[#1f6e72] border-b-2 border-[#1f6e72]"
                : "text-[#4a5568] hover:text-[#182230]"
            }`}
          >
            Report Incident
          </a>
          <a
            href="#quickTrackSection"
            onClick={(e) => scrollToSection(e, "quickTrackSection")}
            className="text-sm font-semibold text-[#4a5568] hover:text-[#182230] transition-colors cursor-pointer"
          >
            Track Report
          </a>
          <a
            href="#recentAlertsSection"
            onClick={(e) => scrollToSection(e, "recentAlertsSection")}
            className="text-sm font-semibold text-[#4a5568] hover:text-[#182230] transition-colors cursor-pointer"
          >
            Water Quality Map
          </a>
          <a
            href="#howItWorksSection"
            onClick={(e) => scrollToSection(e, "howItWorksSection")}
            className="text-sm font-semibold text-[#4a5568] hover:text-[#182230] transition-colors cursor-pointer"
          >
            Guidelines
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              onNavigate &&
              onNavigate(activePage === "authority" ? "citizen" : "authority")
            }
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors tracking-wide ${
              activePage === "authority"
                ? "bg-[#1f6e72] hover:bg-[#155255] text-white shadow-sm"
                : "bg-[#182230] hover:bg-[#182230]/90 text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {activePage === "authority" ? "public" : "admin_panel_settings"}
            </span>
            {activePage === "authority"
              ? "Back to Citizen Portal"
              : "Authority Portal Access"}
          </button>
          <div
            className="w-9 h-9 rounded-lg border border-[#e4dfd7] bg-[#f8f3ee] flex items-center justify-center text-[#182230]"
            title="User Profile"
          >
            <span className="material-symbols-outlined text-[18px]">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
