"use client";

import React, { useState } from "react";
import {
  FileText,
  Share2,
  CreditCard,
  ClipboardCheck,
  Users,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { usePdfModal } from "@/context/PdfModalContext";
import CountdownTimer from "./CountdownTimer";

export default function RegistrationFlowSection() {
  const { openModal } = usePdfModal();
  const [copied, setCopied] = useState(false);

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.bcaAccount.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const steps = [
    {
      step: 1,
      icon: FileText,
      title: "Baca Regulasi & Unduh Guidebook",
      description:
        "Pelajari syarat ketentuan, spesifikasi teknis alat, dan kriteria penilaian dari dokumen panduan resmi.",
      action: (
        <button
          type="button"
          onClick={() => openModal("utama")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gold-500/40 bg-gold-500/10 px-3 py-1.5 text-xs font-semibold text-gold-400 transition hover:bg-gold-500/20"
        >
          <span>Buka Guidebook Utama</span>
        </button>
      ),
    },
    {
      step: 2,
      icon: Share2,
      title: "Unggah Twibbon & Caption Resmi",
      description:
        "Unggah Twibbon resmi di Instagram pribadi masing-masing anggota tim, tandai akun @iarc.its serta 3 teman, lalu simpan tangkapan layarnya.",
      action: (
        <div className="flex flex-wrap gap-2">
          <a
            href={siteConfig.twibbonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-navy-700 bg-navy-800 px-3 py-1.5 text-xs font-semibold text-text-main transition hover:border-gold-500/50 hover:bg-navy-700"
          >
            <span>Unduh Twibbon</span>
            <ExternalLink className="h-3 w-3 text-gold-400" />
          </a>
          <a
            href={siteConfig.captionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-navy-700 bg-navy-800 px-3 py-1.5 text-xs font-semibold text-text-main transition hover:border-blue-400/50 hover:bg-navy-700"
          >
            <span>Salin Caption</span>
            <ExternalLink className="h-3 w-3 text-blue-400" />
          </a>
        </div>
      ),
    },
    {
      step: 3,
      icon: CreditCard,
      title: "Transfer Pembayaran ke Rekening BCA",
      description:
        "Lakukan pembayaran biaya pendaftaran tim sesuai nominal gelombang aktif melalui transfer bank resmi panitia.",
      action: (
        <div className="flex flex-col gap-2 rounded-xl border border-gold-500/30 bg-navy-950/80 p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-text-dim">
                {siteConfig.bcaAccount.bank}
              </p>
              <p className="font-mono text-sm sm:text-base font-bold text-gold-400">
                {siteConfig.bcaAccount.accountNumber}
              </p>
              <p className="text-[11px] text-text-soft">
                a.n. {siteConfig.bcaAccount.accountHolder}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyAccount}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold-500/40 bg-gold-500/10 px-3 py-1.5 text-xs font-semibold text-gold-400 transition hover:bg-gold-500/20"
              title="Salin nomor rekening"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Salin No. Rek</span>
                </>
              )}
            </button>
          </div>
        </div>
      ),
    },
    {
      step: 4,
      icon: ClipboardCheck,
      title: "Pengisian Formulir Pendaftaran Online",
      description:
        "Lengkapi identitas tim, unggah bukti pembayaran transfer, kartu tanda pelajar/mahasiswa, dan tangkapan layar unggahan twibbon.",
      action: (
        <a
          href="#kompetisi"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gold-500 px-3.5 py-1.5 text-xs font-bold text-navy-950 transition hover:bg-gold-400"
        >
          <span>Pilih Cabang Lomba</span>
        </a>
      ),
    },
    {
      step: 5,
      icon: Users,
      title: "Verifikasi Berkas & Masuk Grup Open Training",
      description:
        "Panitia akan memverifikasi berkas dalam 1x24 jam. Tim yang lolos akan mendapatkan konfirmasi email dan tautan grup WhatsApp Open Training IARC XII.",
      action: (
        <div className="text-[11px] text-gold-400 font-medium">
          Dapatkan materi bimbingan teknis langsung dari dosen &amp; praktisi ITS.
        </div>
      ),
    },
  ];

  return (
    <section id="alur" className="py-12 md:py-16 bg-navy-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 md:mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Panduan Registrasi
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-main sm:text-3xl md:text-4xl">
            Alur Pendaftaran Resmi 5 Langkah
          </h2>
          <p className="mt-2 mx-auto max-w-2xl text-xs sm:text-sm text-text-soft">
            Ikuti petunjuk langkah berikut untuk mendaftarkan tim dan mengamankan slot kompetisi Anda di IARC XII.
          </p>
          {/* Active Batch Countdown Timer */}
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-md rounded-2xl border border-navy-700/80 bg-navy-900/70 p-4 sm:p-5 backdrop-blur-md shadow-xl text-left">
              <CountdownTimer
                targetDate="2026-11-15T23:59:59+07:00"
                batchName="Gelombang 2 (Batch 2)"
              />
            </div>
          </div>
        </div>

        {/* 5-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative flex flex-col justify-between rounded-2xl border border-navy-800 bg-navy-900/70 p-5 sm:p-6 backdrop-blur-sm transition hover:border-gold-500/40 hover:bg-navy-900/90"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-gold-400 rounded-full bg-navy-800 px-2.5 py-1">
                      Langkah 0{item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-text-main mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed text-text-soft mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2">{item.action}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
