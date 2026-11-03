import React, { useState } from "react";
import Header from "../components/Header";
import SosBanner from "../components/SosBanner";
import Hero from "../components/Hero";
import IncidentForm from "../components/IncidentForm";
import HowItWorks from "../components/HowItWorks";
import RecentAlerts from "../components/RecentAlerts";
import TrackingModal from "../components/TrackingModal";
import Footer from "../components/Footer";

export default function LandingPage({ onNavigate, onReportSubmitted }) {
  const [activeTrackingReport, setActiveTrackingReport] = useState(null);

  const handleTrackSearch = (token) => {
    setActiveTrackingReport({
      token: token,
      title: "Monitored Contamination Site",
      description:
        "Active rapid telemetry verification and containment protocol deployed.",
      backendAnalysis: {
        status: "verified",
        message: `Correlating incident log for token: ${token}`,
        severity: "Moderate to High",
        rule_broken: "CPCB Basin Standard Clause 9B",
      },
    });
  };

  const handleFormSuccess = (newReport) => {
    setActiveTrackingReport(newReport);
    if (onReportSubmitted) {
      onReportSubmitted(newReport);
    }
  };

  return (
    <div className="bg-surface font-sans text-on-surface antialiased min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} activePage="citizen" />

      <main className="w-full pt-20 flex-1">
        <SosBanner />
        <Hero onTrack={handleTrackSearch} />
        <IncidentForm onSubmitSuccess={handleFormSuccess} />
        <HowItWorks />
        <RecentAlerts />
      </main>

      <Footer />

      {activeTrackingReport && (
        <TrackingModal
          report={activeTrackingReport}
          onClose={() => setActiveTrackingReport(null)}
        />
      )}
    </div>
  );
}
