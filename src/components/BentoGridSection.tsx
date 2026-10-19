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
  return (
    <section id="tentang" className="py-12 md:py-16 bg-navy-950/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 md:mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Tentang &amp; Filosofi Acara
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-main sm:text-3xl md:text-4xl">
            Arsitektur Inovasi &amp; Ekosistem IARC XII
          </h2>
          <p className="mt-2 mx-auto max-w-2xl text-xs sm:text-sm text-text-soft">
            Konsolidasi rekayasa sistem otomasi, robotika presisi, dan transfer teknologi terapan dari kampus perjuangan ITS Surabaya.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-12">
          {/* Card 1: About & Theme Philosophy (Large, 7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-navy-700/80 bg-navy-900/70 p-5 sm:p-6 backdrop-blur-sm lg:col-span-7">
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

            <div className="mt-6 pt-4 border-t border-navy-800 flex flex-wrap items-center justify-between gap-3 text-xs text-text-dim">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold-400" />
                <span className="font-semibold text-text-soft">
                  {siteConfig.organizer}
                </span>
              </div>
              <span className="rounded-lg bg-navy-800 px-2.5 py-1 text-[11px] text-gold-400 font-medium">
                Kampus Sukolilo, Surabaya
              </span>
            </div>
          </div>

          {/* Card 2: Media Carousel (5 cols) */}
          <div className="rounded-2xl lg:col-span-5 flex flex-col">
            <MediaCarousel />
          </div>

          {/* Card 3: 7 Event Objectives (6 cols) */}
          <div className="rounded-2xl border border-navy-700/80 bg-navy-900/70 p-5 sm:p-6 backdrop-blur-sm lg:col-span-6 flex flex-col justify-between">
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

          {/* Card 4: Prize Pool Breakdown (6 cols) */}
          <div className="rounded-2xl border border-gold-500/30 bg-navy-900/70 p-5 sm:p-6 backdrop-blur-sm lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-wider">
                  <Trophy className="h-4 w-4" />
                  <span>Struktur Apresiasi &amp; Hadiah</span>
                </div>
                <span className="rounded-full bg-gold-500/20 px-3 py-1 text-xs font-bold text-gold-400 border border-gold-500/30">
                  Total {siteConfig.totalPrize}
                </span>
              </div>

              <h3 className="text-lg font-bold text-text-main mb-4">
                Paket Penghargaan Juara
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRIZE_DATA.map((prize, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-navy-800 bg-navy-950/70 p-3.5 transition hover:border-gold-500/40"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-gold-400">
                        {prize.rank}
                      </span>
                      <span className="text-[10px] text-text-dim uppercase tracking-wider font-semibold">
                        {prize.badge}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {prize.rewards.map((r, rIdx) => (
                        <li key={rIdx} className="text-[11px] text-text-soft flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-gold-400 shrink-0" />
                          <span className="truncate">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-navy-800 bg-navy-950/50 p-2.5 text-center text-[11px] text-text-dim">
              Setiap peserta yang terdaftar resmi mendapatkan akses ke program bimbingan daring Open Training IARC XII.
            </div>
          </div>

          {/* Card 5: Official Partnership & Sponsor (12 cols) */}
          <div className="rounded-2xl border border-navy-700/80 bg-navy-900/60 p-5 sm:p-6 backdrop-blur-sm lg:col-span-12">
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
                    Robokidz &ndash; Pelopor Edukasi Robotika &amp; Coding Generasi Muda
                  </h4>
                  <p className="mt-1 text-xs text-text-soft max-w-2xl">
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
