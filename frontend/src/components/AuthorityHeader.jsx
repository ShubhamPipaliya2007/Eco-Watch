import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthorityHeader({ searchTerm, onSearchChange }) {
  const { currentUser, logout, openAuthModal } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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

        <div className="relative" ref={dropdownRef}>
          {currentUser ? (
            <div
              className="flex items-center gap-3 cursor-pointer p-1 rounded-lg hover:bg-sand-200/60 transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-8 h-8 rounded bg-slate-850 text-white flex items-center justify-center font-bold text-xs uppercase">
                {currentUser.fullName ? currentUser.fullName.charAt(0) : "U"}
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-900 leading-tight">
                  {currentUser.fullName}
                </span>
                <span className="text-[11px] text-teal-brand font-semibold">
                  Signed In
                </span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-slate-400">
                expand_more
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="px-3 py-1.5 rounded text-xs font-bold text-slate-700 hover:text-slate-900 border border-sand-border bg-sand-100 hover:bg-sand-200 transition-colors"
              >
                Log In
              </button>
            </div>
          )}

          {currentUser && dropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-sand-border p-3 z-50 text-slate-850 animate-fadeIn">
              <div className="pb-3 border-b border-sand-border mb-2 px-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {currentUser.fullName}
                </p>
                <p className="text-[11px] text-slate-500 font-mono truncate">
                  {currentUser.email}
                </p>
                {currentUser.phone && (
                  <p className="text-[10px] text-teal-brand font-mono mt-0.5">
                    {currentUser.phone}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                className="w-full py-2 px-3 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  logout
                </span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
