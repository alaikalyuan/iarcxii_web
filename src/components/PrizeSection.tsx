"use client";

import React from "react";
import DecorativeBackground from "./DecorativeBackground";
import { getSiteConfig, getPrizeData } from "@/data/siteConfig";
import { useLanguage } from "@/context/LanguageContext";

function RewardList({ rewards, className = "" }: { rewards: string[]; className?: string }) {
  return (
    <ul className={`divide-y divide-navy-800 text-sm text-text-soft ${className}`}>
      {rewards.map((reward, idx) => (
        <li key={idx} className="py-2.5 leading-snug">
          {reward}
        </li>
      ))}
    </ul>
  );
}

export default function PrizeSection() {
  const { language, t } = useLanguage();
  const currentSiteConfig = getSiteConfig(language);
  const prizeList = getPrizeData(language);

  const [firstPrize, secondPrize, thirdPrize, allParticipants] = prizeList;

  return (
    <section id="hadiah" className="relative overflow-hidden bg-navy-950 py-14 md:py-20">
      <DecorativeBackground variant="section-a" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-text-main md:text-4xl">
          {t.prizes.sectionTitle}
        </h2>

        <div className="mt-8 rounded-md border border-navy-800 bg-navy-900 p-6 sm:p-8">
          <p className="text-sm text-text-dim">{t.prizes.totalPrizeLabel}</p>
          <p className="mt-1 text-4xl font-extrabold text-gold-400 sm:text-5xl md:text-6xl">
            {currentSiteConfig.totalPrize}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-soft">
            {t.prizes.totalPrizeSub}
          </p>
        </div>

        {firstPrize && (
          <div className="mt-8 rounded-md border border-gold-500/60 bg-navy-900 p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="text-2xl font-bold text-text-main sm:text-3xl">{firstPrize.rank}</h3>
              <p className="text-sm text-gold-400">{firstPrize.badge}</p>
            </div>
            <RewardList
              rewards={firstPrize.rewards}
              className="mt-4 grid grid-cols-1 gap-x-10 divide-y-0 md:grid-cols-2 [&>li]:border-b [&>li]:border-navy-800"
            />
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[secondPrize, thirdPrize].map(
            (prize) =>
              prize && (
                <div key={prize.rank} className="rounded-md border border-navy-800 bg-navy-900 p-5 sm:p-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-xl font-bold text-text-main">{prize.rank}</h3>
                    <p className="text-sm text-text-dim">{prize.badge}</p>
                  </div>
                  <RewardList rewards={prize.rewards} className="mt-3" />
                </div>
              )
          )}
        </div>

        {allParticipants && (
          <div className="mt-6 rounded-md border border-navy-800 bg-navy-900 p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-xl font-bold text-text-main">{allParticipants.rank}</h3>
              <p className="text-sm text-text-dim">{allParticipants.badge}</p>
            </div>
            <p className="mt-2 text-sm text-text-soft">{t.prizes.allParticipantsDesc}</p>
            <RewardList
              rewards={allParticipants.rewards}
              className="mt-3 grid grid-cols-1 gap-x-10 divide-y-0 md:grid-cols-3 [&>li]:border-b [&>li]:border-navy-800"
            />
          </div>
        )}

        <div className="mt-6 flex flex-col gap-5 rounded-md border border-navy-800 bg-navy-900 p-5 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-text-soft">
            {t.prizes.officialCertificationNotice}
          </p>
          <a
            href="#kompetisi"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-950 transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          >
            {t.prizes.exploreCompetitionsCta}
          </a>
        </div>
      </div>
    </section>
  );
}
