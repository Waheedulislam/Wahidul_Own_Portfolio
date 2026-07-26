"use client";

import * as React from "react";
import type { ContributionDay } from "@/types";

const LEVEL_COLORS = [
  "hsl(var(--foreground) / 0.07)",
  "hsl(var(--accent) / 0.32)",
  "hsl(var(--accent) / 0.54)",
  "hsl(var(--accent) / 0.77)",
  "hsl(var(--accent))",
];

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Groups a flat list of days into columns of weeks (GitHub renders Sun-first columns).
function toWeeks(days: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];
  let current: (ContributionDay | null)[] = [];

  const first = days[0];
  if (first) {
    const firstDow = new Date(first.date).getDay();
    for (let i = 0; i < firstDow; i++) current.push(null);
  }

  for (const day of days) {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }
  return weeks;
}

export function ContributionGraph({ days }: { days: ContributionDay[] }) {
  const weeks = React.useMemo(() => toWeeks(days), [days]);

  // Figure out which week columns should get a month label.
  const monthMarkers = React.useMemo(() => {
    const markers: { index: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const firstReal = week.find((d) => d !== null);
      if (!firstReal) return;
      const month = new Date(firstReal.date).getMonth();
      if (month !== lastMonth) {
        markers.push({ index: i, label: MONTH_LABELS[month] ?? "" });
        lastMonth = month;
      }
    });
    return markers;
  }, [weeks]);

  const total = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <div>
      <div className="mb-1.5 flex gap-[3px] font-mono text-[11px] text-faint">
        {weeks.map((_, i) => {
          const marker = monthMarkers.find((m) => m.index === i);
          return (
            <div key={i} style={{ width: 11 }}>
              {marker ? marker.label : ""}
            </div>
          );
        })}
      </div>
      <div className="flex gap-[3px] overflow-x-auto">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <div
                key={di}
                title={day ? `${day.count} contributions on ${day.date}` : undefined}
                className="h-[11px] w-[11px] rounded-[3px]"
                style={{
                  background: day ? LEVEL_COLORS[day.level] : "transparent",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11.5px] text-faint">
          {total.toLocaleString()} contributions in the last year
        </p>
        <div className="flex items-center gap-1.5 font-mono text-[11.5px] text-faint">
          <span>Less</span>
          {LEVEL_COLORS.map((c) => (
            <span key={c} className="h-[11px] w-[11px] rounded-[3px]" style={{ background: c }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
