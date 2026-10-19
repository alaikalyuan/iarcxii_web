"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MediaItem {
  src: string;
  alt: string;
  caption: string;
}

const MEDIA_ITEMS: MediaItem[] = [
  {
    src: "/images/dokumentasi-1.jpg",
    alt: "Dokumentasi IARC Race Robotika",
    caption: "Atmosfer arena perlombaan robotika di hall Departemen Teknik Elektro Otomasi ITS",
  },
  {
    src: "/images/dokumentasi-2.jpg",
    alt: "Dokumentasi Pengujian Robot",
    caption: "Peserta melakukan kalibrasi dan uji lintasan robot line follower otonom",
  },
  {
    src: "/images/dokumentasi-3.jpg",
    alt: "Dokumentasi Expo & Presentasi",
    caption: "Presentasi purwarupa IoT di hadapan dewan juri akademisi dan industri",
  },
  {
    src: "/images/dokumentasi-4.jpg",
    alt: "Dokumentasi Penganugerahan Juara",
    caption: "Penyerahan trophy dan penghargaan resmi kepada tim juara IARC",
  },
];

export default function MediaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MEDIA_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MEDIA_ITEMS.length);
  };

  const activeMedia = MEDIA_ITEMS[currentIndex];

  return (
    <div className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-navy-700/80 bg-navy-900/80">
      {/* Image Display */}
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-navy-950">
        <Image
          src={activeMedia.src}
          alt={activeMedia.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/20" />

        {/* Navigation Buttons */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
          <button
            type="button"
            onClick={handlePrev}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-navy-950/70 text-text-main backdrop-blur-sm transition hover:bg-gold-500 hover:text-navy-950 focus:outline-none"
            aria-label="Dokumentasi sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-navy-950/70 text-text-main backdrop-blur-sm transition hover:bg-gold-500 hover:text-navy-950 focus:outline-none"
            aria-label="Dokumentasi selanjutnya"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {MEDIA_ITEMS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex ? "w-5 bg-gold-400" : "w-1.5 bg-white/40"
              }`}
              aria-label={`Lihat dokumentasi ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Caption Bar */}
      <div className="p-3 sm:p-4 text-left">
        <div className="flex items-center justify-between text-[11px] font-semibold text-gold-400 uppercase tracking-wider mb-1">
          <span>Dokumentasi Resmi IARC</span>
          <span>{currentIndex + 1} / {MEDIA_ITEMS.length}</span>
        </div>
        <p className="text-xs text-text-soft line-clamp-2">
          {activeMedia.caption}
        </p>
      </div>
    </div>
  );
}
