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
    caption: "Atmosfer arena perlombaan robotika di hall DTEO ITS",
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
    <div className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-navy-800 bg-navy-900">
      {/* Image Display */}
      <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-navy-950">
        <Image
          src={activeMedia.src}
          alt={activeMedia.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-black/20" />

        {/* Navigation Buttons (Tappable min 44x44px per R-03 and antislop-layoutmobile) */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
          <button
            type="button"
            onClick={handlePrev}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-navy-950/80 text-text-main shadow-md transition hover:bg-gold-500 hover:text-navy-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            aria-label="Dokumentasi sebelumnya"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-navy-950/80 text-text-main shadow-md transition hover:bg-gold-500 hover:text-navy-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            aria-label="Dokumentasi selanjutnya"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots Indicator with accessible touch targets */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
          {MEDIA_ITEMS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className="flex h-11 w-7 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-full"
              aria-label={`Lihat dokumentasi ${idx + 1}`}
            >
              <span
                className={`h-1.5 rounded-full transition-all block ${
                  idx === currentIndex ? "w-5 bg-gold-400" : "w-1.5 bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Caption Bar */}
      <div className="p-4 sm:p-5 text-left flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5">
          <span>Dokumentasi Resmi IARC</span>
          <span className="text-text-soft font-mono">{currentIndex + 1} / {MEDIA_ITEMS.length}</span>
        </div>
        <p className="text-xs sm:text-sm text-text-soft leading-relaxed">
          {activeMedia.caption}
        </p>
      </div>
    </div>
  );
}
