"use client";

import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "header" | "footer" | "mobile";
  className?: string;
}

export default function LanguageSwitcher({
  variant = "header",
  className = "",
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-900 border border-navy-800 text-gold-400">
          <Globe className="h-3.5 w-3.5" aria-hidden="true" />
        </div>
        <div className="inline-flex rounded-xl border border-navy-800 bg-navy-900 p-0.5">
          <button
            type="button"
            onClick={() => setLanguage("id")}
            aria-pressed={language === "id"}
            className={`min-h-[36px] min-w-[44px] rounded-lg px-2.5 py-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
              language === "id"
                ? "bg-gold-500 text-navy-950 shadow-sm"
                : "text-text-soft hover:text-text-main"
            }`}
          >
            ID
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
            className={`min-h-[36px] min-w-[44px] rounded-lg px-2.5 py-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
              language === "en"
                ? "bg-gold-500 text-navy-950 shadow-sm"
                : "text-text-soft hover:text-text-main"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className={`flex w-full items-center justify-between rounded-xl border border-navy-800 bg-navy-900/80 p-2 ${className}`}>
        <div className="flex items-center gap-2 pl-2">
          <Globe className="h-4 w-4 text-gold-400" aria-hidden="true" />
          <span className="text-xs font-semibold text-text-soft">
            {language === "id" ? "Bahasa Situs" : "Site Language"}
          </span>
        </div>
        <div className="inline-flex rounded-lg border border-navy-800 bg-navy-950 p-1">
          <button
            type="button"
            onClick={() => setLanguage("id")}
            aria-pressed={language === "id"}
            className={`min-h-[44px] min-w-[48px] rounded-md px-3 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
              language === "id"
                ? "bg-gold-500 text-navy-950 shadow-sm"
                : "text-text-soft hover:text-text-main"
            }`}
          >
            ID
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
            className={`min-h-[44px] min-w-[48px] rounded-md px-3 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
              language === "en"
                ? "bg-gold-500 text-navy-950 shadow-sm"
                : "text-text-soft hover:text-text-main"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  // Default: Header desktop variant
  return (
    <div
      className={`inline-flex min-h-[44px] items-center rounded-xl border border-navy-800 bg-navy-900/90 p-1 text-xs font-semibold backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <div className="flex items-center pl-2 pr-1 text-gold-400/80">
        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
      </div>
      <button
        type="button"
        onClick={() => setLanguage("id")}
        aria-pressed={language === "id"}
        className={`min-h-[36px] min-w-[38px] rounded-lg px-2.5 py-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
          language === "id"
            ? "bg-gold-500 text-navy-950 shadow-sm"
            : "text-text-soft hover:text-text-main"
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`min-h-[36px] min-w-[38px] rounded-lg px-2.5 py-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
          language === "en"
            ? "bg-gold-500 text-navy-950 shadow-sm"
            : "text-text-soft hover:text-text-main"
        }`}
      >
        EN
      </button>
    </div>
  );
}
