"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useDeadline } from "@/lib/useDeadline";
import { PLC_REGISTRATION_DEADLINE } from "@/data/registrationDeadlines";

const DISMISS_KEY = `iarc-announcement-dismissed:plc:${PLC_REGISTRATION_DEADLINE}`;
const HEIGHT_VAR = "--announce-h";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const pad = (n: number) => String(n).padStart(2, "0");

export default function AnnouncementBanner() {
  const { t } = useLanguage();
  const a = t.announcement;
  const { mounted, expired, days, hours, minutes, seconds } = useDeadline(
    PLC_REGISTRATION_DEADLINE
  );
  const [dismissed, setDismissed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    } catch {
      // Storage blocked: the banner just shows again next visit.
    }
  }, []);

  // Pages offset their top padding by this height so the fixed header doesn't cover content.
  useIsoLayoutEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (dismissed || !el) {
      root.style.setProperty(HEIGHT_VAR, "0px");
      return;
    }
    const update = () => root.style.setProperty(HEIGHT_VAR, `${el.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.setProperty(HEIGHT_VAR, "0px");
    };
  }, [dismissed]);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Storage blocked: dismissal lasts for this page view only.
    }
  };

  const clock = mounted ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : "--:--:--";
  const dayPart = mounted && days > 0 ? `${days} ${days === 1 ? a.dayUnit : a.daysUnit} ` : "";

  return (
    <div
      ref={ref}
      role="region"
      aria-label={a.plcCountdownLabel}
      className="border-y border-gold-500/40 bg-navy-800"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-1.5 sm:px-6 lg:px-8">
        {expired ? (
          <p className="flex-1 py-1.5 text-sm text-text-soft">{a.plcClosedText}</p>
        ) : (
          <div className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-0.5 py-1">
            <p className="text-sm text-text-main">
              {a.plcCountdownLabel}{" "}
              <span className="whitespace-nowrap font-mono font-bold tabular-nums text-gold-400">
                {dayPart}
                {clock}
              </span>
            </p>
            <p className="text-xs text-text-soft">
              {a.plcDeadlineText}
              <span aria-hidden="true" className="px-1.5 text-text-dim">
                ·
              </span>
              <Link
                href="/competition/automation-challenge/plc"
                className="font-semibold text-gold-400 underline underline-offset-2 transition-colors hover:text-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                {a.plcLink}
              </Link>
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label={a.dismiss}
          className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-text-soft transition-colors hover:bg-navy-700 hover:text-text-main active:bg-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
