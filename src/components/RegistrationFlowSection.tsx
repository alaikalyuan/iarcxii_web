"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { usePdfModal } from "@/context/PdfModalContext";
import CountdownTimer from "./CountdownTimer";
import DecorativeBackground from "./DecorativeBackground";
import { useLanguage } from "@/context/LanguageContext";

interface StepItem {
  number: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

const actionBase =
  "inline-flex min-h-[44px] w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400";

export default function RegistrationFlowSection() {
  const { openModal } = usePdfModal();
  const { t } = useLanguage();

  const steps: StepItem[] = [
    {
      number: "01",
      title: t.flow.step1Title,
      description: t.flow.step1Desc,
      action: (
        <button
          type="button"
          onClick={() => openModal("utama")}
          className={`${actionBase} border border-gold-500/50 text-gold-400 hover:bg-gold-500/10`}
        >
          {t.flow.step1Action}
        </button>
      ),
    },
    {
      number: "02",
      title: t.flow.step2Title,
      description: t.flow.step2Desc,
      action: (
        <a href="#kompetisi" className={`${actionBase} bg-gold-500 text-navy-950 hover:bg-gold-400`}>
          {t.flow.step2Action}
        </a>
      ),
    },
    {
      number: "03",
      title: t.flow.step3Title,
      description: t.flow.step3Desc,
      action: (
        <div className="flex flex-col gap-2">
          <a
            href={siteConfig.twibbonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${actionBase} border border-navy-600 text-text-main hover:border-gold-500/60 hover:text-gold-400`}
          >
            {t.flow.step3ActionTwibbon}
          </a>
          <a
            href={siteConfig.captionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${actionBase} border border-navy-600 text-text-main hover:border-gold-500/60 hover:text-gold-400`}
          >
            {t.flow.step3ActionCaption}
          </a>
        </div>
      ),
    },
    {
      number: "04",
      title: t.flow.step4Title,
      description: t.flow.step4Desc,
    },
    {
      number: "05",
      title: t.flow.step5Title,
      description: t.flow.step5Desc,
    },
  ];

  return (
    <section id="alur" className="relative overflow-hidden bg-navy-950 py-14 md:py-20">
      <DecorativeBackground variant="section-c" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-3xl font-bold text-text-main md:text-4xl">
            {t.flow.sectionTitle}
          </h2>
          <div className="w-full max-w-md">
            <CountdownTimer targetDate="2026-11-15T23:59:59+07:00" />
          </div>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((item) => (
            <li key={item.number} className="flex flex-col rounded-md border border-navy-800 bg-navy-900 p-5">
              <span className="font-mono text-sm font-bold text-gold-400">{item.number}</span>
              <h3 className="mt-2 text-base font-bold leading-snug text-text-main">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-soft">{item.description}</p>
              {item.action && <div className="mt-auto pt-5">{item.action}</div>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
