import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [currentView, setCurrentView] = useState("citizen");
  const [userSubmissions, setUserSubmissions] = useState([]);

  const handleReportSubmitted = (newReport) => {
    setUserSubmissions((prev) => [newReport, ...prev]);
  };

  return (
    <div className="w-full min-h-screen">
      {currentView === "citizen" ? (
        <LandingPage
          onNavigate={setCurrentView}
          onReportSubmitted={handleReportSubmitted}
        />
      ) : (
        <Dashboard
          onNavigate={setCurrentView}
          userSubmissions={userSubmissions}
        />
      )}
    </div>
  );
}
