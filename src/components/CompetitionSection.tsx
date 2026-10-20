"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Cpu,
  Bot,
  Zap,
  Lightbulb,
} from "lucide-react";
import { COMPETITIONS } from "@/data/competitions";
import { EducationLevel } from "@/types";
import { getDivisionTheme } from "@/data/divisionThemes";

const DIVISION_ICONS = {
  "automation-challenge": Cpu,
  "smart-robotics": Bot,
  "energy-treasure": Zap,
  vortex: Lightbulb,
};

export default function CompetitionSection() {
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel>("Semua");

  const filterLevels: EducationLevel[] = [
    "Semua",
    "SD",
    "SMP",
    "SMA/SMK",
    "Mahasiswa",
    "International",
  ];

  // Filter competitions based on selected level
  const filteredDivisions = useMemo(() => {
    if (selectedLevel === "Semua") {
      return COMPETITIONS;
    }
    return COMPETITIONS.filter((div) => div.levels.includes(selectedLevel));
  }, [selectedLevel]);

  return (
    <section id="kompetisi" className="py-12 md:py-16 bg-navy-950/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 md:mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Cabang Perlombaan
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-main sm:text-3xl md:text-4xl">
            4 Divisi Kompetisi Utama
          </h2>
          <p className="mt-2 mx-auto max-w-2xl text-xs sm:text-sm text-text-soft">
            Pilih cabang lomba sesuai minat keahlian dan jenjang pendidikan Anda. Akses halaman dedikasi untuk melihat ketentuan lengkap dan panduan teknis PDF resmi.
          </p>

          {/* Interactive Education Level Filter */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {filterLevels.map((lvl) => {
              const isActive = lvl === selectedLevel;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`min-h-[44px] rounded-xl px-4 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold-500/50 ${
                    isActive
                      ? "bg-gold-500 text-navy-950 shadow-md font-bold"
                      : "border border-navy-700 bg-navy-900 text-text-soft hover:border-gold-500/40 hover:text-text-main"
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredDivisions.map((division) => {
            const Icon =
              DIVISION_ICONS[division.slug as keyof typeof DIVISION_ICONS] ||
              Layers;
            const theme = getDivisionTheme(division.slug);

            const isAutomationChallenge =
              division.slug === "automation-challenge";
            const isSmartRobotics = division.slug === "smart-robotics";
            const isEnergyTreasure = division.slug === "energy-treasure";
            const isVortex = division.slug === "vortex";

            return (
              <div
                key={division.slug}
                className={`group flex flex-col justify-between rounded-2xl border border-navy-800 bg-navy-900/70 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 ${theme.cardHoverBorder} hover:bg-navy-900/90 hover:shadow-xl ${theme.cardGlow}`}
              >
                <div>
                  {/* Division Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${theme.iconBox}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-bold text-text-main ${theme.textHover} transition-colors`}
                        >
                          {division.name}
                        </h3>
                        <p className={`text-[11px] font-medium ${theme.tagline}`}>
                          {division.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Concise Description */}
                  <p className="text-xs sm:text-sm text-text-soft leading-relaxed mb-4">
                    {division.description}
                  </p>

                  {/* Level Badges */}
                  <div className="mb-4 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-text-dim mr-1">
                      Jenjang:
                    </span>
                    {division.levels.map((lvl) => {
                      const isSelected = lvl === selectedLevel;
                      return (
                        <span
                          key={lvl}
                          className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                            isSelected
                              ? theme.badge
                              : "bg-navy-800 text-text-dim border border-navy-700/80"
                          }`}
                        >
                          {lvl}
                        </span>
                      );
                    })}
                  </div>

                  {/* Automation Challenge: 2 Clickable Track Cards */}
                  {isAutomationChallenge && (
                    <div className="space-y-2 rounded-xl bg-navy-950/70 p-3.5 border border-navy-800">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}
                        >
                          2 Jalur Spesialisasi (Klik untuk Buka Halaman):
                        </span>
                      </div>

                      <div className="space-y-2">
                        {/* Jalur 1: IoT (Clickable Card) */}
                        <Link
                          href="/competition/automation-challenge/iot"
                          className="group/track block rounded-xl bg-navy-900/80 p-3 border border-navy-800/90 transition-all duration-200 hover:border-rose-500/60 hover:bg-navy-900 hover:shadow-md hover:shadow-rose-500/10 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-text-main group-hover/track:text-rose-400 transition-colors">
                              1. Jalur Microcontroller (IoT)
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-[10px] font-semibold ${theme.text}`}
                              >
                                5 Jenjang
                              </span>
                              <ArrowRight className="h-3.5 w-3.5 text-rose-400 transition-transform group-hover/track:translate-x-1" />
                            </div>
                          </div>
                          <p className="text-[11px] text-text-soft line-clamp-1 mb-2">
                            Sistem otomasi cerdas berbasis IoT sesuai 3 Pusat Studi ITS.
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {["SD", "SMP", "SMA/SMK", "Mahasiswa", "International"].map(
                              (lvl) => (
                                <span
                                  key={lvl}
                                  className="rounded bg-navy-950 px-1.5 py-0.5 text-[9px] text-text-dim border border-navy-800"
                                >
                                  {lvl}
                                </span>
                              )
                            )}
                          </div>
                        </Link>

                        {/* Jalur 2: PLC (Clickable Card) */}
                        <Link
                          href="/competition/automation-challenge/plc"
                          className="group/track block rounded-xl bg-navy-900/80 p-3 border border-navy-800/90 transition-all duration-200 hover:border-rose-500/60 hover:bg-navy-900 hover:shadow-md hover:shadow-rose-500/10 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-text-main group-hover/track:text-rose-400 transition-colors">
                              2. Jalur PLC (Industri)
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-[10px] font-semibold ${theme.text}`}
                              >
                                2 Jenjang
                              </span>
                              <ArrowRight className="h-3.5 w-3.5 text-rose-400 transition-transform group-hover/track:translate-x-1" />
                            </div>
                          </div>
                          <p className="text-[11px] text-text-soft line-clamp-1 mb-2">
                            Ladder diagram Omron CP2E-N &amp; Haiwell SCADA HMI.
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {["SMA/SMK", "Mahasiswa"].map((lvl) => (
                              <span
                                key={lvl}
                                className="rounded bg-navy-950 px-1.5 py-0.5 text-[9px] text-text-dim border border-navy-800"
                              >
                                {lvl}
                              </span>
                            ))}
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Smart Robotics Overview Box */}
                  {isSmartRobotics && (
                    <div className="space-y-2 rounded-xl bg-navy-950/70 p-3.5 border border-navy-800">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${theme.text} block mb-1`}
                      >
                        Spesialisasi Kompetisi Robotika:
                      </span>
                      <div className="space-y-2">
                        <div className="rounded-lg bg-navy-900/80 p-2.5 border border-navy-800/80">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-text-main">
                              Autonomous Line Follower
                            </span>
                            <span
                              className={`text-[10px] font-semibold ${theme.text}`}
                            >
                              SD, SMP, SMA/SMK
                            </span>
                          </div>
                          <p className="text-[11px] text-text-soft line-clamp-1">
                            Navigasi lintasan cepat, rintangan balok, dan mekanik capit gripper.
                          </p>
                        </div>
                        <div className="rounded-lg bg-navy-900/80 p-2.5 border border-navy-800/80">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-text-main">
                              Dual-Robot Collaboration
                            </span>
                            <span
                              className={`text-[10px] font-semibold ${theme.text}`}
                            >
                              Mahasiswa
                            </span>
                          </div>
                          <p className="text-[11px] text-text-soft line-clamp-1">
                            Sistem kolaborasi R1 (LF otonom) dan R2 (Shooter penembak sasaran).
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Note: Energy Treasure & KTI Vortex sub-cards removed per user request */}
                </div>

                {/* Card Action Buttons (Direct to Dedicated Pages) */}
                <div className="mt-5 pt-4 border-t border-navy-800">
                  {isAutomationChallenge ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <Link
                        href="/competition/automation-challenge/iot"
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2.5 text-xs font-bold text-navy-950 shadow-md transition hover:from-gold-400 hover:to-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400"
                      >
                        <span>Halaman Jalur IoT</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <Link
                        href="/competition/automation-challenge/plc"
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-navy-900 px-4 py-2.5 text-xs font-bold text-rose-300 transition hover:bg-rose-500/10 hover:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <span>Halaman Jalur PLC</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={`/competition/${division.slug}`}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-2.5 text-xs font-bold text-navy-950 shadow-md transition hover:from-gold-400 hover:to-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400"
                      >
                        <span>Detail &amp; Regulasi Lengkap</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
