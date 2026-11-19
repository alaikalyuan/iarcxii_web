"use client";

import { useEffect, useState } from "react";

export interface DeadlineState {
  mounted: boolean;
  expired: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const OPEN: DeadlineState = {
  mounted: false,
  expired: false,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function compute(target: number): DeadlineState {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { mounted: true, expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    mounted: true,
    expired: false,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// Pages are prerendered, so the clock is only read after mount; until then the
// deadline is treated as open. Pass undefined to skip the timer entirely.
export function useDeadline(deadline?: string): DeadlineState {
  const [state, setState] = useState<DeadlineState>(OPEN);

  useEffect(() => {
    if (!deadline) return;
    const target = new Date(deadline).getTime();
    setState(compute(target));
    const timer = setInterval(() => {
      const next = compute(target);
      setState(next);
      if (next.expired) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return state;
}
