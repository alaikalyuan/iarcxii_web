"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Hexagon3DVisual from "./Hexagon3DVisual";
import DecorativeBackground from "./DecorativeBackground";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen min-h-[100dvh] min-h-[92vh] flex flex-col justify-center overflow-hidden pt-20 pb-8 md:pt-28 md:pb-12">
      {/* Decorative Gear, Rhombus, Elipse & Gold-Blue Ambient Glow (from figma_shapes) */}
      <DecorativeBackground variant="hero" showHoneycomb={false} />

      {/* 3D Hexagon Visual Layer (Right/Bottom-Right Cluster from figma_shapes & Perspective Mesh) */}
      <Hexagon3DVisual />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-start text-left max-w-2xl lg:max-w-3xl">
          {/* Institutional Eyebrow text (No pill capsule, Middle dot instead of em-dash per R-02) */}
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-semibold tracking-wider text-gold-400/90 uppercase drop-shadow-[0_2px_8px_rgba(10,14,24,0.9)]"
          >
            {t.hero.eyebrow}
          </motion.p>

          {/* Large Official IARC XII Brand Identity Logo (with Dual Gears from Foto 1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 mb-5"
          >
            <div className="relative inline-block">
              <Image
                src="/images/logo-full.png"
                alt="IARC XII - Industrial Automation & Robotics Competition Logo"
                width={540}
                height={160}
                priority
                className="h-20 sm:h-28 md:h-36 w-auto object-contain drop-shadow-[0_10px_35px_rgba(217,169,79,0.35)]"
              />
            </div>
          </motion.div>

          {/* Subtitle Typography: Industrial Automation & Robotic Competition */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wide uppercase text-text-main leading-tight drop-shadow-[0_2px_12px_rgba(10,14,24,0.85)]"
          >
            {t.hero.titlePrefix}
            <span className="text-gold-400">{t.hero.titleHighlight}</span>
            {t.hero.titleSuffix}
          </motion.h1>

          {/* Single Solid Gold CTA (Clean, No Arrow Clutter per R-08 & R-15) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <a
              href="#kompetisi"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#deb458] px-8 py-3.5 text-sm sm:text-base font-bold text-navy-950 shadow-[0_0_25px_rgba(222,180,88,0.3)] transition-all duration-200 hover:bg-[#eac46c] hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              {t.hero.ctaButton}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
