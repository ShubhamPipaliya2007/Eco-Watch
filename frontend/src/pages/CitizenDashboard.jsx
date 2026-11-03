import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import IncidentForm from "../components/IncidentForm";
import TrackingModal from "../components/TrackingModal";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function CitizenDashboard({ onNavigate, onReportSubmitted }) {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [activeTrackingReport, setActiveTrackingReport] = useState(null);

  // Auto-prompt login modal if unauthenticated citizen tries to access this dashboard directly
  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal(
        "login",
        "Sign in or register your citizen account to access the official water pollution incident reporting dashboard."
      );
    }
  }, [isAuthenticated]);

  const handleFormSuccess = (newReport) => {
    setActiveTrackingReport(newReport);
    if (onReportSubmitted) {
      onReportSubmitted(newReport);
    }
  };

  return (
    <div className="bg-surface font-sans text-on-surface antialiased min-h-screen flex flex-col">
      {/* Clean Top Header Navigation */}
      <Header onNavigate={onNavigate} activePage="citizen-dashboard" />

      {/* Main Reporting Area: Focused purely on the reporting form and workflow */}
      <main className="w-full pt-20 flex-1 flex flex-col">
        {!isAuthenticated ? (
          /* Authentication Gate Barrier: shown when user is logged out */
          <div className="flex-1 flex items-center justify-center px-6 py-16">
            <div className="max-w-md w-full bg-[#ffffff] border border-[#e4dfd7] rounded-2xl p-8 shadow-xl text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#eaf3f3] border border-[#a5ced0] flex items-center justify-center text-[#1f6e72] mb-4">
                <span className="material-symbols-outlined text-[32px]">
                  lock
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1f6e72] bg-[#f8f3ee] px-3 py-1 rounded-full border border-[#e4dfd7] mb-2">
                Protected Citizen Area
              </span>
              <h2 className="text-2xl font-bold text-[#182230] tracking-tight">
                Citizen Sign-In Required
              </h2>
              <p className="text-sm text-[#4a5568] mt-2 mb-6 leading-relaxed">
                The incident reporting dashboard links directly to local water
                patrol dispatch. Please log in or create a profile to report
                contamination and receive live SMS tracking.
              </p>

              <div className="w-full space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    openAuthModal(
                      "login",
                      "Sign in to file an incident report with verified citizen credentials."
                    )
                  }
                  className="w-full py-3 px-4 rounded-xl bg-[#1f6e72] hover:bg-[#155255] text-white text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    login
                  </span>
                  Sign In to Citizen Portal
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openAuthModal(
                      "signup",
                      "Register a citizen profile to log water pollution incidents."
                    )
                  }
                  className="w-full py-3 px-4 rounded-xl bg-[#f8f3ee] hover:bg-[#ded9d4]/60 border border-[#e4dfd7] text-[#182230] text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    person_add
                  </span>
                  Create Free Account
                </button>

                <div className="p-3 rounded-lg bg-[#f8f3ee] border border-[#e4dfd7] text-xs text-[#4a5568] text-left mt-4">
                  <div className="font-bold text-[#182230] mb-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#1f6e72]">
                      key
                    </span>
                    <span>Quick Local Testing Credentials:</span>
                  </div>
                  <div>Email: <strong className="text-[#182230]">aarav@ecowatch.org</strong></div>
                  <div>Password: <strong className="text-[#182230]">password123</strong></div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate("landing")}
                  className="mt-3 text-xs text-[#4a5568] hover:text-[#182230] font-semibold underline cursor-pointer"
                >
                  Return to Public Landing Page
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Citizen Reporting Form Workflow */
          <IncidentForm onSubmitSuccess={handleFormSuccess} />
        )}
      </main>

      {/* Full Site Footer */}
      <Footer />

      {/* Tracking Modal if report was created or searched */}
      {activeTrackingReport && (
        <TrackingModal
          report={activeTrackingReport}
          onClose={() => setActiveTrackingReport(null)}
        />
      )}
    </div>
  );
}
