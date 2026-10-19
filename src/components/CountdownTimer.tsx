"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function CountdownTimer({
  targetDate = "2026-11-15T23:59:59+07:00",
  batchName = "Gelombang 2 (Batch 2)",
}: {
  targetDate?: string;
  batchName?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-start w-full">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gold-400">
        <Clock className="h-3.5 w-3.5" />
        <span>Batas Penutupan {batchName}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex min-w-0 sm:min-w-[76px] flex-col items-center justify-center rounded-xl border border-gold-500/20 bg-navy-900/90 p-2 sm:p-2.5 backdrop-blur-sm shadow-md"
          >
            <span className="font-mono text-xl sm:text-2xl font-bold text-text-main">
              {mounted ? String(unit.value).padStart(2, "0") : "--"}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-text-dim uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
