"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  ChevronDown,
  Clock,
  Layers,
  MapPin,
} from "lucide-react";
import { TrackVariant } from "@/data/smartRoboticsTracks";
import { ArenaTrack } from "@/data/arenaTracks";
import { useLanguage } from "@/context/LanguageContext";

interface TrackViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Tracks listed in the switcher; pass one division's tracks (see getArenaTracks)
  tracks: ArenaTrack[];
  initialTrackId?: string;
  initialVariantId?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

export default function TrackViewerModal({
  isOpen,
  onClose,
  tracks,
  initialTrackId,
  initialVariantId,
}: TrackViewerModalProps) {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState(
    initialTrackId ?? tracks[0]?.id
  );
  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >(initialVariantId);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileBanner, setShowMobileBanner] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync state when modal opens or initial props change
  useEffect(() => {
    if (isOpen) {
      if (initialTrackId) {
        setSelectedTrackId(initialTrackId);
      }
      setSelectedVariantId(initialVariantId);
      setIsLoading(true);
    }
  }, [isOpen, initialTrackId, initialVariantId]);

  const activeTrack: ArenaTrack = useMemo(() => {
    return tracks.find((t) => t.id === selectedTrackId) || tracks[0];
  }, [tracks, selectedTrackId]);

  const activeVariant: TrackVariant | undefined = useMemo(() => {
    if (!activeTrack.variants || activeTrack.variants.length === 0) {
      return undefined;
    }
    return (
      activeTrack.variants.find((v) => v.id === selectedVariantId) ||
      activeTrack.variants[0]
    );
  }, [activeTrack, selectedVariantId]);

  const currentFileUrl = useMemo(() => {
    if (activeTrack.status !== "available") return undefined;
    if (activeVariant) return activeVariant.fileUrl;
    return activeTrack.fileUrl;
  }, [activeTrack, activeVariant]);

  const currentFileName = useMemo(() => {
    if (activeTrack.status !== "available") return undefined;
    if (activeVariant) return activeVariant.fileName;
    return activeTrack.fileName;
  }, [activeTrack, activeVariant]);

  const currentTitle = useMemo(() => {
    if (activeVariant) {
      return language === "id" ? activeVariant.name : activeVariant.nameEn;
    }
    return language === "id" ? activeTrack.title : activeTrack.titleEn;
  }, [activeTrack, activeVariant, language]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!isOpen) {
      setIsFullscreen(false);
      setIsDropdownOpen(false);
      setShowMobileBanner(true);
      return;
    }

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.body.style.paddingRight = originalBodyPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Move focus into the dialog on open and give it back to the opener on close
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      cancelAnimationFrame(frame);
      opener?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  // Escape closes the dropdown first, then the dialog; Tab stays inside the dialog
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        } else {
          onClose();
        }
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const items = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        ).filter((el) => el.offsetParent !== null);
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isDropdownOpen, onClose]);

  // Reset loading state whenever document or variant changes
  useEffect(() => {
    setIsLoading(true);
  }, [selectedTrackId, selectedVariantId]);

  const statusLabel = (available: boolean) =>
    available
      ? language === "id"
        ? "Tersedia"
        : "Available"
      : language === "id"
      ? "Segera Rilis"
      : "Coming Soon";

  if (!mounted) return null;

  // Portaled to <body> so no ancestor stacking context can put the navbar or chat button above it
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={currentTitle}
          className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 md:p-6 overscroll-contain"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/90 touch-none overscroll-none"
          />

          {/* Modal Container */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", damping: 25, stiffness: 300 }
            }
            className={`relative flex flex-col w-full overflow-hidden rounded-md border border-rose-500/40 bg-navy-900 transition-all duration-300 motion-reduce:transition-none z-10 overscroll-contain ${
              isFullscreen
                ? "fixed inset-0 h-[100dvh] w-screen rounded-none border-none"
                : "max-w-5xl h-[90dvh] sm:h-[88vh]"
            }`}
          >
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-800 bg-navy-950/95 px-4 py-3 sm:px-6">
              {/* Document Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  aria-controls="track-modal-menu"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-navy-700 bg-navy-900 px-3.5 py-2 text-left text-sm font-semibold text-text-main transition hover:border-rose-500/50 hover:bg-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-rose-400 shrink-0" aria-hidden="true" />
                  <span className="max-w-[160px] truncate sm:max-w-[260px] md:max-w-[340px]">
                    {currentTitle}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-text-dim transition-transform duration-200 motion-reduce:transition-none ${
                      isDropdownOpen ? "rotate-180 text-rose-400" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <ul
                      id="track-modal-menu"
                      className="absolute left-0 top-full z-30 mt-1 max-h-72 w-72 sm:w-80 overflow-y-auto rounded-md border border-navy-700 bg-navy-950 p-1.5 shadow-xl shadow-navy-950/80"
                    >
                      {tracks.map((item) => {
                        const isAvailable = item.status === "available";
                        const isCurrent = item.id === selectedTrackId;
                        return (
                          <li key={item.id} className="mb-1 last:mb-0">
                            <button
                              type="button"
                              aria-current={isCurrent ? "true" : undefined}
                              onClick={() => {
                                setSelectedTrackId(item.id);
                                if (item.variants && item.variants.length > 0) {
                                  setSelectedVariantId(item.variants[0].id);
                                }
                                setIsDropdownOpen(false);
                              }}
                              className={`flex w-full min-h-[44px] items-start justify-between gap-2 rounded-md px-3 py-2 text-left text-xs transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
                                isCurrent
                                  ? "bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40"
                                  : "text-text-soft hover:bg-navy-900 hover:text-text-main"
                              }`}
                            >
                              <span>
                                <span className="font-semibold block">
                                  {language === "id" ? item.title : item.titleEn}
                                </span>
                                <span className="text-[11px] text-text-dim">
                                  {language === "id" ? "Jenjang" : "Level"}: {item.level}
                                </span>
                              </span>
                              <span
                                className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-bold ${
                                  isAvailable
                                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                    : "bg-navy-800 text-text-soft border border-navy-700"
                                }`}
                              >
                                {statusLabel(isAvailable)}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentFileUrl && (
                  <>
                    <a
                      href={currentFileUrl}
                      download={currentFileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-md border border-navy-700 bg-navy-900 px-3 py-2 text-xs font-semibold text-text-main transition hover:border-rose-500/50 hover:bg-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
                      aria-label={
                        language === "id"
                          ? "Unduh file PDF lintasan"
                          : "Download track PDF file"
                      }
                    >
                      <Download className="h-3.5 w-3.5 text-rose-400" aria-hidden="true" />
                      <span className="hidden sm:inline" aria-hidden="true">
                        {language === "id" ? "Unduh PDF" : "Download PDF"}
                      </span>
                    </a>

                    <a
                      href={currentFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-md border border-navy-700 bg-navy-900 px-3 py-2 text-xs font-semibold text-text-main transition hover:border-blue-400/50 hover:bg-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer"
                      aria-label={
                        language === "id"
                          ? "Buka dokumen di tab baru"
                          : "Open document in a new tab"
                      }
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                      <span className="hidden sm:inline" aria-hidden="true">
                        {language === "id" ? "Tab Baru" : "New Tab"}
                      </span>
                    </a>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-navy-700 bg-navy-900 p-2 text-text-soft transition hover:border-rose-500/50 hover:text-text-main focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
                  title={
                    isFullscreen
                      ? language === "id"
                        ? "Keluar Layar Penuh"
                        : "Exit Fullscreen"
                      : language === "id"
                      ? "Layar Penuh"
                      : "Fullscreen"
                  }
                  aria-label={
                    isFullscreen
                      ? language === "id"
                        ? "Keluar Layar Penuh"
                        : "Exit Fullscreen"
                      : language === "id"
                      ? "Layar Penuh"
                      : "Fullscreen"
                  }
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Maximize2 className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-navy-700 bg-navy-900 p-2 text-text-soft transition hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
                  title={language === "id" ? "Tutup (Esc)" : "Close (Esc)"}
                  aria-label={language === "id" ? "Tutup" : "Close"}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Mahasiswa variant selector */}
            {activeTrack.variants && activeTrack.variants.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-800 bg-navy-950/80 px-4 py-2 text-xs">
                <div className="flex items-center gap-1.5 text-text-dim">
                  <Layers className="h-3.5 w-3.5 text-rose-400" aria-hidden="true" />
                  <span>
                    {language === "id" ? "Pilih Varian Lintasan:" : "Select Track Variant:"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeTrack.variants.map((v) => {
                    const isSelected = v.id === selectedVariantId;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
                          isSelected
                            ? "bg-rose-600 text-white shadow-sm"
                            : "bg-navy-900 text-text-soft border border-navy-700 hover:border-rose-500/40 hover:text-text-main"
                        }`}
                      >
                        <span>{language === "id" ? v.name : v.nameEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Phone browsers rarely render PDFs inside an iframe, so offer the file directly */}
            {activeTrack.status === "available" && currentFileUrl && (
              <>
                {showMobileBanner ? (
                  <div className="sm:hidden border-b border-rose-500/20 bg-navy-900 p-3">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <p className="pt-2.5 text-xs font-semibold text-rose-400">
                        {language === "id"
                          ? "Pratinjau kosong di HP?"
                          : "Blank preview on your phone?"}
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowMobileBanner(false)}
                        className="inline-flex min-h-[44px] min-w-[44px] -mr-2 -mt-1 items-center justify-center text-text-dim hover:text-text-main transition rounded-md hover:bg-navy-800 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                        aria-label={
                          language === "id" ? "Tutup pemberitahuan" : "Dismiss notice"
                        }
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-[11px] text-text-soft leading-snug mb-2.5">
                      {language === "id"
                        ? "Banyak browser HP tidak menampilkan PDF di dalam halaman. Buka di tab baru atau unduh untuk melihat denah resolusi penuh."
                        : "Many phone browsers do not show PDFs inside a page. Open it in a new tab or download it for the full-resolution layout."}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={currentFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-3 py-2 text-xs font-bold text-white transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                      >
                        <span>{language === "id" ? "Buka di Tab Baru" : "Open in New Tab"}</span>
                      </a>
                      <a
                        href={currentFileUrl}
                        download={currentFileName}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-rose-500/40 bg-rose-500/15 hover:bg-rose-500/25 active:bg-rose-500/30 px-3 py-2 text-xs font-bold text-rose-300 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                      >
                        <span>{language === "id" ? "Unduh PDF" : "Download PDF"}</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="sm:hidden flex items-center justify-between gap-2 border-b border-navy-800 bg-navy-950 px-3 text-[11px]">
                    <span className="text-text-dim">
                      {language === "id" ? "Pratinjau kosong?" : "Blank preview?"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowMobileBanner(true)}
                      className="min-h-[44px] font-semibold text-rose-400 hover:underline cursor-pointer focus:outline-none focus-visible:underline"
                    >
                      {language === "id"
                        ? "Tampilkan opsi buka & unduh"
                        : "Show open & download options"}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Viewer Content Area */}
            <div className="relative flex-1 min-h-0 w-full overflow-hidden bg-navy-950">
              {activeTrack.status === "available" && currentFileUrl ? (
                <>
                  {isLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-navy-950">
                      <div className="h-10 w-10 animate-spin motion-reduce:animate-none rounded-full border-2 border-navy-700 border-t-rose-500" />
                      <p className="text-xs text-text-dim">
                        {language === "id"
                          ? "Memuat PDF lintasan..."
                          : "Loading track PDF..."}
                      </p>
                    </div>
                  )}

                  <iframe
                    key={currentFileUrl}
                    src={currentFileUrl}
                    title={currentTitle}
                    className="absolute inset-0 h-full w-full border-none"
                    onLoad={() => setIsLoading(false)}
                  />
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto p-6 text-center">
                  <div className="rounded-full bg-navy-900 border border-navy-700 p-4 mb-4">
                    <Clock className="h-8 w-8 text-rose-400" aria-hidden="true" />
                  </div>
                  <span className="rounded bg-navy-800 px-2.5 py-1 text-xs font-bold text-rose-300 border border-rose-500/30 mb-2">
                    {language === "id" ? "Status: Segera Dirilis" : "Status: Coming Soon"}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-text-main max-w-md">
                    {currentTitle}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-text-soft max-w-md leading-relaxed">
                    {language === "id"
                      ? activeTrack.placeholderNotice
                      : activeTrack.placeholderNoticeEn}
                  </p>
                  <div className="mt-6 rounded-md bg-navy-900/80 border border-navy-800 p-4 max-w-md text-left text-xs text-text-dim">
                    <p className="font-semibold text-text-soft mb-1">
                      {language === "id" ? "Sambil menunggu denah:" : "While you wait:"}
                    </p>
                    <p>
                      {language === "id"
                        ? "Batas dimensi robot, jumlah sensor, dan cara penilaian sudah tercantum di Guidebook resmi jenjang ini."
                        : "Robot size limits, sensor count, and scoring for this level are already in the official Guidebook."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
