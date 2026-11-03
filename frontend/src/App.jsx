import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import LandingPage from "./pages/LandingPage";
import CitizenDashboard from "./pages/CitizenDashboard";
import Dashboard from "./pages/Dashboard";

export default function App() {
  // Routes: 'landing' (Public Minimalist Landing) | 'citizen-dashboard' (Dedicated Citizen Portal) | 'authority' (Authority Command Center)
  const [currentView, setCurrentView] = useState("landing");
  const [userSubmissions, setUserSubmissions] = useState([]);

  const handleReportSubmitted = (newReport) => {
    setUserSubmissions((prev) => [newReport, ...prev]);
  };

  const handleNavigate = (view) => {
    if (view === "citizen" || view === "user-dashboard") {
      setCurrentView("citizen-dashboard");
    } else {
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AuthProvider>
      <div className="w-full min-h-screen bg-surface font-sans text-on-surface antialiased">
        {/* 1. Minimalist Public Landing Page */}
        {currentView === "landing" && (
          <LandingPage onNavigate={handleNavigate} />
        )}

        {/* 2. Distinct User / Citizen Dashboard Page (Auth Gated) */}
        {(currentView === "citizen-dashboard" || currentView === "citizen") && (
          <CitizenDashboard
            onNavigate={handleNavigate}
            onReportSubmitted={handleReportSubmitted}
          />
        )}

        {/* 3. Separate Authority Command Center */}
        {currentView === "authority" && (
          <Dashboard
            onNavigate={handleNavigate}
            userSubmissions={userSubmissions}
          />
        )}

        {/* 4. Local Authentication Integration Modal (Light-Mode) */}
        <AuthModal />
      </div>
    </AuthProvider>
  );
}
