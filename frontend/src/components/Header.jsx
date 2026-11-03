import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header({ onNavigate, activePage = "landing" }) {
  const { currentUser, logout, openAuthModal } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToHomeSection = (e, targetSectionId) => {
    if (e) e.preventDefault();
    const performScroll = () => {
      const el = document.getElementById(targetSectionId);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    };

    if (activePage !== "landing" && onNavigate) {
      onNavigate("landing");
      setTimeout(performScroll, 150);
    } else {
      performScroll();
    }
  };

  const handleCitizenNav = (e) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate("citizen-dashboard");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#e4dfd7]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => {
            if (onNavigate) onNavigate("landing");
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

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          <button
            type="button"
            onClick={() => {
              if (onNavigate) onNavigate("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`text-sm font-bold pb-1 transition-colors cursor-pointer ${
              activePage === "landing"
                ? "text-[#1f6e72] border-b-2 border-[#1f6e72]"
                : "text-[#4a5568] hover:text-[#182230]"
            }`}
          >
            Public Home
          </button>

          <button
            type="button"
            onClick={handleCitizenNav}
            className={`text-sm font-bold pb-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activePage === "citizen-dashboard"
                ? "text-[#1f6e72] border-b-2 border-[#1f6e72]"
                : "text-[#4a5568] hover:text-[#182230]"
            }`}
          >
            <span className="material-symbols-outlined text-[17px] text-[#1f6e72]">
              assignment_add
            </span>
            Citizen Dashboard
          </button>

          {/* Core informational navigation links visible on Public Home */}
          {activePage === "landing" && (
            <>
              <button
                type="button"
                onClick={(e) => scrollToHomeSection(e, "howItWorksSection")}
                className="text-sm font-semibold text-[#4a5568] hover:text-[#182230] transition-colors cursor-pointer"
              >
                How It Works
              </button>
              <button
                type="button"
                onClick={(e) => scrollToHomeSection(e, "recentAlertsSection")}
                className="text-sm font-semibold text-[#4a5568] hover:text-[#182230] transition-colors cursor-pointer"
              >
                Recent Alerts
              </button>
              <button
                type="button"
                onClick={(e) => scrollToHomeSection(e, "quickTrackSection")}
                className="text-sm font-semibold text-[#4a5568] hover:text-[#182230] transition-colors cursor-pointer"
              >
                Track Report
              </button>
            </>
          )}
        </nav>

        {/* Right Actions: Authority Portal Access & Citizen Profile/Auth */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Authority Portal Access Button: Exclusively routes to the Authority Command Center */}
          <button
            onClick={() => onNavigate && onNavigate("authority")}
            className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors tracking-wide ${
              activePage === "authority"
                ? "bg-[#1f6e72] hover:bg-[#155255] text-white shadow-sm"
                : "bg-[#182230] hover:bg-[#182230]/90 text-white shadow-sm"
            }`}
            title="Access the Authority Triage & Overview Command Center"
          >
            <span className="material-symbols-outlined text-[16px]">
              admin_panel_settings
            </span>
            <span>Authority Portal Access</span>
          </button>

          {/* User Account / Profile Section */}
          <div className="relative" ref={dropdownRef}>
            {currentUser ? (
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-[#e4dfd7] bg-[#f8f3ee] hover:bg-[#ded9d4]/40 text-[#182230] transition-colors cursor-pointer"
                title="Citizen Profile Menu"
              >
                <div className="w-7 h-7 rounded-full bg-[#1f6e72] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                  {currentUser.fullName ? currentUser.fullName.charAt(0) : "U"}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#182230] leading-none max-w-[120px] truncate">
                    {currentUser.fullName}
                  </span>
                  <span className="text-[10px] text-[#1f6e72] font-semibold mt-0.5">
                    Verified Citizen
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#4a5568]">
                  expand_more
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold text-[#182230] hover:text-[#1f6e72] transition-colors cursor-pointer border border-transparent hover:border-[#e4dfd7]"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal("signup")}
                  className="px-3.5 py-2 rounded-lg bg-[#1f6e72] hover:bg-[#155255] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Profile Dropdown Menu (Strict Light Theme) */}
            {currentUser && isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#ffffff] rounded-xl shadow-xl border border-[#e4dfd7] p-3.5 z-50 text-[#182230] animate-fadeIn">
                <div className="pb-3 border-b border-[#e4dfd7] mb-2 px-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[#1f6e72] text-[18px]">
                      account_circle
                    </span>
                    <p className="text-xs font-bold text-[#182230] truncate">
                      {currentUser.fullName}
                    </p>
                  </div>
                  <p className="text-[11px] text-[#4a5568] font-mono truncate pl-6">
                    {currentUser.email}
                  </p>
                  {currentUser.phone && (
                    <p className="text-[10px] text-[#1f6e72] font-mono mt-0.5 pl-6">
                      {currentUser.phone}
                    </p>
                  )}
                </div>

                <div className="px-2.5 py-2 rounded-lg bg-[#f8f3ee] text-[11px] text-[#182230] flex items-center justify-between mb-3 border border-[#e4dfd7]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    Verified Citizen Session
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#1f6e72]">
                    Local
                  </span>
                </div>

                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onNavigate) onNavigate("citizen-dashboard");
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-[#f8f3ee] hover:bg-[#ded9d4]/60 text-[#182230] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#e4dfd7]"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#1f6e72]">
                      dashboard
                    </span>
                    Citizen Dashboard
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-[#fbeae8] hover:bg-[#f9ece8] border border-[#e5c8bf] text-[#8c3322] hover:text-[#691b14] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      logout
                    </span>
                    Log Out from Eco-Watch
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
