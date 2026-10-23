"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Cpu,
  Bot,
  Zap,
  Lightbulb,
  CheckCircle2,
  Calendar,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";
import { CompetitionDivision } from "@/types";
import { usePdfModal } from "@/context/PdfModalContext";
import { getDivisionTheme } from "@/data/divisionThemes";
import { getCompetitionBySlug } from "@/data/competitions";
import DecorativeBackground from "./DecorativeBackground";
import { useLanguage } from "@/context/LanguageContext";

const DIVISION_ICONS = {
  "automation-challenge": Cpu,
  "smart-robotics": Bot,
  "energy-treasure": Zap,
  vortex: Lightbulb,
};

interface CompetitionDetailClientProps {
  division: CompetitionDivision;
  initialTrackId?: string;
  lockedTrackId?: string;
}

export default function CompetitionDetailClient({
  division: initialDivision,
  initialTrackId,
  lockedTrackId,
}: CompetitionDetailClientProps) {
  const { openModal } = usePdfModal();
  const { language, t } = useLanguage();

  const division =
    getCompetitionBySlug(initialDivision.slug, language) || initialDivision;

  const Icon =
    DIVISION_ICONS[division.slug as keyof typeof DIVISION_ICONS] || Layers;
  const theme = getDivisionTheme(division.slug);

  // Active track state for multi-track divisions like Automation Challenge
  const [activeTrackId, setActiveTrackId] = useState(
    lockedTrackId || initialTrackId || division.tracks[0]?.id || ""
  );

  // Per-category accordion expansion state
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategoryAccordion = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  useEffect(() => {
    if (lockedTrackId) {
      setActiveTrackId(lockedTrackId);
    }
  }, [lockedTrackId]);

  const currentTrack =
    division.tracks.find((tr) => tr.id === activeTrackId) || division.tracks[0];

  const isAutomationChallenge = division.slug === "automation-challenge";
  const isSmartRobotics = division.slug === "smart-robotics";
  const isEnergyTreasure = division.slug === "energy-treasure";
  const isVortex = division.slug === "vortex";

  return (
    <div className="pt-24 pb-16 md:py-28 relative overflow-hidden">
      <DecorativeBackground variant="section-e" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-text-dim">
          <Link href="/" className="hover:text-gold-400 transition-colors">
            {language === "id" ? "Beranda" : "Home"}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/#kompetisi" className="hover:text-gold-400 transition-colors">
            {t.nav.competitions}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          {isAutomationChallenge && currentTrack ? (
            <>
              <Link
                href="/competition/automation-challenge/iot"
                className="hover:text-gold-400 transition-colors text-text-soft"
              >
                {division.name}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className={`font-semibold ${theme.text}`}>{currentTrack.name}</span>
            </>
          ) : (
            <span className={`font-semibold ${theme.text}`}>{division.name}</span>
          )}
        </nav>

        {/* Hero Header Card with Division Secondary Glow */}
        <div className="relative overflow-hidden rounded-3xl border border-navy-800 bg-gradient-to-br from-navy-900/90 via-navy-950/90 to-navy-900/90 p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-2xl">
          <div
            className={`absolute -right-16 -top-16 h-64 w-64 rounded-full ${theme.heroBgGlow} blur-3xl pointer-events-none`}
          />
          <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${theme.iconBox} shadow-lg`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-text-main">
                    {division.name}
                  </h1>
                  <p className={`mt-1 text-sm sm:text-base font-medium ${theme.tagline}`}>
                    {isAutomationChallenge && currentTrack
                      ? `${currentTrack.name}: ${currentTrack.tagline}`
                      : division.tagline}
                  </p>
                </div>
              </div>

              {/* Master Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openModal("utama")}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-gold-500/40 bg-navy-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gold-400 transition hover:bg-gold-500/10 hover:border-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>{t.nav.mainGuidebook}</span>
                </button>
                <a
                  href="#pendaftaran"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-navy-950 shadow-md transition hover:from-gold-400 hover:to-gold-500 hover:shadow-gold-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <span>{t.nav.registerNow}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <p className="mt-4 max-w-3xl text-xs sm:text-sm md:text-base text-text-soft leading-relaxed">
              {isAutomationChallenge && currentTrack
                ? currentTrack.description
                : division.description}
            </p>

            {/* Educational Levels Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-navy-800/80">
              <span className="text-xs font-semibold text-text-dim">
                {language === "id" ? "Jenjang Partisipan" : "Eligible Education Levels"}{" "}
                {isAutomationChallenge && currentTrack ? `(${currentTrack.name})` : ""}:
              </span>
              {(isAutomationChallenge && currentTrack
                ? Array.from(new Set(currentTrack.categories.map((c) => c.level)))
                : division.levels
              ).map((lvl) => (
                <span
                  key={lvl}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${theme.badge}`}
                >
                  {t.competitions.levelFilters[lvl] || lvl}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Track Switcher Section */}
        {division.tracks.length > 1 && (
          <div className="mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-main">
                  {t.competitionDetail.divisionTracks}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-text-soft">
                  {language === "id"
                    ? `Kompetisi ${division.name} terbagi menjadi ${division.tracks.length} jalur spesialisasi dengan halaman dedikasi terpisah.`
                    : `${division.name} is divided into ${division.tracks.length} specialization tracks with dedicated overviews.`}
                </p>
              </div>

              {/* Track Selector Navigation Links */}
              <div className="flex flex-wrap items-center gap-2">
                {division.tracks.map((track) => {
                  const isActive = track.id === activeTrackId;
                  const trackUrl =
                    isAutomationChallenge && (track.id === "iot" || track.id === "plc")
                      ? `/competition/automation-challenge/${track.id}`
                      : undefined;

                  if (trackUrl) {
                    return (
                      <Link
                        key={track.id}
                        href={trackUrl}
                        className={`min-h-[44px] inline-flex items-center rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                          isActive
                            ? theme.trackActive
                            : "border border-navy-700 bg-navy-900 text-text-soft hover:border-purple-500/40 hover:text-text-main"
                        }`}
                      >
                        {track.name}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setActiveTrackId(track.id)}
                      className={`min-h-[44px] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                        isActive
                          ? theme.trackActive
                          : "border border-navy-700 bg-navy-900 text-text-soft hover:border-gold-500/40 hover:text-text-main"
                      }`}
                    >
                      {track.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Active Track Header & Description */}
        {currentTrack && (
          <div className="mt-6 rounded-2xl border border-navy-800/80 bg-navy-900/60 p-5 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span
                  className={`inline-block rounded-md px-2.5 py-0.5 text-[11px] font-bold ${theme.badge} mb-1`}
                >
                  Active Track
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-text-main">
                  {currentTrack.name}
                </h3>
                <p className={`text-xs sm:text-sm font-medium ${theme.tagline}`}>
                  {currentTrack.tagline}
                </p>
              </div>
              <span className="text-xs text-text-dim">
                {currentTrack.categories.length}{" "}
                {language === "id" ? "Kategori Tersedia" : "Categories Available"}
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-text-soft leading-relaxed">
              {currentTrack.description}
            </p>
          </div>
        )}

        {/* Technical Specification Banner */}
        <div className="mt-8">
          {/* Automation Challenge: Microcontroller Track Specifications */}
          {isAutomationChallenge && activeTrackId === "iot" && (
            <div className="rounded-2xl border border-purple-500/30 bg-navy-900/70 p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-purple-400 mb-3">
                <Cpu className="h-4 w-4" />
                <span>
                  {language === "id"
                    ? "Spesifikasi Teknis & Regulasi Track 1: Microcontroller (IoT)"
                    : "Technical Specifications & Rules for Track 1: Microcontroller (IoT)"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-text-soft">
                <div className="space-y-2 rounded-xl bg-navy-950/60 p-4 border border-navy-800">
                  <h4 className="font-bold text-text-main text-xs uppercase tracking-wider text-purple-400">
                    {language === "id" ? "3 Acuan Pusat Studi (Pusdi) ITS" : "3 Flagship ITS Study Centers"}
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-text-soft">
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Pusdi Energi & Sumber Daya Mineral:" : "Energy & Mineral Resources Center:"}
                      </strong>{" "}
                      {language === "id"
                        ? "Solar monitoring, smart grid, efisiensi energi terbarukan."
                        : "Solar telemetry, smart grid, renewable power optimization."}
                    </li>
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Pusdi Mitigasi Bencana & Perubahan Iklim:" : "Disaster Mitigation & Climate Change Center:"}
                      </strong>{" "}
                      {language === "id"
                        ? "Deteksi dini banjir, pemantauan longsor, sensor kualitas udara."
                        : "Early flood detection, landslide alert networks, air quality indexing."}
                    </li>
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Pusdi Teknologi Tepat Guna:" : "Appropriate Technology Center:"}
                      </strong>{" "}
                      {language === "id"
                        ? "Otomasi pertanian/hidroponik presisi, smart green house, pemilah sampah otomatis."
                        : "Precision agriculture/hydroponics automation, smart greenhouse controls, waste sorter systems."}
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 rounded-xl bg-navy-950/60 p-4 border border-navy-800">
                  <h4 className="font-bold text-text-main text-xs uppercase tracking-wider text-purple-400">
                    {language === "id" ? "Hardware, Plafon Anggaran & Seleksi" : "Hardware, Budget Ceiling & Evaluation"}
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-text-soft">
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Mikrokontroler Bebas:" : "Open Microcontroller Architecture:"}
                      </strong>{" "}
                      ESP32, ESP8266, STM32, Arduino, Raspberry Pi Pico.
                    </li>
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Plafon Anggaran:" : "Component Budget Cap:"}
                      </strong>{" "}
                      {language === "id"
                        ? "Biaya komponen maksimal Rp 500.000 disertai Rencana Anggaran Biaya (RAB) resmi."
                        : "Maximum component cost of IDR 500,000 supported by an official budget breakdown."}
                    </li>
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Tahap Seleksi:" : "Selection Stages:"}
                      </strong>{" "}
                      {language === "id"
                        ? "Penyisihan proposal & video konsep, dilanjutkan demonstrasi langsung alat luring di ITS untuk finalis."
                        : "Proposal screening and video pitch evaluation, advancing finalists to the physical live expo at ITS."}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Automation Challenge: PLC Track Specifications */}
          {isAutomationChallenge && activeTrackId === "plc" && (
            <div className="rounded-2xl border border-purple-500/30 bg-navy-900/70 p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-purple-400 mb-3">
                <Cpu className="h-4 w-4" />
                <span>
                  {language === "id"
                    ? "Spesifikasi Hardware & Software Resmi Track 2: PLC"
                    : "Official Hardware & Software Specifications for Track 2: PLC"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-text-soft">
                <div className="space-y-2 rounded-xl bg-navy-950/60 p-4 border border-navy-800">
                  <h4 className="font-bold text-text-main text-xs uppercase tracking-wider text-purple-400">
                    {language === "id" ? "Perangkat Lunak (Software) Standar" : "Standard Software Toolchain"}
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-text-soft">
                    <li>
                      <strong className="text-text-main">OMRON CX-Programmer:</strong>{" "}
                      {language === "id"
                        ? "Perancangan diagram tangga (ladder diagram) target tipe PLC CP2E-N pada babak penyisihan dan final."
                        : "Ladder diagram programming targeting Omron CP2E-N for both preliminary and final rounds."}
                    </li>
                    <li>
                      <strong className="text-text-main">Haiwell Cloud SCADA Designer:</strong>{" "}
                      {language === "id"
                        ? "Perancangan antarmuka visual HMI Haiwell B7-H/W pada babak final luring."
                        : "HMI operator visual screen design for Haiwell B7-H/W in the offline finals."}
                    </li>
                    <li>
                      <strong className="text-text-main">CX-Simulator:</strong>{" "}
                      {language === "id"
                        ? "Simulasi logika mandiri selama babak penyisihan daring via Zoom."
                        : "Proctored offline ladder simulation verification during preliminary rounds."}
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 rounded-xl bg-navy-950/60 p-4 border border-navy-800">
                  <h4 className="font-bold text-text-main text-xs uppercase tracking-wider text-purple-400">
                    {language === "id" ? "Modul Trainer Hardware ITS" : "Official ITS Hardware Trainers"}
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-text-soft">
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Modul Trainer Resmi:" : "Official Trainer Module:"}
                      </strong>{" "}
                      {language === "id"
                        ? "Hardware Trainer Modul PLC Omron CP2E-N fisik disediakan panitia ITS."
                        : "Physical Omron CP2E-N PLC trainer units provided by the ITS committee."}
                    </li>
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Perangkat HMI:" : "HMI Hardware Units:"}
                      </strong>{" "}
                      {language === "id"
                        ? "Modul fisik HMI Haiwell B7-H/W disediakan panitia ITS."
                        : "Physical Haiwell B7-H/W industrial displays provided on-site."}
                    </li>
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Koneksi & Uji:" : "Interface & Commissioning:"}
                      </strong>{" "}
                      {language === "id"
                        ? "Komunikasi kabel Ethernet industri, sesi penyesuaian hardware 10 menit sebelum kompetisi 60 menit."
                        : "Direct Ethernet cable communication, with a 10-minute calibration window before the 60-minute test."}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Smart Robotics Specifications */}
          {isSmartRobotics && (
            <div className="rounded-2xl border border-rose-500/30 bg-navy-900/70 p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-rose-400 mb-3">
                <Bot className="h-4 w-4" />
                <span>
                  {language === "id"
                    ? "Spesifikasi 4 Jenjang Smart Robotics"
                    : "Specifications across 4 Smart Robotics Categories"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-text-soft">
                <div className="rounded-xl bg-navy-950/60 p-3.5 border border-navy-800">
                  <span className="font-bold text-rose-400 block mb-1">
                    {language === "id" ? "SD (Beginner)" : "Elementary (Beginner)"}
                  </span>
                  <p>
                    {language === "id"
                      ? "Line follower grafis blok (Ardublock). Misi mendorong objek keluar zona rintangan."
                      : "Block programming line follower (Ardublock). Mission to push objects outside hazard zones."}
                  </p>
                </div>
                <div className="rounded-xl bg-navy-950/60 p-3.5 border border-navy-800">
                  <span className="font-bold text-rose-400 block mb-1">
                    {language === "id" ? "SMP (Junior)" : "Junior High (Junior)"}
                  </span>
                  <p>
                    {language === "id"
                      ? "Line follower mikrokontroler mandiri dengan sensor optik. 60 menit trial, top 16 ke babak gugur."
                      : "Optical sensor line follower with microcontroller. 60 min trial, top 16 advance to knockouts."}
                  </p>
                </div>
                <div className="rounded-xl bg-navy-950/60 p-3.5 border border-navy-800">
                  <span className="font-bold text-rose-400 block mb-1">
                    {language === "id" ? "SMA/SMK (Senior)" : "Senior High (Senior)"}
                  </span>
                  <p>
                    {language === "id"
                      ? "Gripper Line Follower (max 25x20x25 cm). Checkpoint (+15), relokasi kotak objek."
                      : "Gripper line follower (max 25x20x25 cm). Point checkpoints (+15) and cube relocation."}
                  </p>
                </div>
                <div className="rounded-xl bg-navy-950/60 p-3.5 border border-navy-800">
                  <span className="font-bold text-rose-400 block mb-1">
                    {language === "id" ? "Mahasiswa (Dual Robot)" : "University (Dual Robot)"}
                  </span>
                  <p>
                    {language === "id"
                      ? "Kolaborasi R1 (Autonomous LF) + R2 (Shooter Robot). Format Best of 3 (BO3)."
                      : "Collaboration: R1 (Autonomous Line Follower) + R2 (Shooter Robot). Best of 3 format."}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-navy-800 flex items-center justify-between text-xs">
                <span className="text-text-dim">
                  {language === "id" ? "Modul Lintasan Resmi Daring:" : "Official Digital Track Layout:"}
                </span>
                <a
                  href="https://its.id/m/SmartRoboticsOnline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-rose-400 hover:underline"
                >
                  <span>{language === "id" ? "Unduh Lintasan" : "Download Track File"}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}

          {/* Energy Treasure Specifications */}
          {isEnergyTreasure && (
            <div className="rounded-2xl border border-sky-500/30 bg-navy-900/70 p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-sky-400 mb-3">
                <Zap className="h-4 w-4" />
                <span>
                  {language === "id"
                    ? "Spesifikasi Navigasi Labirin & Efisiensi Konsumsi Daya"
                    : "Maze Navigation Specifications & Power Consumption Ratio"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-text-soft">
                <div className="rounded-xl bg-navy-950/60 p-4 border border-navy-800">
                  <h4 className="font-bold text-text-main text-xs uppercase tracking-wider text-sky-400 mb-1.5">
                    {language === "id" ? "Mekanisme 3 Tahapan Seleksi" : "3-Stage Selection Mechanics"}
                  </h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Tahap 1 (Pra-Kualifikasi):" : "Stage 1 (Pre-Qualification):"}
                      </strong>{" "}
                      {language === "id"
                        ? "Seeding awal waktu tempuh dan konsumsi miliampere."
                        : "Baseline seeding based on runtime and milliampere power draw."}
                    </li>
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Tahap 2 (Onsite Programming):" : "Stage 2 (Onsite Programming):"}
                      </strong>{" "}
                      {language === "id"
                        ? "Penyesuaian algoritma pada arena labirin rahasia baru di ITS."
                        : "Algorithm adjustments on the undisclosed secret maze arena at ITS."}
                    </li>
                    <li>
                      <strong className="text-text-main">
                        {language === "id" ? "Tahap 3 (Final Non-Eliminasi):" : "Stage 3 (Final Run):"}
                      </strong>{" "}
                      {language === "id"
                        ? "Akumulasi skor tertinggi efisiensi daya dan kecepatan tercepat."
                        : "Accumulated score weighing power efficiency and completion speed."}
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl bg-navy-950/60 p-4 border border-navy-800">
                  <h4 className="font-bold text-text-main text-xs uppercase tracking-wider text-sky-400 mb-1.5">
                    {language === "id" ? "Persyaratan Robot Fisik" : "Physical Robot Requirements"}
                  </h4>
                  <p className="leading-relaxed">
                    {language === "id"
                      ? "Pastikan robot line follower dilengkapi sensor pendeteksi jarak/dinding optik atau ultrasonik, modul telemetri daya, dan sakelar pemutus arus darurat."
                      : "Robots must feature optical or ultrasonic wall/distance sensors, power telemetry indicators, and an emergency manual cutoff switch."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Vortex Specifications */}
          {isVortex && (
            <div className="rounded-2xl border border-amber-500/30 bg-navy-900/70 p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400 mb-3">
                <Lightbulb className="h-4 w-4" />
                <span>
                  {language === "id"
                    ? "Format Kompetisi KTI Vortex & Batasan Plagiarisme"
                    : "Vortex Scientific Paper Format & Originality Standards"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-text-soft">
                <div className="space-y-2 rounded-xl bg-navy-950/60 p-4 border border-navy-800">
                  <h4 className="font-bold text-text-main text-xs uppercase tracking-wider text-amber-400 mb-1.5">
                    {language === "id" ? "Dua Pendekatan Gagasan" : "Two Paper Approaches"}
                  </h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>
                      <strong className="text-text-main">Vortex Idea Challenge:</strong>{" "}
                      {language === "id"
                        ? "Eksplorasi bebas ide visioner bidang energi, lingkungan, dan teknologi rekayasa masa depan."
                        : "Open exploration of visionary ideas in energy, climate, and applied engineering."}
                    </li>
                    <li>
                      <strong className="text-text-main">Vortex Innovation Challenge:</strong>{" "}
                      {language === "id"
                        ? "Solusi pemecahan masalah konkret dari 4 fokus riset unggulan Departemen Teknik Elektro Otomasi ITS."
                        : "Applied problem solving addressing 4 research flagships of the ITS Department of Automation Electrical Engineering."}
                    </li>
                  </ul>
                </div>
                <div className="space-y-2 rounded-xl bg-navy-950/60 p-4 border border-navy-800">
                  <h4 className="font-bold text-text-main text-xs uppercase tracking-wider text-amber-400 mb-1.5">
                    {language === "id" ? "Persyaratan Orisinalitas Ketat" : "Strict Originality Rules"}
                  </h4>
                  <p className="leading-relaxed">
                    {language === "id"
                      ? "Naskah karya tulis ilmiah wajib bebas plagiarisme dengan indeks kemiripan Turnitin di bawah 20%. Naskah dengan kemiripan di atas 20% langsung didiskualifikasi."
                      : "Scientific manuscripts must maintain a Turnitin similarity index below 20%. Submissions exceeding 20% are disqualified during administrative screening."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Distinct Category Cards Grid with Thematic Accents */}
        <div id="pendaftaran" className="mt-10 scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-text-main">
              {language === "id"
                ? `Kategori Partisipasi (${currentTrack.categories.length})`
                : `Participation Categories (${currentTrack.categories.length})`}
            </h3>
            <span className="text-xs text-text-dim">
              {language === "id"
                ? "Setiap kategori memiliki berkas panduan PDF dan formulir pendaftaran mandiri"
                : "Each category includes dedicated PDF guidebooks and online registration"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTrack.categories.map((cat) => (
              <div
                key={cat.id}
                className={`group flex flex-col justify-between rounded-2xl border border-navy-800 bg-navy-900/80 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 ${theme.cardHoverBorder} hover:bg-navy-900/95 hover:shadow-xl ${theme.cardGlow} hover:-translate-y-1`}
              >
                <div>
                  <h4
                    className={`text-base sm:text-lg font-bold text-text-main ${theme.textHover} transition-colors`}
                  >
                    {cat.name}
                  </h4>

                  <p className="mt-2 text-xs text-text-soft leading-relaxed border-b border-navy-800 pb-3">
                    {cat.teamRequirement}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="my-3 space-y-1.5">
                    {cat.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-text-soft">
                        <CheckCircle2
                          className={`h-3.5 w-3.5 ${theme.bulletDot} shrink-0 mt-0.5`}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Fee Matrix Box */}
                  <div className="mt-4 rounded-xl border border-navy-800 bg-navy-950/70 p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-dim block mb-1.5">
                      {language === "id"
                        ? "Biaya Pendaftaran per Tim:"
                        : "Registration Fee per Team:"}
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <div className="rounded-lg bg-navy-900/80 p-1.5 border border-navy-800">
                        <span className="text-[9px] text-text-dim block">Batch 1</span>
                        <span className={`text-xs font-bold ${theme.text}`}>{cat.fees.batch1}</span>
                      </div>
                      <div className="rounded-lg bg-navy-900/80 p-1.5 border border-navy-800">
                        <span className="text-[9px] text-text-dim block">Batch 2</span>
                        <span className="text-xs font-bold text-text-main">{cat.fees.batch2}</span>
                      </div>
                      <div className="rounded-lg bg-navy-900/80 p-1.5 border border-navy-800">
                        <span className="text-[9px] text-text-dim block">Batch 3</span>
                        <span className="text-xs font-bold text-text-soft">{cat.fees.batch3}</span>
                      </div>
                    </div>
                  </div>

                  {/* Accordion: Details & Scoring */}
                  {(cat.stages || cat.scoringCriteria) && (
                    <div className="mt-4 pt-3 border-t border-navy-800/80">
                      <button
                        type="button"
                        onClick={() => toggleCategoryAccordion(cat.id)}
                        aria-expanded={!!expandedCategories[cat.id]}
                        className="flex w-full items-center justify-between gap-2 rounded-xl border border-navy-700/80 bg-navy-950/60 px-3.5 py-2.5 text-xs font-semibold text-text-soft transition hover:border-gold-500/40 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                      >
                        <span className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-gold-400" />
                          <span>
                            {language === "id"
                              ? "Rincian Babak & Penilaian"
                              : "Rounds & Scoring Criteria"}
                          </span>
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-text-dim transition-transform duration-200 ${
                            expandedCategories[cat.id] ? "rotate-180 text-gold-400" : ""
                          }`}
                        />
                      </button>

                      {/* Accordion Content */}
                      {expandedCategories[cat.id] && (
                        <div className="mt-3 space-y-4 rounded-xl border border-navy-800 bg-navy-950/90 p-4 text-xs text-text-soft">
                          {/* Stages */}
                          {cat.stages && cat.stages.length > 0 && (
                            <div>
                              <div className="flex items-center gap-1.5 font-bold text-text-main text-[11px] uppercase tracking-wider mb-2.5">
                                <Calendar className="h-3.5 w-3.5 text-gold-400" />
                                <span>
                                  {language === "id"
                                    ? "Alur Babak Kompetisi"
                                    : "Competition Round Stages"}
                                </span>
                              </div>
                              <div className="space-y-2.5 border-l border-navy-800 pl-3 ml-1">
                                {cat.stages.map((stg, sIdx) => (
                                  <div key={sIdx} className="relative">
                                    <div className="flex items-baseline justify-between gap-2">
                                      <span className="font-semibold text-text-main text-xs">
                                        {stg.name}
                                      </span>
                                      {stg.date && (
                                        <span className="text-[10px] text-gold-400 font-mono shrink-0">
                                          {stg.date}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-text-dim mt-0.5 leading-relaxed">
                                      {stg.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Scoring criteria */}
                          {cat.scoringCriteria && cat.scoringCriteria.length > 0 && (
                            <div className="pt-3 border-t border-navy-800/80">
                              <div className="flex items-center gap-1.5 font-bold text-text-main text-[11px] uppercase tracking-wider mb-2.5">
                                <Award className="h-3.5 w-3.5 text-gold-400" />
                                <span>
                                  {language === "id"
                                    ? "Fokus Kriteria Penilaian"
                                    : "Evaluation Rubric Focus"}
                                </span>
                              </div>
                              <div className="space-y-2">
                                {cat.scoringCriteria.map((crit, cIdx) => (
                                  <div
                                    key={cIdx}
                                    className="flex items-start justify-between gap-2 rounded-lg bg-navy-900/70 p-2.5 border border-navy-800"
                                  >
                                    <div>
                                      <span className="font-semibold text-text-main text-xs block">
                                        {crit.criterion}
                                      </span>
                                      {crit.note && (
                                        <span className="text-[11px] text-text-dim block mt-0.5 leading-relaxed">
                                          {crit.note}
                                        </span>
                                      )}
                                    </div>
                                    <span className="shrink-0 rounded bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 text-[10px] font-bold text-gold-400">
                                      {crit.weight}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Guidebook Reminder Note */}
                          <div className="pt-2 text-[11px] text-text-dim italic leading-relaxed border-t border-navy-800/60">
                            {language === "id"
                              ? "Regulasi teknis lengkap, batas toleransi dimensi, dan instrumen penilaian komprehensif tercantum di Guidebook PDF resmi jenjang ini."
                              : "Complete technical parameters, dimension tolerances, and full evaluation rubrics are specified in the official category PDF guidebook."}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Dedicated Action Buttons */}
                <div className="mt-6 pt-4 border-t border-navy-800 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => openModal(cat.guidebookDocId)}
                    className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border border-gold-500/40 bg-navy-900/90 py-2.5 text-xs font-semibold text-gold-400 transition hover:bg-gold-500/10 hover:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>
                      {language === "id"
                        ? "Lihat Guidebook (PDF)"
                        : "View Category Guidebook (PDF)"}
                    </span>
                  </button>

                  <a
                    href={cat.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 py-2.5 text-xs font-bold text-navy-950 shadow-md transition hover:from-gold-400 hover:to-gold-500 hover:shadow-gold-500/20 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  >
                    <span>{t.nav.registerNow}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Regulation Reference Callout */}
        <div className="mt-12 rounded-2xl border border-navy-800 bg-navy-900/60 p-5 sm:p-6 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-text-main">
                  {language === "id"
                    ? "Acuan Regulasi & Teknis Resmi IARC XII"
                    : "Official IARC XII Regulatory & Technical Reference"}
                </h3>
                <p className="mt-1 text-xs text-text-soft leading-relaxed max-w-2xl">
                  {language === "id"
                    ? "Setiap kategori jenjang memiliki spesifikasi arena, dimensi alat, toleransi mekanik, dan instrumen penilaian yang berbeda. Buka dokumen Guidebook PDF pada masing-masing kartu kategori di atas untuk panduan teknis yang mengikat."
                    : "Each category specifies unique arena layouts, device dimensions, mechanical tolerances, and evaluation rubrics. Consult the respective PDF Guidebooks above for binding regulations."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openModal("utama")}
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl border border-gold-500/40 bg-navy-900 px-4 py-2 text-xs font-bold text-gold-400 transition hover:bg-gold-500/10 hover:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
            >
              <BookOpen className="h-4 w-4" />
              <span>{t.nav.mainGuidebook}</span>
            </button>
          </div>
        </div>

        {/* Registration Guidance & Verification Section */}
        <div
          id="panduan-pendaftaran"
          className="mt-12 rounded-3xl border border-gold-500/30 bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 p-6 sm:p-8 backdrop-blur-md shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 border border-gold-500/20 px-3 py-0.5 text-xs font-semibold text-gold-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>
                  {language === "id"
                    ? "Petunjuk Pendaftaran Resmi"
                    : "Official Registration Guidelines"}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-main">
                {language === "id"
                  ? "Petunjuk Pendaftaran & Verifikasi Berkas"
                  : "Registration & Document Verification Guidelines"}
              </h3>
              <p className="text-xs sm:text-sm text-text-soft leading-relaxed">
                {language === "id"
                  ? "Informasi nomor rekening tujuan pembayaran dan rincian biaya registrasi resmi tercantum langsung di dalam formulir Google Form pendaftaran masing-masing kategori lomba. Unggah bukti pembayaran beserta berkas persyaratan pada formulir tersebut untuk proses verifikasi oleh panitia."
                  : "Bank account transfer instructions and official entry fees are provided directly inside the registration Google Form for each competition category. Upload transfer receipts and verification documents via the form for committee approval."}
              </p>
            </div>

            <div className="w-full sm:w-auto rounded-2xl border border-gold-500/30 bg-navy-950/80 p-5 text-center sm:min-w-[260px] flex flex-col items-center justify-center gap-2">
              <ClipboardCheck className="h-6 w-6 text-gold-400" />
              <span className="text-xs font-bold text-text-main">
                {language === "id" ? "Formulir Pendaftaran" : "Registration Form"}
              </span>
              <p className="text-[11px] text-text-soft max-w-[220px]">
                {language === "id"
                  ? "Informasi rekening transfer tersedia langsung di Google Form"
                  : "Transfer account details are provided directly in the Google Form"}
              </p>
              <a
                href="#pendaftaran"
                className="mt-1 inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2 text-xs font-bold text-navy-950 shadow-md transition hover:from-gold-400 hover:to-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <span>{language === "id" ? "Pilih Kategori & Daftar" : "Select Category & Register"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-navy-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-text-dim">
                {language === "id" ? "Kelengkapan Berkas:" : "Required Submissions:"}
              </span>
              <a
                href="https://its.id/m/TwibbonCompeIARCXII"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-gold-400 hover:underline"
              >
                <span>{t.footer.downloadTwibbon}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className="text-navy-700">•</span>
              <a
                href="https://its.id/m/CaptionTwibbonIARCXII"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-gold-400 hover:underline"
              >
                <span>{t.footer.copyCaption}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <Link
              href="/#kompetisi"
              className="inline-flex items-center gap-1.5 font-bold text-gold-400 hover:text-gold-300 transition"
            >
              <span>{language === "id" ? "Jelajahi Divisi Lain" : "Explore Other Divisions"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
