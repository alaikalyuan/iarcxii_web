"use client";

import React from "react";
import MediaCarousel from "./MediaCarousel";
import DecorativeBackground from "./DecorativeBackground";
import { getSiteConfig } from "@/data/siteConfig";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { language, t } = useLanguage();
  const currentSiteConfig = getSiteConfig(language);
  const about = currentSiteConfig.about;

  return (
    <section id="tentang" className="relative overflow-hidden bg-navy-950 py-14 md:py-20">
      <DecorativeBackground variant="section-a" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-text-main md:text-4xl">
          {t.bento.aboutTitlePrefix}
          <span className="text-gold-400">{t.bento.aboutTitleHighlight}</span>
        </h2>
        <p className="mt-2 text-sm font-semibold text-text-soft sm:text-base">
          {about?.subtitle || t.bento.aboutSubtitle}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 text-sm leading-relaxed text-text-soft lg:grid-cols-2 lg:gap-12">
          <p>{about?.paragraph1 || t.bento.aboutParagraph1}</p>
          <p>{about?.paragraph2 || t.bento.aboutParagraph2}</p>
        </div>

        {about?.quoteEn && (
          <p className="mt-8 max-w-3xl text-lg italic leading-relaxed text-text-main sm:text-xl">
            &ldquo;{about.quoteEn}&rdquo;
          </p>
        )}

        <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(about?.highlights || t.bento.aboutHighlights).map((h, i) => (
            <div key={i} className="rounded-md border border-navy-800 bg-navy-900 p-4">
              <dt className="text-xs text-text-dim">{h.label}</dt>
              <dd className="mt-1 text-sm font-medium text-text-main">{h.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="rounded-md border border-navy-800 bg-navy-900 p-6 sm:p-8 lg:col-span-5">
            <h3 className="text-xl font-bold leading-snug text-text-main sm:text-2xl">
              {currentSiteConfig.theme}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-text-soft">
              {currentSiteConfig.themePhilosophy}
            </p>
            <p className="mt-6 text-sm font-semibold text-text-main">
              {currentSiteConfig.organizer}
            </p>
          </div>

          <div className="lg:col-span-7">
            <MediaCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
