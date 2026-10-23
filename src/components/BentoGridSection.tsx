"use client";

import React from "react";
import MediaCarousel from "./MediaCarousel";
import DecorativeBackground from "./DecorativeBackground";
import { getSiteConfig } from "@/data/siteConfig";
import { useLanguage } from "@/context/LanguageContext";

export default function BentoGridSection() {
  const { language, t } = useLanguage();
  const currentSiteConfig = getSiteConfig(language);
  const about = currentSiteConfig.about;

  return (
    <section id="tentang" className="py-12 md:py-16 bg-navy-950 relative overflow-hidden">
      <DecorativeBackground variant="section-a" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
            {t.bento.sectionBadge}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-main sm:text-3xl md:text-4xl">
            {t.bento.sectionTitle}
          </h2>
        </div>

        {/* Asymmetric Architecture: Full-width About card on top, Theme & Media side-by-side below */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Row 1: Full-width About IARC (12 cols) with Heritage Corner Accent */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-navy-800 bg-navy-900 p-6 sm:p-8 md:p-10 transition-colors hover:border-gold-500/40 lg:col-span-12">
            {/* Heritage Corner Accent from Legacy Website */}
            <svg
              className="absolute top-0 right-0 h-20 w-20 pointer-events-none"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M64 0L34 0L64 30V0Z" fill="#d9a94f" fillOpacity="0.9" />
              <line x1="28" y1="0" x2="64" y2="36" stroke="#e8c07d" strokeWidth="2" strokeOpacity="0.75" />
            </svg>

            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-text-main">
                {t.bento.aboutTitlePrefix}
                <span className="text-gold-400">{t.bento.aboutTitleHighlight}</span>
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-text-soft">
                {about?.subtitle || t.bento.aboutSubtitle}
              </p>

              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm leading-relaxed text-text-soft">
                <p>
                  {about?.paragraph1 || t.bento.aboutParagraph1}
                </p>
                <p>
                  {about?.paragraph2 || t.bento.aboutParagraph2}
                </p>
              </div>

              {/* Official Legacy Quote from Old Website */}
              {about?.quoteEn && (
                <div className="mt-5 rounded-xl border-l-2 border-l-gold-400 border border-navy-800 bg-navy-950/70 p-4 text-xs sm:text-sm text-text-soft leading-relaxed">
                  <p className="italic text-text-main/90 font-medium">
                    &ldquo;{about.quoteEn}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Key Fact Pills */}
            <div className="mt-8 pt-5 border-t border-navy-800/90 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {(about?.highlights || t.bento.aboutHighlights).map((h, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-navy-800 bg-navy-950/60 p-3.5 text-left"
                >
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-gold-400">
                    {h.label}
                  </span>
                  <span className="mt-1 block text-xs sm:text-sm font-medium text-text-main">
                    {h.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 Left: Theme & Philosophy (6 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-navy-800 bg-navy-900 p-6 sm:p-8 lg:col-span-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gold-400 mb-2">
                Filosofi Tema
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-text-main leading-tight tracking-wide">
                {currentSiteConfig.theme}
              </h3>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-text-soft">
                {currentSiteConfig.themePhilosophy}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-navy-800 flex items-center gap-2.5 text-xs text-text-soft">
              <span className="font-semibold text-text-main">
                {currentSiteConfig.organizer}
              </span>
            </div>
          </div>

          {/* Row 2 Right: Official Media Carousel (6 cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <MediaCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
