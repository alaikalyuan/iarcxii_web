"use client";

import React, { useRef, useState } from "react";
import {
  FileText,
  Download,
  ExternalLink,
  Maximize2,
  Clock,
  Layers,
  MapPin,
} from "lucide-react";
import {
  SMART_ROBOTICS_TRACKS,
  SmartRoboticsTrack,
  TrackVariant,
} from "@/data/smartRoboticsTracks";
import { useLanguage } from "@/context/LanguageContext";

interface SmartRoboticsTrackSectionProps {
  onOpenGuidebookModal?: (docId: string) => void;
  onOpenTrackModal: (trackId: string, variantId?: string) => void;
}

const PANEL_ID = "track-panel";

export default function SmartRoboticsTrackSection({
  onOpenGuidebookModal,
  onOpenTrackModal,
}: SmartRoboticsTrackSectionProps) {
  const { language } = useLanguage();
  const [activeLevelId, setActiveLevelId] = useState("track-sd");
  const [activeVariantId, setActiveVariantId] = useState("mahasiswa-offline");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeTrack: SmartRoboticsTrack =
    SMART_ROBOTICS_TRACKS.find((t) => t.id === activeLevelId) ||
    SMART_ROBOTICS_TRACKS[0];

  const activeVariant: TrackVariant | undefined =
    activeTrack.variants?.find((v) => v.id === activeVariantId) ||
    activeTrack.variants?.[0];

  const isAvailable = activeTrack.status === "available";
  const currentFileUrl = isAvailable
    ? activeVariant?.fileUrl ?? activeTrack.fileUrl
    : undefined;
  const currentFileName = isAvailable
    ? activeVariant?.fileName ?? activeTrack.fileName
    : undefined;

  const currentTitle = activeVariant
    ? language === "id"
      ? activeVariant.name
      : activeVariant.nameEn
    : language === "id"
    ? activeTrack.title
    : activeTrack.titleEn;

  const currentDesc = activeVariant
    ? language === "id"
      ? activeVariant.description
      : activeVariant.descriptionEn
    : language === "id"
    ? activeTrack.description
    : activeTrack.descriptionEn;

  const selectTrack = (index: number, moveFocus = false) => {
    const track = SMART_ROBOTICS_TRACKS[index];
    setActiveLevelId(track.id);
    setIframeLoaded(false);
    if (track.variants && track.variants.length > 0) {
      setActiveVariantId(track.variants[0].id);
    }
    if (moveFocus) tabRefs.current[index]?.focus();
  };

  // Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern)
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = SMART_ROBOTICS_TRACKS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      selectTrack(next, true);
    }
  };

  const focusRing =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950";

  return (
    <section
      id="lintasan-resmi"
      aria-labelledby="track-heading"
      className="mt-10 scroll-mt-24 rounded-lg border border-rose-500/30 bg-navy-900/80 p-5 sm:p-7 md:p-8"
    >
      {/* Section Header */}
      <div className="border-b border-navy-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-400 mb-1.5">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>
            {language === "id" ? "Lintasan Resmi Perlombaan" : "Official Competition Arena"}
          </span>
        </div>
        <h3
          id="track-heading"
          className="text-lg sm:text-xl md:text-2xl font-extrabold text-text-main"
        >
          {language === "id"
            ? "Denah Lintasan Arena Smart Robotics"
            : "Smart Robotics Arena Track Layouts"}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-text-soft max-w-2xl leading-relaxed">
          {language === "id"
            ? "Garis navigasi, persimpangan, dan zona misi untuk tiap jenjang. Pakai denah ini untuk menyusun lintasan latihan tim."
            : "Guide lines, intersections, and mission zones for each level. Use these layouts to build your team's practice track."}
        </p>
      </div>

      {/* Level Tabs */}
      <div
        role="tablist"
        aria-label={language === "id" ? "Jenjang lintasan" : "Track levels"}
        className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5"
      >
        {SMART_ROBOTICS_TRACKS.map((track, index) => {
          const isActive = track.id === activeLevelId;
          const trackAvailable = track.status === "available";
          return (
            <button
              key={track.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              type="button"
              id={`tab-${track.id}`}
              aria-selected={isActive}
              aria-controls={PANEL_ID}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTrack(index)}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
              className={`flex min-h-[56px] flex-col items-start justify-center gap-1 rounded-md p-3 text-left transition cursor-pointer border ${focusRing} ${
                isActive
                  ? "border-rose-500 bg-rose-500/15 text-rose-300"
                  : "border-navy-800 bg-navy-950/70 text-text-soft hover:border-navy-700 hover:bg-navy-950 hover:text-text-main"
              }`}
            >
              <span className="text-sm font-bold">{track.level}</span>
              <span
                className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                  trackAvailable
                    ? isActive
                      ? "bg-rose-500/30 text-rose-100"
                      : "bg-navy-800 text-text-soft"
                    : "border border-navy-700 text-text-soft"
                }`}
              >
                {trackAvailable
                  ? language === "id"
                    ? "Tersedia"
                    : "Available"
                  : language === "id"
                  ? "Segera Rilis"
                  : "Coming Soon"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Panel */}
      <div
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`tab-${activeTrack.id}`}
        className="mt-6"
      >
        {isAvailable && currentFileUrl ? (
          <div className="space-y-4">
            {/* Title, description and Mahasiswa variant selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-md bg-navy-950/80 border border-navy-800 p-3.5 sm:p-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-text-main text-sm sm:text-base">
                    {currentTitle}
                  </span>
                  <span className="whitespace-nowrap rounded bg-rose-500/20 px-2 py-0.5 text-[11px] font-semibold text-rose-200 border border-rose-500/30">
                    {language === "id" ? "PDF, 1 halaman" : "PDF, 1 page"}
                  </span>
                </div>
                <p className="text-xs text-text-soft leading-relaxed max-w-2xl">
                  {currentDesc}
                </p>
              </div>

              {activeTrack.variants && activeTrack.variants.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-navy-800">
                  <span className="text-[11px] text-text-dim sm:hidden w-full">
                    {language === "id" ? "Pilih varian:" : "Select variant:"}
                  </span>
                  {activeTrack.variants.map((v) => {
                    const isSelected = v.id === activeVariantId;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          setActiveVariantId(v.id);
                          setIframeLoaded(false);
                        }}
                        className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${focusRing} ${
                          isSelected
                            ? "bg-rose-600 text-white"
                            : "bg-navy-900 text-text-soft border border-navy-700 hover:border-rose-500/40 hover:text-text-main"
                        }`}
                      >
                        <Layers className="h-3 w-3" aria-hidden="true" />
                        <span>{language === "id" ? v.name : v.nameEn}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Preview */}
            <div className="overflow-hidden rounded-md border border-navy-800 bg-navy-950">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-800 bg-navy-900/90 px-3.5 py-2.5 text-xs">
                <div className="flex min-w-0 items-center gap-2 text-[11px]">
                  <FileText className="h-3.5 w-3.5 shrink-0 text-rose-400" aria-hidden="true" />
                  <span className="font-mono text-text-soft truncate">{currentFileName}</span>
                </div>

                <div className="flex w-full sm:w-auto items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenTrackModal(activeTrack.id, activeVariant?.id)}
                    className={`hidden sm:inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-navy-700 bg-navy-900 px-3 py-1.5 text-xs font-semibold text-text-soft hover:border-rose-500/50 hover:text-text-main transition cursor-pointer ${focusRing}`}
                  >
                    <Maximize2 className="h-3.5 w-3.5 text-rose-400" aria-hidden="true" />
                    <span>{language === "id" ? "Layar Penuh" : "Fullscreen"}</span>
                  </button>

                  <a
                    href={currentFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex flex-1 sm:flex-none min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-navy-700 bg-navy-900 px-3 py-1.5 text-xs font-semibold text-text-soft hover:border-blue-400/50 hover:text-text-main transition cursor-pointer ${focusRing}`}
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                    <span>{language === "id" ? "Tab Baru" : "New Tab"}</span>
                  </a>

                  <a
                    href={currentFileUrl}
                    download={currentFileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex flex-1 sm:flex-none min-h-[44px] items-center justify-center gap-1.5 rounded-md bg-rose-600 hover:bg-rose-500 active:bg-rose-700 px-3 py-1.5 text-xs font-bold text-white transition cursor-pointer ${focusRing}`}
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{language === "id" ? "Unduh PDF" : "Download PDF"}</span>
                  </a>
                </div>
              </div>

              {/* Phone browsers rarely render PDFs inside an iframe, so phones get direct actions instead of a blank frame */}
              <div className="sm:hidden p-4 text-xs text-text-soft leading-relaxed">
                {language === "id"
                  ? "Browser HP umumnya tidak menampilkan PDF di dalam halaman. Pakai tombol Tab Baru atau Unduh PDF di atas untuk melihat denah resolusi penuh."
                  : "Phone browsers usually do not show PDFs inside a page. Use New Tab or Download PDF above to see the full-resolution layout."}
              </div>

              <div className="relative hidden sm:block w-full sm:h-[540px] md:h-[620px] bg-navy-950">
                {!iframeLoaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-navy-950">
                    <div className="h-9 w-9 animate-spin motion-reduce:animate-none rounded-full border-2 border-navy-700 border-t-rose-500" />
                    <p className="text-xs text-text-dim">
                      {language === "id" ? "Memuat denah lintasan..." : "Loading track layout..."}
                    </p>
                  </div>
                )}
                <iframe
                  key={currentFileUrl}
                  src={currentFileUrl}
                  title={currentTitle}
                  className="h-full w-full border-none"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md border border-navy-800 bg-navy-950/70 p-6 sm:p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 border border-navy-700 mb-4">
              <Clock className="h-7 w-7 text-rose-400" aria-hidden="true" />
            </div>

            <p className="inline-block rounded bg-navy-900 px-3 py-1 text-xs font-semibold text-rose-300 border border-rose-500/30 mb-3">
              {language === "id" ? "Status: Segera Dirilis" : "Status: Coming Soon"}
            </p>

            <h4 className="text-base sm:text-lg font-bold text-text-main max-w-lg mx-auto">
              {currentTitle}
            </h4>

            <p className="mt-2 text-xs sm:text-sm text-text-soft max-w-xl mx-auto leading-relaxed">
              {language === "id" ? activeTrack.placeholderNotice : activeTrack.placeholderNoticeEn}
            </p>

            <p className="mt-4 text-xs text-text-dim max-w-xl mx-auto leading-relaxed">
              {language === "id"
                ? "Sambil menunggu, batas dimensi robot, jumlah sensor, dan cara penilaian sudah tercantum di Guidebook jenjang ini."
                : "Meanwhile, robot size limits, sensor count, and scoring for this level are already in its Guidebook."}
            </p>

            {onOpenGuidebookModal && (
              <button
                type="button"
                onClick={() => onOpenGuidebookModal(activeTrack.guidebookDocId)}
                className={`mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-md border border-gold-500/40 bg-navy-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gold-400 transition hover:bg-gold-500/10 hover:border-gold-400 cursor-pointer ${focusRing}`}
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>
                  {language === "id"
                    ? `Lihat Guidebook ${activeTrack.level}`
                    : `View ${activeTrack.level} Guidebook`}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
