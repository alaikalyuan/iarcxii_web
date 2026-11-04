"use client";

import React from "react";
import Image from "next/image";
import Hexagon3DVisual from "./Hexagon3DVisual";
import DecorativeBackground from "./DecorativeBackground";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-20 pb-8 md:pt-28 md:pb-12">
      <DecorativeBackground variant="hero" showHoneycomb={false} />

      <Hexagon3DVisual />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-2xl flex-col items-start text-left lg:max-w-3xl">
          <Image
            src="/images/logo-full.png"
            alt="IARC XII - Industrial Automation & Robotics Competition Logo"
            width={540}
            height={160}
            priority
            className="mb-6 h-20 w-auto object-contain sm:h-28 md:h-36"
          />

          <h1 className="text-2xl font-bold leading-tight text-text-main sm:text-3xl md:text-4xl">
            {t.hero.titlePrefix}
            <span className="text-gold-400">{t.hero.titleHighlight}</span>
            {t.hero.titleSuffix}
          </h1>

          <a
            href="#kompetisi"
            className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold-500 px-7 py-3 text-sm font-bold text-navy-950 transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          >
            {t.hero.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
