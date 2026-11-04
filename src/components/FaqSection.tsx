"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { getFaqs } from "@/data/faq";
import DecorativeBackground from "./DecorativeBackground";
import { useLanguage } from "@/context/LanguageContext";

export default function FaqSection() {
  const { language, t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs = useMemo(() => getFaqs(language), [language]);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-navy-950 py-14 md:py-20">
      <DecorativeBackground variant="section-e" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-text-main md:text-4xl">{t.faq.sectionTitle}</h2>

        <div className="mt-8 space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `${faq.id}-panel`;
            return (
              <div
                key={faq.id}
                className={`rounded-md border bg-navy-900 ${isOpen ? "border-gold-500/40" : "border-navy-800"}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex min-h-[44px] w-full items-center justify-between gap-4 rounded-md px-4 py-4 text-left sm:px-5 transition-colors hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <span
                    className={`text-sm font-semibold sm:text-base ${
                      isOpen ? "text-gold-400" : "text-text-main"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-text-dim transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-gold-400" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div id={panelId} className="px-4 pb-5 pr-10 sm:px-5">
                    <p className="text-sm leading-relaxed text-text-soft">{faq.answer}</p>
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
