import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BentoGridSection from "@/components/BentoGridSection";
import CompetitionSection from "@/components/CompetitionSection";
import RegistrationFlowSection from "@/components/RegistrationFlowSection";
import TimelineSection from "@/components/TimelineSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-navy-950 text-text-main overflow-x-hidden">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <HeroSection />
        <BentoGridSection />
        <CompetitionSection />
        <RegistrationFlowSection />
        <TimelineSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
