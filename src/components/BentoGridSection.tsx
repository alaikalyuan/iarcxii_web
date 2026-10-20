"use client";

import React from "react";
import Image from "next/image";
import {
  Trophy,
  CheckCircle2,
  Building2,
  Handshake,
  ShieldCheck,
  Award,
} from "lucide-react";
import MediaCarousel from "./MediaCarousel";
import { siteConfig, PRIZE_DATA } from "@/data/siteConfig";

export default function BentoGridSection() {
  const about = siteConfig.about;

  return (
    <section id="tentang" className="py-12 md:py-16 bg-navy-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Tentang &amp; Filosofi Acara
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-main sm:text-3xl md:text-4xl">
            Arsitektur Inovasi &amp; Ekosistem IARC XII
          </h2>
          <p className="mt-2.5 mx-auto max-w-2xl text-xs sm:text-sm text-text-soft leading-relaxed">
            Konsolidasi rekayasa sistem otomasi, robotika presisi, dan transfer teknologi terapan dari Departemen Teknik Elektro Otomasi ITS Surabaya.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-12">
          {/* Card 1 (Kartu Utama): About IARC XII with Heritage Corner Accent */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-navy-800 bg-navy-900 p-6 sm:p-7 transition-colors hover:border-gold-500/40 md:col-span-2 lg:col-span-7">
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
              <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">
                <span>{about?.badge || "Tentang Acara"}</span>
              </div>
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

          {/* Card 2: Media Carousel (Visual Evidence / Documentation) */}
          <div className="md:col-span-2 lg:col-span-5 flex flex-col">
            <MediaCarousel />
          </div>

          {/* Card 3: Penyelenggara & Filosofi Tema */}
          <div className="flex flex-col justify-between rounded-2xl border border-navy-800 bg-navy-900 p-5 sm:p-6 md:col-span-1 lg:col-span-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">
                <Building2 className="h-4 w-4" />
                <span>Penyelenggara &amp; Filosofi Tema</span>
              </div>
              <h3 className="text-xl font-bold text-text-main">
                {siteConfig.theme}
              </h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-text-soft">
                {siteConfig.themePhilosophy}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-navy-800 flex items-center gap-2 text-xs text-text-soft">
              <ShieldCheck className="h-4 w-4 text-gold-400 shrink-0" />
              <span className="font-semibold text-text-main">
                {siteConfig.organizer}
              </span>
            </div>
          </div>

          {/* Card 4: 7 Sasaran Utama Kegiatan */}
          <div className="rounded-2xl border border-navy-800 bg-navy-900 p-5 sm:p-6 md:col-span-1 lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">
                <Award className="h-4 w-4" />
                <span>7 Sasaran Utama Kegiatan</span>
              </div>
              <h3 className="text-lg font-bold text-text-main mb-4">
                Tujuan Kegiatan IARC XII
              </h3>
              <ul className="space-y-2.5">
                {siteConfig.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-soft">
                    <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 5: Prize Pool Breakdown (12 cols across desktop) */}
          <div className="rounded-2xl border border-gold-500/30 bg-navy-900 p-5 sm:p-6 md:col-span-2 lg:col-span-12 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-wider">
                  <Trophy className="h-4 w-4" />
                  <span>Struktur Apresiasi &amp; Hadiah</span>
                </div>
                <span className="rounded-full bg-gold-500/20 px-3.5 py-1 text-xs font-bold text-gold-400 border border-gold-500/30">
                  Total {siteConfig.totalPrize}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-text-main mb-4">
                Paket Penghargaan Juara
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {PRIZE_DATA.map((prize, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 transition ${
                      idx === 0
                        ? "border-gold-500/50 bg-navy-950/90 shadow-sm"
                        : "border-navy-800 bg-navy-950/70 hover:border-gold-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
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
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-navy-800 bg-navy-950/50 p-3 text-center text-xs text-text-soft">
              Setiap peserta yang terdaftar resmi mendapatkan akses ke program bimbingan daring Open Training IARC XII.
            </div>
          </div>

          {/* Card 6: Official Partnership & Sponsor (12 cols) */}
          <div className="rounded-2xl border border-navy-800 bg-navy-900 p-5 sm:p-6 md:col-span-2 lg:col-span-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div className="relative flex h-16 w-36 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-sm">
                  <Image
                    src="/images/logo_robokidz.png"
                    alt="Logo Sponsor Robokidz"
                    width={130}
                    height={50}
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">
                    <Handshake className="h-3.5 w-3.5" />
                    <span>Official Educational Partner</span>
                  </div>
                  <h4 className="text-base font-bold text-text-main">
                    Robokidz: Pelopor Edukasi Robotika &amp; Coding Generasi Muda
                  </h4>
                  <p className="mt-1 text-xs text-text-soft max-w-2xl leading-relaxed">
                    Mendukung pengembangan bakat sains, rekayasa perangkat lunak, dan robotika aplikatif sejak dini untuk menciptakan inovator teknologi masa depan.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="rounded-full border border-navy-700 bg-navy-800 px-3.5 py-1.5 text-xs font-semibold text-text-soft">
                  Sponsor Resmi IARC XII
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
