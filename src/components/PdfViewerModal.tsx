"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  FileText,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { usePdfModal } from "@/context/PdfModalContext";
import { GUIDEBOOKS, getGuidebookById } from "@/data/guidebooks";

export default function PdfViewerModal() {
  const { isOpen, activeDocId, closeModal, setActiveDoc } = usePdfModal();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const activeDoc = useMemo(() => {
    return getGuidebookById(activeDocId) || GUIDEBOOKS[0];
  }, [activeDocId]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        } else {
          closeModal();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      setIsFullscreen(false);
      setIsDropdownOpen(false);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isDropdownOpen, closeModal]);

  // Reset loading state on doc change
  useEffect(() => {
    setIsLoading(true);
  }, [activeDocId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeDoc.title}
          className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 md:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative flex flex-col w-full overflow-hidden rounded-2xl border border-gold-500/30 bg-navy-900 shadow-2xl transition-all duration-300 z-10 ${
              isFullscreen
                ? "fixed inset-0 h-screen w-screen rounded-none border-none"
                : "max-w-5xl h-[88vh]"
            }`}
          >
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-800 bg-navy-950/90 px-4 py-3 sm:px-6">
              {/* Document Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="listbox"
                  className="inline-flex items-center gap-2 rounded-xl border border-navy-700 bg-navy-900 px-3.5 py-2 text-left text-sm font-semibold text-text-main transition hover:border-gold-500/50 hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                >
                  <FileText className="h-4 w-4 text-gold-400 shrink-0" />
                  <span className="max-w-[180px] truncate sm:max-w-[280px] md:max-w-[360px]">
                    {activeDoc.title}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-text-dim transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div
                      role="listbox"
                      className="absolute left-0 mt-2 z-30 max-h-72 w-80 max-w-[calc(100vw-2rem)] sm:w-96 overflow-y-auto rounded-xl border border-gold-500/30 bg-navy-950 p-2 shadow-2xl"
                    >
                      <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-text-dim border-b border-navy-800 mb-1">
                        Pilih Dokumen Guidebook (16 Dokumen)
                      </div>
                      {GUIDEBOOKS.map((doc) => {
                        const isSelected = doc.id === activeDoc.id;
                        return (
                          <button
                            key={doc.id}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setActiveDoc(doc.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left text-xs transition ${
                              isSelected
                                ? "bg-gold-500/15 text-gold-400 font-semibold"
                                : "text-text-soft hover:bg-navy-800 hover:text-text-main"
                            }`}
                          >
                            <span
                              className={`mt-0.5 inline-block h-2 w-2 rounded-full shrink-0 ${
                                isSelected ? "bg-gold-400" : "bg-navy-700"
                              }`}
                            />
                            <div className="flex-1 truncate">
                              <p className="truncate font-medium">{doc.title}</p>
                              <p className="text-[10px] text-text-dim">
                                {doc.division} • {doc.level}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Download Langsung */}
                <a
                  href={activeDoc.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-1.5 rounded-lg border border-navy-700 bg-navy-900 px-3 py-1.5 text-xs font-semibold text-text-main transition hover:border-gold-500/50 hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  title="Unduh file PDF langsung"
                >
                  <Download className="h-3.5 w-3.5 text-gold-400" />
                  <span className="hidden sm:inline">Unduh PDF</span>
                </a>

                {/* Buka di Tab Baru */}
                <a
                  href={activeDoc.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-navy-700 bg-navy-900 px-3 py-1.5 text-xs font-semibold text-text-main transition hover:border-blue-400/50 hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  title="Buka dokumen di tab baru Google Drive"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Tab Baru</span>
                </a>

                {/* Fullscreen Toggle */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="inline-flex items-center justify-center rounded-lg border border-navy-700 bg-navy-900 p-1.5 text-text-soft transition hover:border-gold-500/50 hover:text-text-main focus:outline-none focus:ring-2 focus:ring-gold-500"
                  title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
                  aria-label={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center justify-center rounded-lg border border-navy-700 bg-navy-900 p-1.5 text-text-soft transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                  title="Tutup Viewer (Esc)"
                  aria-label="Tutup Viewer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Document Metadata Bar */}
            <div className="flex items-center justify-between bg-navy-950/60 px-4 py-1.5 text-[11px] text-text-dim border-b border-navy-800/80">
              <div className="flex items-center gap-2 truncate">
                <span className="rounded bg-navy-800 px-1.5 py-0.5 font-semibold text-gold-400">
                  {activeDoc.division}
                </span>
                <span className="truncate">{activeDoc.track}</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline font-medium text-text-soft">
                  Jenjang: {activeDoc.level}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-text-dim">
                <Sparkles className="h-3 w-3 text-gold-400" />
                <span>Google Drive Cloud Preview</span>
              </div>
            </div>

            {/* PDF Embedded Iframe */}
            <div className="relative flex-1 bg-navy-950">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy-950">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-navy-700 border-t-gold-400" />
                  <p className="text-xs text-text-dim">
                    Memuat dokumen Google Drive...
                  </p>
                </div>
              )}

              <iframe
                key={activeDoc.driveFileId}
                src={activeDoc.previewUrl}
                title={activeDoc.title}
                className="h-full w-full border-none"
                allow="autoplay"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
