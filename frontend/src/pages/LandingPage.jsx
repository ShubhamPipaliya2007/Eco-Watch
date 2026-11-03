import React, { useState } from "react";
import Header from "../components/Header";
import SosBanner from "../components/SosBanner";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import RecentAlerts from "../components/RecentAlerts";
import TrackingModal from "../components/TrackingModal";
import Footer from "../components/Footer";

export default function LandingPage({ onNavigate }) {
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

  return (
    <div className="bg-surface font-sans text-on-surface antialiased min-h-screen flex flex-col">
      {/* Top Header Navigation Bar */}
      <Header onNavigate={onNavigate} activePage="landing" />

      {/* Main Public Home Content: Comprehensive Scrolling Informational Page */}
      <main className="w-full pt-20 flex-1 flex flex-col justify-start">
        {/* Prominent Red Emergency Hotline Banner at the Top of the Public Home Page */}
        <SosBanner />

        {/* Hero Section with 3-Step Reporting Banner & Quick Tracker Card */}
        <Hero onTrack={handleTrackSearch} onNavigate={onNavigate} />

        {/* "What Happens After You Report?" Breakdown Section */}
        <HowItWorks />

        {/* "Recent Water Alerts Handled" Cards Grid */}
        <RecentAlerts />
      </main>

      {/* Complete Footer Section with Emergency Helplines and Statutory Links */}
      <Footer />

      {/* Tracking Modal when a token is searched */}
      {activeTrackingReport && (
        <TrackingModal
          report={activeTrackingReport}
          onClose={() => setActiveTrackingReport(null)}
        />
      )}
    </div>
  );
}
