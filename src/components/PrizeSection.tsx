"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Award, Medal, Users, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import DecorativeBackground from "./DecorativeBackground";
import { getSiteConfig, getPrizeData } from "@/data/siteConfig";
import { useLanguage } from "@/context/LanguageContext";

export default function PrizeSection() {
  const { language, t } = useLanguage();
  const currentSiteConfig = getSiteConfig(language);
  const prizeList = getPrizeData(language);

  // Divide prize data into specific tiers
  const firstPrize = prizeList[0];
  const secondPrize = prizeList[1];
  const thirdPrize = prizeList[2];
  const allParticipants = prizeList[3];

  return (
    <section id="hadiah" className="py-14 md:py-20 bg-navy-950 relative overflow-hidden">
      <DecorativeBackground variant="section-a" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 md:mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
            {t.prizes.sectionBadge}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-main sm:text-3xl md:text-4xl">
            {t.prizes.sectionTitle}
          </h2>
        </div>

        {/* Total Prize Pool Hero Showcase */}
        <div className="mb-8 rounded-2xl border border-gold-500/40 bg-gradient-to-b from-navy-900 to-navy-900/90 p-6 sm:p-8 md:p-10 shadow-lg relative overflow-hidden">
          {/* Subtle gold corner ornament */}
          <svg
            className="absolute top-0 right-0 h-20 w-20 pointer-events-none opacity-40 sm:opacity-60"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M80 0L40 0L80 40V0Z" fill="#d9a94f" />
            <line x1="30" y1="0" x2="80" y2="50" stroke="#e8c07d" strokeWidth="2" />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-lg border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
                <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                {t.prizes.totalPrizeLabel}
              </span>
              <div className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-400 tracking-tight">
                {currentSiteConfig.totalPrize}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-text-soft max-w-xl leading-relaxed">
                {t.prizes.totalPrizeSub}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-navy-800 lg:pl-6">
              <div className="rounded-xl border border-navy-800 bg-navy-950/70 p-3.5">
                <div className="text-xs font-semibold text-text-main flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-gold-400 shrink-0" aria-hidden="true" />
                  <span>Sertifikat Resmi ITS</span>
                </div>
                <p className="mt-1 text-[11px] text-text-soft leading-snug">
                  Terakreditasi departemen untuk portofolio SNBP & karir.
                </p>
              </div>

              <div className="rounded-xl border border-navy-800 bg-navy-950/70 p-3.5">
                <div className="text-xs font-semibold text-text-main flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-gold-400 shrink-0" aria-hidden="true" />
                  <span>Free Open Training</span>
                </div>
                <p className="mt-1 text-[11px] text-text-soft leading-snug">
                  Bimbingan teknis otomasi dan robotika intensif.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tiered Award Cards */}
        <div className="space-y-5">
          {/* Juara 1: Primary Featured Card */}
          {firstPrize && (
            <div className="rounded-2xl border-2 border-gold-500/70 bg-navy-900 p-6 sm:p-7 md:p-8 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-navy-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/40">
                    <Trophy className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-text-main">
                      {firstPrize.rank}
                    </h3>
                    <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
                      {firstPrize.badge}
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-xs font-bold text-gold-400">
                  Apresiasi Tertinggi
                </span>
              </div>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-text-soft mb-3">
                  Paket Penghargaan Juara 1:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {firstPrize.rewards.map((reward, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl border border-navy-800 bg-navy-950/70 p-3 text-xs text-text-main leading-relaxed"
                    >
                      <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{reward}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Juara 2 & Juara 3: Dual Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Juara 2 */}
            {secondPrize && (
              <div className="rounded-2xl border border-navy-700 bg-navy-900 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-navy-800">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-700/40 text-slate-200 border border-slate-600/50">
                        <Medal className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-text-main">
                          {secondPrize.rank}
                        </h4>
                        <span className="text-[11px] font-semibold text-text-soft uppercase tracking-wider">
                          {secondPrize.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {secondPrize.rewards.map((reward, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-text-soft leading-snug"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{reward}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Juara 3 */}
            {thirdPrize && (
              <div className="rounded-2xl border border-navy-700 bg-navy-900 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-navy-800">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-900/30 text-amber-300 border border-amber-800/50">
                        <Award className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-text-main">
                          {thirdPrize.rank}
                        </h4>
                        <span className="text-[11px] font-semibold text-text-soft uppercase tracking-wider">
                          {thirdPrize.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {thirdPrize.rewards.map((reward, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-text-soft leading-snug"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{reward}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Benefit Seluruh Peserta: Inclusive Value Banner */}
          {allParticipants && (
            <div className="rounded-2xl border border-navy-800 bg-navy-900/90 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3 border-b border-navy-800">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20">
                    <Users className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-text-main">
                      {allParticipants.rank}
                    </h4>
                    <span className="text-[11px] text-text-soft uppercase tracking-wider font-semibold">
                      {allParticipants.badge}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gold-400 font-medium">
                  {t.prizes.allParticipantsDesc}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {allParticipants.rewards.map((reward, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-xl border border-navy-800 bg-navy-950/60 p-3 text-xs text-text-soft leading-snug"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0 mt-1.5" />
                    <span>{reward}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Official Certification Notice & Navigation CTA */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-900/60 p-4 sm:p-5">
          <p className="text-xs text-text-soft leading-relaxed text-center md:text-left max-w-2xl">
            {t.prizes.officialCertificationNotice}
          </p>

          <Link
            href="/#kompetisi"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-2.5 text-xs font-bold text-navy-950 transition hover:from-gold-400 hover:to-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <span>{t.prizes.exploreCompetitionsCta}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
