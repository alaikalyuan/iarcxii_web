"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ExternalLink, BookOpen } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { usePdfModal } from "@/context/PdfModalContext";

export default function Footer() {
  const { openModal } = usePdfModal();

  return (
    <footer className="border-t border-navy-800 bg-navy-950 pt-12 pb-8 text-text-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 pb-10 border-b border-navy-800/80">
          {/* Col 1: Brand & Organizer */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-full.png"
                alt="IARC XII Logo"
                width={170}
                height={50}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-xs leading-relaxed text-text-dim">
              Industrial Automation &amp; Robotics Competition XII. Diselenggarakan oleh Departemen Teknik Elektro Otomasi, Fakultas Vokasi, Institut Teknologi Sepuluh Nopember (ITS) Surabaya.
            </p>
            <p className="text-xs font-semibold text-gold-400">
              &ldquo;{siteConfig.theme}&rdquo;
            </p>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main mb-3">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/#tentang" className="hover:text-gold-400 transition">
                  Tentang &amp; Filosofi Acara
                </a>
              </li>
              <li>
                <a href="/#kompetisi" className="hover:text-gold-400 transition">
                  Cabang &amp; Kategori Lomba
                </a>
              </li>
              <li>
                <a href="/#alur" className="hover:text-gold-400 transition">
                  Panduan Alur Pendaftaran
                </a>
              </li>
              <li>
                <a href="/#timeline" className="hover:text-gold-400 transition">
                  Linimasa Kegiatan
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-gold-400 transition">
                  Pusat Bantuan FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Dokumen & Berkas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main mb-3">
              Akses Dokumen Resmi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => openModal("utama")}
                  className="inline-flex items-center gap-1.5 text-gold-400 hover:underline"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Guidebook Utama (PDF Viewer)</span>
                </button>
              </li>
              <li>
                <a
                  href={siteConfig.twibbonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-gold-400 transition"
                >
                  <span>Unduh Twibbon Resmi</span>
                  <ExternalLink className="h-3 w-3 text-text-dim" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.captionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-gold-400 transition"
                >
                  <span>Salin Caption Instagram</span>
                  <ExternalLink className="h-3 w-3 text-text-dim" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak & Media Sosial */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main mb-3">
              Hubungi Panitia
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-gold-400 transition"
              >
                <Mail className="h-3.5 w-3.5 text-gold-400" />
                <span>{siteConfig.email}</span>
              </a>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-navy-800 bg-navy-900 text-text-soft transition hover:border-gold-500/50 hover:text-gold-400"
                  aria-label="Instagram IARC ITS"
                >
                  <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-navy-800 bg-navy-900 text-text-soft transition hover:border-blue-400/50 hover:text-blue-400"
                  aria-label="LinkedIn IARC ITS"
                >
                  <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-text-dim">
          <p>
            &copy; 2026 IARC XII. Departemen Teknik Elektro Otomasi, FV ITS Surabaya.
          </p>
          <p>
            Dirancang untuk kompetisi robotika dan otomasi bereputasi nasional dan internasional.
          </p>
        </div>
      </div>
    </footer>
  );
}
