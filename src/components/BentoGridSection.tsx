"use client";

import React from "react";
import Image from "next/image";
import {
  Handshake,
  ShieldCheck,
} from "lucide-react";
import MediaCarousel from "./MediaCarousel";
import DecorativeBackground from "./DecorativeBackground";
import { siteConfig, PRIZE_DATA } from "@/data/siteConfig";

export default function BentoGridSection() {
  const about = siteConfig.about;

  return (
    <section id="tentang" className="py-12 md:py-16 bg-navy-950 relative overflow-hidden">
      <DecorativeBackground variant="section-a" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Tentang &amp; Filosofi Acara
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-main sm:text-3xl md:text-4xl">
            Arsitektur Inovasi &amp; Ekosistem IARC XII
          </h2>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-12">
          {/* Row 1 Left: About IARC (6 cols) with Heritage Corner Accent */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-navy-800 bg-navy-900 p-6 sm:p-7 transition-colors hover:border-gold-500/40 md:col-span-1 lg:col-span-6">
            {/* Heritage Corner Accent from Legacy Website (Photo 2) */}
            <svg
              className="absolute top-0 right-0 h-16 w-16 pointer-events-none"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M64 0L34 0L64 30V0Z" fill="#d9a94f" fillOpacity="0.9" />
              <line x1="28" y1="0" x2="64" y2="36" stroke="#e8c07d" strokeWidth="2" strokeOpacity="0.75" />
            </svg>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-main">
                ABOUT <span className="text-gold-400">IARC</span>
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-text-soft">
                {about?.subtitle || "Industrial Automation & Robotics Competition"}
              </p>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-text-soft">
                {about?.paragraph1}
              </p>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-text-soft">
                {about?.paragraph2}
              </p>

              {/* Official Legacy Quote from Old Website */}
              {about?.quoteEn && (
                <div className="mt-4 rounded-xl border-l-2 border-l-gold-400 border border-navy-800 bg-navy-950/70 p-3.5 text-xs text-text-soft leading-relaxed">
                  <p className="italic text-text-main/90 font-medium">
                    &ldquo;{about.quoteEn}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Key Fact Pills */}
            <div className="mt-6 pt-4 border-t border-navy-800/90 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              {about?.highlights.map((h, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-navy-800 bg-navy-950/60 p-2.5 text-left"
                >
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-gold-400">
                    {h.label}
                  </span>
                  <span className="mt-0.5 block text-xs font-medium text-text-soft">
                    {h.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 1 Right: Paket Penghargaan Juara (6 cols) */}
          <div className="rounded-2xl border border-gold-500/30 bg-navy-900 p-6 sm:p-7 md:col-span-1 lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-text-main">
                  Paket Penghargaan Juara
                </h3>
                <span className="w-fit shrink-0 rounded-full bg-gold-500/20 px-3.5 py-1 text-xs font-bold text-gold-400 border border-gold-500/30">
                  Total {siteConfig.totalPrize}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRIZE_DATA.map((prize, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-3.5 transition flex flex-col justify-between ${idx === 0
                      ? "border-gold-500/50 bg-navy-950/90 shadow-sm"
                      : "border-navy-800 bg-navy-950/70 hover:border-gold-500/30"
                      }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-gold-400">
                          {prize.rank}
                        </span>
                        <span className="text-[10px] text-text-soft uppercase tracking-wider font-semibold">
                          {prize.badge}
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {prize.rewards.map((r, rIdx) => (
                          <li key={rIdx} className="text-xs text-text-soft flex items-start gap-1.5 leading-snug">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0 mt-1" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-navy-800 bg-navy-950/50 p-3 text-center text-xs text-text-soft">
              Setiap peserta yang terdaftar resmi mendapatkan akses ke program bimbingan daring Open Training IARC XII.
            </div>
          </div>

          {/* Row 2 Left: Engineering Systems That Moves The World (6 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-navy-800 bg-navy-900 p-6 sm:p-7 md:col-span-1 lg:col-span-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-main leading-tight">
                {siteConfig.theme}
              </h3>
              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-text-soft">
                {siteConfig.themePhilosophy}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-navy-800 flex items-center gap-2.5 text-xs text-text-soft">
              <span className="font-semibold text-text-main">
                {siteConfig.organizer}
              </span>
            </div>
          </div>

          {/* Row 2 Right: Dokumentasi Resmi (MediaCarousel) (6 cols) */}
          <div className="md:col-span-1 lg:col-span-6 flex flex-col">
            <MediaCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
