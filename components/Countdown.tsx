"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { toIsoDateTime } from "@/lib/format";

function getTarget(): number | null {
  if (!wedding.countdown.enabled) return null;
  const ceremony = wedding.ceremonies.find((c) => c.id === wedding.countdown.targetCeremony);
  if (!ceremony) return null;
  const iso = toIsoDateTime(ceremony.date, ceremony.time);
  return iso ? new Date(iso).getTime() : null;
}

/**
 * Renders nothing until the target ceremony has a confirmed month and year
 * in config/wedding.ts, and hides itself once the moment has passed.
 */
export function Countdown() {
  const target = getTarget();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (target === null) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (target === null || now === null || target - now <= 0) return null;

  const total = Math.floor((target - now) / 1000);
  const { labels } = wedding.ui;
  const parts = [
    { value: Math.floor(total / 86400), label: labels.days },
    { value: Math.floor((total % 86400) / 3600), label: labels.hours },
    { value: Math.floor((total % 3600) / 60), label: labels.minutes },
    { value: total % 60, label: labels.seconds },
  ];

  return (
    <div className="mt-10 w-full max-w-xs text-center" role="timer" aria-live="off">
      <div className="grid grid-cols-4">
        {parts.map((part) => (
          <div key={part.label} className="flex flex-col items-center">
            <span className="text-[2.6rem] font-medium leading-none tabular-nums text-royal-800">{part.value}</span>
            <span className="mt-1 text-sm italic text-royal-600">{part.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-base italic text-royal-700">{wedding.countdown.caption}</p>
    </div>
  );
}
