"use client";

import React, { useState } from "react";
import {
  FileText,
  Share2,
  CreditCard,
  ClipboardCheck,
  Users,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { usePdfModal } from "@/context/PdfModalContext";
import CountdownTimer from "./CountdownTimer";
import DecorativeBackground from "./DecorativeBackground";

interface StepItem {
  step: number;
  stepNumber: string;
  icon: React.ElementType;
  title: string;
  description: string;
  action: React.ReactNode;
}

export default function RegistrationFlowSection() {
  const { openModal } = usePdfModal();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps: StepItem[] = [
    {
      step: 1,
      stepNumber: "01",
      icon: FileText,
      title: "Baca Regulasi & Unduh Guidebook",
      description:
        "Pelajari syarat ketentuan, spesifikasi teknis alat, dan kriteria penilaian dari dokumen panduan resmi sebelum mendaftar.",
      action: (
        <button
          type="button"
          onClick={() => openModal("utama")}
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-semibold text-gold-400 transition duration-200 hover:border-gold-400 hover:bg-gold-500/20 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <span>Buka Guidebook Utama</span>
        </button>
      ),
    },
    {
      step: 2,
      stepNumber: "02",
      icon: Share2,
      title: "Unggah Twibbon & Caption Resmi",
      description:
        "Unggah Twibbon di Instagram masing-masing anggota tim, tandai akun @iarc.its serta 3 teman, lalu simpan bukti tangkapan layar.",
      action: (
        <div className="flex flex-col gap-2 sm:flex-row xl:flex-col 2xl:flex-row">
          <a
            href={siteConfig.twibbonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-navy-700 bg-navy-800/90 px-3 py-2 text-xs font-semibold text-text-main transition duration-200 hover:border-gold-500/50 hover:bg-navy-700/80 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <span>Unduh Twibbon</span>
            <ExternalLink className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
          </a>
          <a
            href={siteConfig.captionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-navy-700 bg-navy-800/90 px-3 py-2 text-xs font-semibold text-text-main transition duration-200 hover:border-blue-400/50 hover:bg-navy-700/80 hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <span>Salin Caption</span>
            <ExternalLink className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
          </a>
        </div>
      ),
    },
    {
      step: 3,
      stepNumber: "03",
      icon: CreditCard,
      title: "Pembayaran Biaya Pendaftaran",
      description:
        "Lakukan pembayaran biaya pendaftaran tim sesuai nominal gelombang aktif. Rekening tujuan resmi panitia tertera langsung pada Google Form.",
      action: (
        <div className="flex min-h-[44px] items-center rounded-xl border border-navy-800 bg-navy-950/80 px-3 py-2 text-[11px] font-medium leading-tight text-gold-400">
          <span>Nomor rekening &amp; petunjuk transfer tercantum di Google Form.</span>
        </div>
      ),
    },
    {
      step: 4,
      stepNumber: "04",
      icon: ClipboardCheck,
      title: "Pengisian Formulir Pendaftaran Online",
      description:
        "Lengkapi identitas tim, unggah bukti pembayaran transfer, kartu identitas pelajar/mahasiswa, dan tangkapan layar unggahan twibbon.",
      action: (
        <a
          href="#kompetisi"
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-4 py-2 text-xs font-bold text-navy-950 shadow-md shadow-gold-500/20 transition duration-200 hover:bg-gold-400 hover:shadow-gold-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <span>Pilih Cabang Lomba</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      ),
    },
    {
      step: 5,
      stepNumber: "05",
      icon: Users,
      title: "Verifikasi Berkas & Akses Open Training",
      description:
        "Panitia memverifikasi berkas dalam 1x24 jam. Tim lolos verifikasi menerima email konfirmasi dan tautan grup WhatsApp Open Training IARC XII.",
      action: (
        <div className="flex min-h-[44px] items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[11px] font-medium leading-tight text-emerald-400">
          <span>Materi bimbingan teknis intensif langsung dari dosen &amp; praktisi ITS.</span>
        </div>
      ),
    },
  ];

  return (
    <section id="alur" className="relative overflow-hidden bg-navy-950 py-12 md:py-16">
      <DecorativeBackground variant="section-c" />

      {/* Subtle ambient lighting */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-gold-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-400">
            <span>Panduan Registrasi</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-main sm:text-3xl md:text-4xl">
            Alur Pendaftaran Resmi IARC XII
          </h2>
          <p className="mx-auto mt-2.5 max-w-2xl text-xs text-text-soft sm:text-sm">
            Ikuti 5 tahapan berurutan berikut untuk menyelesaikan registrasi tim dan mengamankan slot kompetisi Anda.
          </p>

          {/* Active Batch Countdown Timer */}
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-md rounded-2xl border border-navy-700/80 bg-navy-900/70 p-4 shadow-xl backdrop-blur-md sm:p-5 text-left">
              <CountdownTimer
                targetDate="2026-11-15T23:59:59+07:00"
                batchName="Gelombang 2 (Batch 2)"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP VIEW (xl+): 5-Step Horizontal Connected Stepper Flow
           ========================================================================= */}
        <div className="hidden xl:block">
          {/* Step Nodes & Connecting Track Line */}
          <div className="relative mb-6">
            {/* Base Horizontal Track Line */}
            <div
              className="absolute left-[10%] right-[10%] top-6 h-0.5 bg-navy-800"
              aria-hidden="true"
            >
              {/* Highlight Track Line with Gold Gradient */}
              <div className="h-full w-full bg-gradient-to-r from-gold-500/30 via-gold-400/60 to-gold-500/30" />
            </div>

            {/* Stepper Node Points */}
            <div className="relative grid grid-cols-5 gap-4">
              {steps.map((item, idx) => {
                const isHovered = hoveredStep === item.step;
                const isLast = idx === steps.length - 1;

                return (
                  <div
                    key={`node-${item.step}`}
                    className="relative flex flex-col items-center"
                    onMouseEnter={() => setHoveredStep(item.step)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {/* Node Circle */}
                    <div
                      className={`relative z-10 flex h-13 w-13 items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                        isHovered
                          ? "scale-110 border-gold-400 bg-navy-900 shadow-[0_0_20px_rgba(217,169,79,0.35)] ring-4 ring-gold-500/20"
                          : "border-gold-500/50 bg-navy-900/90 shadow-md hover:border-gold-400"
                      }`}
                    >
                      <span className="font-mono text-base font-extrabold tracking-tight text-gold-400">
                        {item.stepNumber}
                      </span>
                    </div>

                    {/* Step label under node */}
                    <span
                      className={`mt-2 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                        isHovered ? "text-gold-400" : "text-text-dim"
                      }`}
                    >
                      Langkah {item.stepNumber}
                    </span>

                    {/* Flow arrow indicator between steps (except last) */}
                    {!isLast && (
                      <div
                        className="pointer-events-none absolute -right-3.5 top-4.5 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 shadow-sm"
                        aria-hidden="true"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-5 gap-4 items-stretch">
            {steps.map((item) => {
              const Icon = item.icon;
              const isHovered = hoveredStep === item.step;

              return (
                <div
                  key={`card-${item.step}`}
                  onMouseEnter={() => setHoveredStep(item.step)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 ${
                    isHovered
                      ? "-translate-y-1 border-gold-500/60 bg-navy-900/95 shadow-xl shadow-gold-500/10 ring-1 ring-gold-500/20"
                      : "border-navy-800 bg-navy-900/70 hover:border-gold-500/40 hover:bg-navy-900/90"
                  }`}
                >
                  {/* Top content */}
                  <div>
                    {/* Icon & Category Pill */}
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-200 ${
                          isHovered
                            ? "border-gold-500/40 bg-gold-500/20 text-gold-300"
                            : "border-gold-500/20 bg-gold-500/10 text-gold-400"
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="rounded-full border border-navy-700 bg-navy-800/80 px-2 py-0.5 font-mono text-[10px] font-bold text-text-dim">
                        Step {item.step}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3
                      className={`text-sm font-bold leading-snug transition-colors duration-200 ${
                        isHovered ? "text-gold-300" : "text-text-main"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="mt-2 text-xs leading-relaxed text-text-soft">
                      {item.description}
                    </p>
                  </div>

                  {/* Action area aligned at the bottom */}
                  <div className="mt-5 pt-3 border-t border-navy-800/80">
                    {item.action}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            TABLET & MOBILE VIEW (<xl): Vertical Connected Timeline Stepper Flow
           ========================================================================= */}
        <div className="relative mx-auto max-w-2xl xl:hidden">
          {/* Continuous Vertical Rail Line */}
          <div
            className="pointer-events-none absolute bottom-8 left-6 top-6 w-0.5 -translate-x-1/2 sm:left-7"
            aria-hidden="true"
          >
            {/* Background rail */}
            <div className="h-full w-full bg-navy-800" />
            {/* Gradient accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-gold-500/40 via-gold-400/60 to-gold-500/20" />
          </div>

          {/* Vertical Step Items */}
          <div className="space-y-6 sm:space-y-8">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredStep === item.step;
              const isLast = idx === steps.length - 1;

              return (
                <div
                  key={`mobile-step-${item.step}`}
                  className="relative flex items-start"
                  onMouseEnter={() => setHoveredStep(item.step)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step Marker Node on the vertical line */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                        isHovered
                          ? "scale-105 border-gold-400 bg-navy-900 shadow-[0_0_18px_rgba(217,169,79,0.35)] ring-4 ring-gold-500/20"
                          : "border-gold-500/50 bg-navy-950 shadow-md"
                      }`}
                    >
                      <span className="font-mono text-sm sm:text-base font-extrabold text-gold-400">
                        {item.stepNumber}
                      </span>
                    </div>

                    {/* Downward indicator between steps */}
                    {!isLast && (
                      <div
                        className="my-1 hidden sm:flex h-5 w-5 items-center justify-center rounded-full border border-gold-500/30 bg-navy-900 text-gold-400 shadow-sm"
                        aria-hidden="true"
                      >
                        <ArrowDown className="h-2.5 w-2.5" />
                      </div>
                    )}
                  </div>

                  {/* Card on the right */}
                  <div className="ml-4 flex-1 sm:ml-6">
                    <div
                      className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
                        isHovered
                          ? "-translate-y-0.5 border-gold-500/60 bg-navy-900/95 shadow-xl shadow-gold-500/10 ring-1 ring-gold-500/20"
                          : "border-navy-800 bg-navy-900/70 hover:border-gold-500/40 hover:bg-navy-900/90"
                      }`}
                    >
                      {/* Card Header: Icon & Step Label */}
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                              isHovered
                                ? "border-gold-500/40 bg-gold-500/20 text-gold-300"
                                : "border-gold-500/20 bg-gold-500/10 text-gold-400"
                            }`}
                          >
                            <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                          </div>
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-gold-400">
                            Langkah {item.stepNumber}
                          </span>
                        </div>
                      </div>

                      {/* Card Title */}
                      <h3
                        className={`text-sm sm:text-base font-bold leading-snug transition-colors duration-200 ${
                          isHovered ? "text-gold-300" : "text-text-main"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Card Description */}
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-text-soft">
                        {item.description}
                      </p>

                      {/* Card Action */}
                      <div className="mt-4 pt-3 border-t border-navy-800/80">
                        {item.action}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
