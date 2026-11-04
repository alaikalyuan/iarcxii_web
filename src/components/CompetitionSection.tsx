"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getCompetitions } from "@/data/competitions";
import { EducationLevel } from "@/types";
import { getDivisionTheme } from "@/data/divisionThemes";
import DecorativeBackground from "./DecorativeBackground";
import { useLanguage } from "@/context/LanguageContext";

const filterLevels: EducationLevel[] = [
  "Semua",
  "SD",
  "SMP",
  "SMA/SMK",
  "Mahasiswa",
  "International",
];

const buttonBase =
  "inline-flex min-h-[44px] items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400";

export default function CompetitionSection() {
  const { language, t } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel>("Semua");
  const id = language === "id";

  const allDivisions = useMemo(() => getCompetitions(language), [language]);

  const filteredDivisions = useMemo(() => {
    if (selectedLevel === "Semua") {
      return allDivisions;
    }
    return allDivisions.filter((div) => div.levels.includes(selectedLevel));
  }, [allDivisions, selectedLevel]);

  return (
    <section id="kompetisi" className="relative overflow-hidden bg-navy-950 py-14 md:py-20">
      <DecorativeBackground variant="section-b" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-text-main md:text-4xl">
          {t.competitions.sectionTitle}
        </h2>

        <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label={t.competitions.targetLevelsPrefix}>
          {filterLevels.map((lvl) => {
            const isActive = lvl === selectedLevel;
            const label = t.competitions.levelFilters[lvl] || lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                aria-pressed={isActive}
                className={`${buttonBase} ${
                  isActive
                    ? "bg-gold-500 text-navy-950"
                    : "border border-navy-600 text-text-soft hover:border-gold-500/60 hover:text-text-main"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredDivisions.map((division) => {
            const theme = getDivisionTheme(division.slug);
            const isAutomationChallenge = division.slug === "automation-challenge";
            const isSmartRobotics = division.slug === "smart-robotics";

            return (
              <article
                key={division.slug}
                className={`flex flex-col justify-between rounded-md border border-navy-800 bg-navy-900 p-5 transition-colors sm:p-6 ${theme.cardHoverBorder}`}
              >
                <div>
                  <h3 className={`text-xl font-bold ${theme.text}`}>{division.name}</h3>
                  <p className="mt-1 text-sm text-text-dim">{division.tagline}</p>

                  <p className="mt-4 text-sm leading-relaxed text-text-soft">
                    {division.description}
                  </p>

                  <p className="mt-4 text-sm text-text-dim">
                    {t.competitions.targetLevelsPrefix}
                    {division.levels.map((lvl, i) => {
                      const isSelected = lvl === selectedLevel;
                      return (
                        <span
                          key={lvl}
                          className={isSelected ? `font-semibold ${theme.text}` : "text-text-soft"}
                        >
                          {i > 0 ? ", " : ""}
                          {t.competitions.levelFilters[lvl] || lvl}
                        </span>
                      );
                    })}
                  </p>

                  {isAutomationChallenge && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-text-main">
                        {id ? "2 jalur spesialisasi" : "2 specialization tracks"}
                      </p>
                      <ul className="mt-2 divide-y divide-navy-800 border-y border-navy-800">
                        <li>
                          <Link
                            href="/competition/automation-challenge/iot"
                            className="group/track block py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                          >
                            <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                              <span className="text-sm font-bold text-text-main transition-colors group-hover/track:text-purple-400">
                                Microcontroller (IoT)
                              </span>
                              <span className={`text-xs font-semibold ${theme.text}`}>
                                {id ? "5 jenjang" : "5 categories"}
                              </span>
                            </span>
                            <span className="mt-1 block text-xs leading-relaxed text-text-soft">
                              {id
                                ? "Sistem otomasi cerdas berbasis IoT sesuai 3 Pusat Studi ITS."
                                : "Smart IoT automation systems aligned with 3 ITS Research Study Centers."}
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/competition/automation-challenge/plc"
                            className="group/track block py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                          >
                            <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                              <span className="text-sm font-bold text-text-main transition-colors group-hover/track:text-purple-400">
                                PLC (Industrial)
                              </span>
                              <span className={`text-xs font-semibold ${theme.text}`}>
                                {id ? "2 jenjang" : "2 categories"}
                              </span>
                            </span>
                            <span className="mt-1 block text-xs leading-relaxed text-text-soft">
                              {id
                                ? "Ladder diagram Omron CP2E-N & Haiwell SCADA HMI."
                                : "Omron CP2E-N ladder diagram & Haiwell SCADA HMI."}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}

                  {isSmartRobotics && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-text-main">
                        {id ? "Spesialisasi robotika" : "Robotics focus"}
                      </p>
                      <ul className="mt-2 divide-y divide-navy-800 border-y border-navy-800">
                        <li className="py-3">
                          <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                            <span className="text-sm font-bold text-text-main">
                              Autonomous Line Follower
                            </span>
                            <span className={`text-xs font-semibold ${theme.text}`}>
                              {id ? "SD, SMP, SMA/SMK" : "Elementary, Junior & Senior High"}
                            </span>
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-text-soft">
                            {id
                              ? "Navigasi lintasan cepat, rintangan balok, dan mekanik capit gripper."
                              : "High-speed line navigation, obstacle blocks, and gripper pick-and-place."}
                          </span>
                        </li>
                        <li className="py-3">
                          <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                            <span className="text-sm font-bold text-text-main">
                              Dual-Robot Collaboration
                            </span>
                            <span className={`text-xs font-semibold ${theme.text}`}>
                              {id ? "Mahasiswa" : "University"}
                            </span>
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-text-soft">
                            {id
                              ? "Sistem kolaborasi R1 (LF otonom) dan R2 (Shooter penembak sasaran)."
                              : "Cooperative system: R1 (Autonomous Line Follower) and R2 (Shooter Robot)."}
                          </span>
                        </li>
                      </ul>
                      <p className="mt-3 text-xs text-text-dim">
                        {id ? "Web app dan showcase LF: " : "LF web app and showcase: "}
                        <a
                          href="https://ismarintan98.github.io/LF_ITS-Share/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-rose-400 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                        >
                          {id ? "Panduan & Web App" : "Guide & Web App"}
                        </a>
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  {isAutomationChallenge ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Link
                        href="/competition/automation-challenge/iot"
                        className={`${buttonBase} bg-gold-500 text-navy-950 hover:bg-gold-400`}
                      >
                        {id ? "Halaman Jalur IoT" : "IoT Track Details"}
                      </Link>
                      <Link
                        href="/competition/automation-challenge/plc"
                        className={`${buttonBase} border border-purple-500/50 text-purple-300 hover:bg-purple-500/10`}
                      >
                        {id ? "Halaman Jalur PLC" : "PLC Track Details"}
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/competition/${division.slug}`}
                      className={`${buttonBase} w-full bg-gold-500 text-navy-950 hover:bg-gold-400`}
                    >
                      {t.competitions.viewDetails}
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
