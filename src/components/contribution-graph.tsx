"use client";

import * as React from "react";
import type { ContributionDay } from "@/types";

type Period = number | "last";
type CalendarDay = ContributionDay;

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

const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function toWeeks(days: CalendarDay[]) {
  const weeks: (CalendarDay | null)[][] = [];
  let current: (CalendarDay | null)[] = [];

  const first = days[0];
  if (first) {
    const firstDow = new Date(`${first.date}T00:00:00Z`).getUTCDay();
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

function buildCalendar(days: ContributionDay[], period: Period): CalendarDay[] {
  const contributionByDate = new Map(days.map((day) => [day.date, day]));
  const today = new Date();
  const start = period === "last"
    ? new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 364))
    : new Date(Date.UTC(period, 0, 1));
  const end = period === "last"
    ? new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
    : new Date(Date.UTC(period, 11, 31));
  const calendar: CalendarDay[] = [];

  for (const date = start; date <= end; date.setUTCDate(date.getUTCDate() + 1)) {
    const key = dateKey(date);
    const contribution = contributionByDate.get(key);
    calendar.push({
      date: key,
      count: contribution?.count ?? 0,
      level: contribution?.level ?? 0,
    });
  }

  return calendar;
}

export function ContributionGraph({ days, period }: { days: ContributionDay[]; period: Period }) {
  const calendarDays = React.useMemo(() => buildCalendar(days, period), [days, period]);
  const weeks = React.useMemo(() => toWeeks(calendarDays), [calendarDays]);
  const monthMarkers = React.useMemo(() => {
    const markers: { index: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, index) => {
      const firstReal = week.find((day) => day !== null);
      if (!firstReal) return;
      const month = new Date(`${firstReal.date}T00:00:00Z`).getUTCMonth();
      if (month !== lastMonth) {
        markers.push({ index, label: MONTH_LABELS[month] ?? "" });
        lastMonth = month;
      }
    });
    return markers;
  }, [weeks]);

  const total = calendarDays.reduce((sum, day) => sum + day.count, 0);
  const summary = period === "last"
    ? `${total.toLocaleString()} contributions in the last year`
    : `${total.toLocaleString()} contributions in ${period} · full year`;

  return (
    <div>
      <p className="mb-3 font-display text-[15px] font-semibold">{summary}</p>
      <div className="overflow-x-auto pb-1">
        <div className="min-w-max">
          <div className="mb-1.5 flex gap-[3px] pl-[29px] font-mono text-[11px] text-faint">
            {weeks.map((_, index) => {
              const marker = monthMarkers.find((month) => month.index === index);
              return <div key={index} className="w-[11px]">{marker?.label ?? ""}</div>;
            })}
          </div>
          <div className="flex gap-2">
            <div className="flex w-[21px] flex-col gap-[3px] font-mono text-[10px] leading-[11px] text-faint">
              {WEEKDAY_LABELS.map((label, index) => <span key={index} className="h-[11px]">{label}</span>)}
            </div>
            <div className="flex gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      title={day ? `${day.count} contributions on ${day.date}` : undefined}
                      className="h-[11px] w-[11px] rounded-[3px] transition-colors duration-500 ease-smooth"
                      style={{ background: day ? LEVEL_COLORS[day.level] : "transparent" }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap items-center justify-end gap-1.5 font-mono text-[11.5px] text-faint">
        <span>Less</span>
        {LEVEL_COLORS.map((color) => <span key={color} className="h-[11px] w-[11px] rounded-[3px]" style={{ background: color }} />)}
        <span>More</span>
      </div>
    </div>
  );
}
