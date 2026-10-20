"use client";

import React, { useState } from "react";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { TIMELINE_TRACKS } from "@/data/timeline";
import DecorativeBackground from "./DecorativeBackground";

export default function TimelineSection() {
  const [activeTrackId, setActiveTrackId] = useState("track-a");

  const currentTrack =
    TIMELINE_TRACKS.find((t) => t.id === activeTrackId) || TIMELINE_TRACKS[0];

  return (
    <section id="timeline" className="py-12 md:py-16 bg-navy-950/70 relative overflow-hidden">
      <DecorativeBackground variant="section-d" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 md:mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Jadwal &amp; Rangkaian Acara
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-main sm:text-3xl md:text-4xl">
            Linimasa Resmi Perlombaan IARC XII
          </h2>
          <p className="mt-2 mx-auto max-w-2xl text-xs sm:text-sm text-text-soft">
            Rangkaian jadwal terbagi menjadi dua trek kompetisi untuk mengakomodasi mekanisme penyisihan daring dan pameran luring di kampus ITS Surabaya.
          </p>

          {/* Track Switcher Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {TIMELINE_TRACKS.map((track) => {
              const isActive = track.id === activeTrackId;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setActiveTrackId(track.id)}
                  className={`min-h-[44px] rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                    isActive
                      ? "bg-gold-500 text-navy-950 shadow-md font-bold"
                      : "border border-navy-700 bg-navy-900 text-text-soft hover:border-gold-500/40 hover:text-text-main"
                  }`}
                >
                  {track.name}
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-[11px] text-text-dim">
            Mencakup cabang: {currentTrack.targetDivisions}
          </p>
        </div>

        {/* Timeline Milestones Cards */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Connecting SVG Line with cyber drawing motion */}
          <div className="absolute left-4 top-4 bottom-4 w-1 -translate-x-1/2 sm:left-1/2 pointer-events-none">
            <svg
              className="h-full w-full overflow-hidden"
              viewBox="0 0 4 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="100"
                stroke="rgba(30, 41, 59, 0.6)"
                strokeWidth="2"
              />
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="100"
                stroke="url(#timeline-gradient)"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-[dash_20s_linear_infinite]"
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#e8c07d" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#d9a94f" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-6">
            {currentTrack.milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isCompleted = item.status === "completed";
              const isActive = item.status === "active";

              return (
                <div
                  key={`${activeTrackId}-${idx}`}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Marker Node - Fixed syntax with template literal and pulse glow */}
                  <div
                    className={`absolute left-4 -translate-x-1/2 sm:left-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-navy-950 z-10 transition-transform duration-300 hover:scale-125 shadow-lg ${
                      isActive
                        ? "border-gold-400 text-gold-400 ring-4 ring-gold-500/20 shadow-gold-500/40"
                        : isCompleted
                        ? "border-emerald-400 text-emerald-400 ring-2 ring-emerald-500/20"
                        : "border-navy-700 text-text-dim"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : isActive ? (
                      <Clock className="h-4 w-4 animate-pulse text-gold-400" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-navy-600" />
                    )}
                  </div>

                  {/* Content Card with cyber border & hover glow */}
                  <div
                    className={`w-full pl-11 sm:w-[calc(50%-2rem)] ${
                      isEven
                        ? "sm:pl-0 sm:pr-6 sm:text-right"
                        : "sm:pl-6 sm:pr-0 sm:text-left"
                    }`}
                  >
                    <div
                      className={`rounded-2xl border p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${
                        isActive
                          ? "border-gold-500/60 bg-navy-900/90 shadow-xl shadow-gold-500/10 ring-1 ring-gold-500/20"
                          : "border-navy-800 bg-navy-900/60 hover:border-gold-500/30 hover:bg-navy-900/80"
                      }`}
                    >
                      <div
                        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider mb-2 ${
                          isActive
                            ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                            : isCompleted
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                            : "bg-navy-800 text-text-dim border border-navy-700"
                        }`}
                      >
                        <Calendar className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-text-main">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs sm:text-sm text-text-soft leading-relaxed">
                        {item.description}
                      </p>
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
