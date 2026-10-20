"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "@/data/faq";
import DecorativeBackground from "./DecorativeBackground";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-12 md:py-16 bg-navy-950 relative overflow-hidden">
      <DecorativeBackground variant="section-e" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 md:mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Pusat Informasi &amp; Jawaban
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-main sm:text-3xl md:text-4xl">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="mt-2 mx-auto max-w-2xl text-xs sm:text-sm text-text-soft">
            Temukan jawaban lengkap seputar teknis kompetisi, akomodasi, pembayaran, perangkat lunak, dan fasilitas kepesertaan IARC XII.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border transition-all ${
                  isOpen
                    ? "border-gold-500/40 bg-navy-900/90 shadow-md shadow-gold-500/5"
                    : "border-navy-800 bg-navy-900/60 hover:border-navy-700"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="flex min-h-[44px] w-full items-center justify-between gap-4 rounded-2xl p-4 sm:p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                        isOpen
                          ? "bg-gold-500/20 text-gold-400"
                          : "bg-navy-800 text-text-dim"
                      }`}
                    >
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-text-main">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-text-dim transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-gold-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                    <div className="border-t border-navy-800/80 pt-3">
                      <p className="text-xs sm:text-sm leading-relaxed text-text-soft">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
